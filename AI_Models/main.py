from flask import Flask, request, jsonify
import pandas as pd
from mpt.optimizer import mpt_optimizer_from_df
from models.timegpt import get_forecasted_prices
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CSV_PATH = os.path.join(os.path.dirname(__file__), 'data/prices.csv')

@app.route("/get_portfolio", methods=["POST"])
def get_portfolio():
    data = request.get_json()
    try:
        initial_amount = float(data["initial_amount"])
        duration_months = int(data["duration_months"])
        target_return = float(data["target_return"])
        risk_level = int(data["risk_level"])

        prices_df = pd.read_csv(CSV_PATH, index_col=0, parse_dates=True)
        print(prices_df.head())

        forecast_df = get_forecasted_prices(prices_df, duration_months)
        print(forecast_df)
        
        result = mpt_optimizer_from_df(
            forecast_df,
            risk_level=risk_level
        )

        weights = result["weights"]
        percent_allocations = {asset: round(weight * 100, 2) for asset, weight in weights.items()}

        return jsonify({
            "assets": list(percent_allocations.keys()),
            "allocations (%)": list(percent_allocations.values())
        })

    except Exception as e:
        return jsonify({"error": f"MPT Optimization failed: {str(e)}"})

if __name__ == "__main__":
    app.run(debug=True)
