import numpy as np
import pandas as pd
from scipy.optimize import minimize
import logging

logger = logging.getLogger(__name__)

class PortfolioOptimizer:
    def __init__(self):
        self.risk_free_rate = 0.02  # Assuming 2% risk-free rate
        self.asset_types = {
            'nifty_50': {'min_weight': 0.0, 'max_weight': 0.6, 'risk_factor': 1.0},
            'fd': {'min_weight': 0.0, 'max_weight': 0.4, 'risk_factor': 0.2},
            'gold': {'min_weight': 0.0, 'max_weight': 0.3, 'risk_factor': 0.6},
            'govt_bond': {'min_weight': 0.0, 'max_weight': 0.4, 'risk_factor': 0.3},
            'mf': {'min_weight': 0.0, 'max_weight': 0.5, 'risk_factor': 0.8}
        }
        
    def calculate_portfolio_metrics(self, returns, weights, duration_months):
        """Calculate portfolio return and volatility"""
        # Calculate monthly return
        monthly_return = np.sum(returns.mean() * weights)
        
        # Calculate total return over the investment duration
        total_return = (1 + monthly_return) ** duration_months - 1
        
        # Calculate annualized volatility
        portfolio_volatility = np.sqrt(np.dot(weights.T, np.dot(returns.cov() * 12, weights)))
        
        # Calculate annualized return for Sharpe ratio
        annualized_return = (1 + monthly_return) ** 12 - 1
        sharpe_ratio = (annualized_return - self.risk_free_rate) / portfolio_volatility
        
        return total_return, portfolio_volatility, sharpe_ratio, monthly_return
    
    def optimize(self, df, expected_return, risk_capacity, duration_months):
        """
        Optimize portfolio weights using Modern Portfolio Theory
        Args:
            df: DataFrame with asset prices
            expected_return: Target total return over the investment duration
            risk_capacity: Risk tolerance (1-5 scale)
            duration_months: Investment duration in months
        """
        logger.info("Starting MPT optimization")
        # Convert risk capacity to risk aversion parameter
        risk_aversion = 6 - risk_capacity  # Higher risk capacity = lower risk aversion
        
        # Calculate monthly returns
        returns = df.pct_change().dropna()
        
        # Number of assets
        n_assets = len(df.columns)
        
        # Initial guess (equal weights)
        initial_weights = np.array([1/n_assets] * n_assets)
        
        # Calculate target monthly return from total expected return
        target_monthly_return = (1 + expected_return) ** (1/duration_months) - 1
        
        # Constraints
        constraints = [
            {'type': 'eq', 'fun': lambda x: np.sum(x) - 1},  # weights sum to 1
            {'type': 'eq', 'fun': lambda x: np.sum(returns.mean() * x) - target_monthly_return}  # target monthly return
        ]
        
        # Add asset-specific constraints
        bounds = []
        for asset in df.columns:
            asset_type = asset.lower()
            if asset_type in self.asset_types:
                bounds.append((
                    self.asset_types[asset_type]['min_weight'],
                    self.asset_types[asset_type]['max_weight']
                ))
            else:
                bounds.append((0, 1))
        
        # Objective function: minimize volatility with risk aversion and asset-specific risk factors
        def objective(weights):
            portfolio_vol = np.sqrt(np.dot(weights.T, np.dot(returns.cov() * 12, weights)))
            monthly_return = np.sum(returns.mean() * weights)
            
            # Add asset-specific risk adjustments
            risk_adjustment = 0
            for i, asset in enumerate(df.columns):
                asset_type = asset.lower()
                if asset_type in self.asset_types:
                    risk_adjustment += weights[i] * self.asset_types[asset_type]['risk_factor']
            
            # Calculate annualized return for utility function
            annualized_return = (1 + monthly_return) ** 12 - 1
            utility = portfolio_vol - (1/risk_aversion) * (annualized_return - self.risk_free_rate) + risk_adjustment
            return utility
        
        # Optimize with maximum iterations
        logger.info("Running optimization with maximum iterations")
        result = minimize(
            objective,
            initial_weights,
            method='SLSQP',
            bounds=bounds,
            constraints=constraints,
            options={'maxiter': 1000}  # Limit maximum iterations
        )
        
        if not result.success:
            logger.warning(f"Optimization did not converge: {result.message}")
            # Return the best weights found so far
            return result.x
        
        logger.info("MPT optimization completed successfully")
        return result.x
    
    def calculate_metrics(self, df, weights, duration_months):
        """Calculate and return portfolio metrics"""
        returns = df.pct_change().dropna()
        total_return, portfolio_volatility, sharpe_ratio, monthly_return = self.calculate_portfolio_metrics(
            returns, weights, duration_months
        )
        
        # Calculate annualized return
        annualized_return = (1 + monthly_return) ** 12 - 1
        
        # Calculate asset-specific metrics
        asset_metrics = {}
        for i, asset in enumerate(df.columns):
            asset_metrics[asset] = {
                'weight': float(weights[i]),
                'contribution': float(weights[i] * returns[asset].mean() * duration_months)  # Total contribution
            }
        
        return {
            'total_return': float(total_return),
            'annualized_return': float(annualized_return),
            'annual_volatility': float(portfolio_volatility),
            'sharpe_ratio': float(sharpe_ratio),
            'risk_adjusted_return': float(annualized_return / portfolio_volatility),
            'asset_metrics': asset_metrics
        } 