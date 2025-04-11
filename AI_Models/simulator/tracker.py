import pandas as pd
from models.ranker import momentum_ranker
from mpt.rebalance import rebalance

def simulate_portfolio(prices, init_weights, rebalance_freq='3M', lookback=30):
    weights = init_weights.copy()
    portfolio_value = [1.0]  # Start with $1
    last_rebalance = prices.index[0]

    for i in range(1, len(prices)):
        today = prices.index[i]
        prev_day = prices.index[i - 1]
        returns = prices.pct_change().iloc[i]

        # Compute daily portfolio return
        daily_return = sum(weights[asset] * returns[asset] for asset in weights)
        new_value = portfolio_value[-1] * (1 + daily_return)
        portfolio_value.append(new_value)

        # Check if it's time to rebalance
        if today - last_rebalance >= pd.Timedelta(rebalance_freq):
            rankings = momentum_ranker(prices[:i], lookback)
            weights = rebalance(weights, rankings)
            last_rebalance = today

    return pd.Series(portfolio_value, index=prices.index)