from mpt.optimizer import mpt_optimizer_from_df
from simulator.tracker import simulate_portfolio
from utils.plotting import plot_portfolio_performance
from models.momentum import MomentumRanker
from models.timegpt_predictor import TimeGPTForecaster
import pandas as pd
from dotenv import load_dotenv
import os

load_dotenv()

# --- CONFIG ---
CSV_PATH = "data/dummy_portfolio.csv"
FORECAST_HORIZON = 30  # e.g., forecast next 30 days
REBALANCE_MONTHS = 3
TIMEGPT_API_KEY = os.getenv("TIMEGPT_API_KEY")
# --------------

def main():
    # Step 1: Run MPT on historical data to get baseline weights
    base_result = mpt_optimizer_from_df(pd.read_csv(CSV_PATH, index_col=0, parse_dates=True))
    prices = base_result['prices']

    print("✅ Base MPT weights (using historical prices):")
    print(base_result['weights'])

    # Step 2: Forecast future prices using TimeGPT
    print("\n🔮 Forecasting future prices using TimeGPT...")
    forecaster = TimeGPTForecaster(horizon=FORECAST_HORIZON, api_key=TIMEGPT_API_KEY)
    forecast_df = forecaster.forecast(prices)

    print("✅ Forecast completed. Sample predictions:")
    print(forecast_df.head())

    # Step 3: Run MPT on predicted prices
    future_result = mpt_optimizer_from_df(forecast_df)

    print("\n📊 New MPT weights (based on predicted prices):")
    print(future_result['weights'])

    # Step 4: Simulate portfolio with new weights
    ranker = MomentumRanker(lookback=30)
    sim_series = simulate_portfolio(prices, future_result['weights'], ranker, rebalance_months=1)


    # Step 5: Plot the performance
    plot_portfolio_performance(sim_series)

if __name__ == "__main__":
    main()
