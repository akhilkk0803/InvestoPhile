def momentum_ranker(prices, lookback=30):
    momentum = prices.pct_change(periods=lookback).iloc[-1]
    ranked_assets = momentum.sort_values(ascending=False).index.tolist()
    return ranked_assets