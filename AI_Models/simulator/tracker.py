import pandas as pd

def simulate_portfolio(prices, initial_weights, ranker=None, rebalance_months=None):
    portfolio = pd.Series(dtype=float)
    weights = pd.Series(initial_weights)
    last_rebalance = prices.index[0]

    if rebalance_months:
        rebalance_offset = pd.DateOffset(months=rebalance_months)
    else:
        rebalance_offset = pd.DateOffset(months=1)  # default 1 month

    for today in prices.index:
        if today == prices.index[0]:
            portfolio[today] = (prices.loc[today] * weights).sum()
            continue

        if today >= last_rebalance + rebalance_offset:
            if ranker:
                ranked_assets = ranker.rank(prices.loc[:today])
                # Update weights only for ranked assets and normalize
                weights = pd.Series({asset: 1 / len(ranked_assets) for asset in ranked_assets})
            last_rebalance = today

        # Align weights with today's prices (in case some assets are missing)
        aligned_weights = weights.reindex(prices.columns).fillna(0)
        portfolio[today] = (prices.loc[today] * aligned_weights).sum()

    return portfolio
