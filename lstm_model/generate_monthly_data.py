import pandas as pd
import numpy as np
from datetime import datetime, timedelta

def generate_monthly_data():
    # Set random seed for reproducibility
    np.random.seed(42)
    
    # Generate dates for 15 years (monthly)
    start_date = datetime(2009, 1, 1)
    dates = pd.date_range(start=start_date, periods=15*12, freq='M')
    
    # Initial values for each asset
    initial_values = {
        'nifty_50': 3000,  # Starting Nifty 50 index
        'fd': 100,         # Fixed deposit index (less volatile)
        'gold': 25000,     # Gold price per 10g
        'govt_bond': 100,  # Government bond index
        'mf': 100          # Mutual fund index
    }
    
    # Monthly volatility and drift parameters (realistic values)
    params = {
        'nifty_50': {'volatility': 0.05, 'drift': 0.008},    # Higher volatility for equity
        'fd': {'volatility': 0.002, 'drift': 0.005},         # Very low volatility for FD
        'gold': {'volatility': 0.03, 'drift': 0.006},        # Moderate volatility for gold
        'govt_bond': {'volatility': 0.01, 'drift': 0.004},   # Low volatility for bonds
        'mf': {'volatility': 0.04, 'drift': 0.007}           # Moderate-high volatility for MF
    }
    
    # Generate price series for each asset
    data = {}
    for asset, initial_value in initial_values.items():
        # Generate random walk with drift
        returns = np.random.normal(
            loc=params[asset]['drift'],
            scale=params[asset]['volatility'],
            size=len(dates)
        )
        
        # Add some autocorrelation to make it more realistic
        for i in range(1, len(returns)):
            returns[i] = 0.7 * returns[i-1] + 0.3 * returns[i]
        
        # Calculate prices
        prices = initial_value * np.exp(np.cumsum(returns))
        
        # Add some seasonal patterns
        if asset == 'gold':
            # Gold tends to be higher in festive seasons (Oct-Dec)
            seasonal_factor = 1 + 0.02 * np.sin(2 * np.pi * np.arange(len(dates)) / 12 + np.pi/2)
            prices *= seasonal_factor
        elif asset == 'fd':
            # FD rates tend to follow interest rate cycles
            seasonal_factor = 1 + 0.01 * np.sin(2 * np.pi * np.arange(len(dates)) / 24)
            prices *= seasonal_factor
        
        data[asset] = prices
    
    # Create DataFrame
    df = pd.DataFrame(data, index=dates)
    
    # Add some market crashes and rallies
    # 2008 financial crisis
    df.loc['2008-09':'2009-03', 'nifty_50'] *= 0.6
    df.loc['2008-09':'2009-03', 'mf'] *= 0.7
    
    # 2020 COVID crash
    df.loc['2020-03':'2020-04', 'nifty_50'] *= 0.8
    df.loc['2020-03':'2020-04', 'mf'] *= 0.85
    
    # Gold rally during COVID
    df.loc['2020-03':'2020-08', 'gold'] *= 1.2
    
    # Save to CSV
    df.to_csv('historical_monthly_data.csv')
    print("Generated monthly data for 15 years and saved to historical_monthly_data.csv")
    return df

if __name__ == "__main__":
    generate_monthly_data() 