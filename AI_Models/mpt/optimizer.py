import numpy as np
import pandas as pd
from scipy.optimize import minimize

# def mpt_optimizer(csv_path, risk_free_rate=0.02, simulations=5000):
#     df = pd.read_csv(csv_path, parse_dates=['Date'], index_col='Date')
#     df = df.sort_index()

#     daily_returns = df.pct_change().dropna()
#     mean_returns = daily_returns.mean()
#     cov_matrix = daily_returns.cov()

#     num_assets = len(df.columns)
#     results = np.zeros((3, simulations))
#     weights_record = []

#     for _ in range(simulations):
#         weights = np.random.random(num_assets)
#         weights /= np.sum(weights)
#         weights_record.append(weights)

#         annual_return = np.dot(weights, mean_returns) * 12
#         annual_volatility = np.sqrt(np.dot(weights.T, np.dot(cov_matrix * 12, weights)))
#         sharpe_ratio = (annual_return - risk_free_rate) / annual_volatility

#         results[0, _] = annual_return
#         results[1, _] = annual_volatility
#         results[2, _] = sharpe_ratio

#     max_sharpe_idx = np.argmax(results[2])
#     optimal_weights = weights_record[max_sharpe_idx]
#     asset_names = df.columns.tolist()

#     return {
#         'weights': dict(zip(asset_names, optimal_weights)),
#         'prices': df
#     }

def mpt_optimizer_from_df(prices_df):
    returns = prices_df.pct_change().dropna()
    mean_returns = returns.mean()
    cov_matrix = returns.cov()
    
    num_assets = len(prices_df.columns)
    weights = np.ones(num_assets) / num_assets
    
    def portfolio_return(w): return np.dot(w, mean_returns)
    def portfolio_volatility(w): return np.sqrt(np.dot(w.T, np.dot(cov_matrix, w)))
    def negative_sharpe(w): return -portfolio_return(w) / portfolio_volatility(w)

    constraints = ({'type': 'eq', 'fun': lambda w: np.sum(w) - 1})
    bounds = tuple((0, 1) for _ in range(num_assets))
    
    result = minimize(negative_sharpe, weights, method='SLSQP', bounds=bounds, constraints=constraints)

    return {
        'weights': dict(zip(prices_df.columns, result.x)),
        'prices': prices_df
    }