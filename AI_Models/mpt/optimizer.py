import numpy as np
import pandas as pd
from scipy.optimize import minimize


def mpt_optimizer_from_df(prices_df, risk_level=3):
    returns = prices_df.pct_change().dropna()
    mean_returns = returns.mean() * 12
    cov_matrix = returns.cov() * 12

    num_assets = len(mean_returns)
    weights = np.ones(num_assets) / num_assets
    bounds = tuple((0, 1) for _ in range(num_assets))
    constraints = ({'type': 'eq', 'fun': lambda x: np.sum(x) - 1})

    def portfolio_perf(weights):
        port_return = np.dot(weights, mean_returns)
        port_vol = np.sqrt(np.dot(weights.T, np.dot(cov_matrix, weights)))
        return -port_return / port_vol  # Sharpe Ratio (negated)

    optimized = minimize(portfolio_perf, weights, method='SLSQP', bounds=bounds, constraints=constraints)

    if not optimized.success:
        raise Exception("Optimization failed")

    opt_weights = optimized.x
    return {
        "weights": dict(zip(prices_df.columns, opt_weights))
    }