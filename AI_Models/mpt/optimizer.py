import numpy as np
import pandas as pd

def mpt_optimizer(csv_path, risk_free_rate=0.02, simulations=5000):
    df = pd.read_csv(csv_path, parse_dates=['Date'], index_col='Date')
    df = df.sort_index()

    daily_returns = df.pct_change().dropna()
    mean_returns = daily_returns.mean()
    cov_matrix = daily_returns.cov()

    num_assets = len(df.columns)
    results = np.zeros((3, simulations))
    weights_record = []

    for _ in range(simulations):
        weights = np.random.random(num_assets)
        weights /= np.sum(weights)
        weights_record.append(weights)

        annual_return = np.dot(weights, mean_returns) * 12
        annual_volatility = np.sqrt(np.dot(weights.T, np.dot(cov_matrix * 12, weights)))
        sharpe_ratio = (annual_return - risk_free_rate) / annual_volatility

        results[0, _] = annual_return
        results[1, _] = annual_volatility
        results[2, _] = sharpe_ratio

    max_sharpe_idx = np.argmax(results[2])
    optimal_weights = weights_record[max_sharpe_idx]
    asset_names = df.columns.tolist()

    return {
        'weights': dict(zip(asset_names, optimal_weights)),
        'prices': df
    }