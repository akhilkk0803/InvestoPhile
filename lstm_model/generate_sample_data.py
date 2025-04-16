import pandas as pd
import numpy as np
from datetime import datetime, timedelta

def generate_realistic_data(start_date='2018-01-01', end_date='2023-12-31'):
    # Generate date range
    dates = pd.date_range(start=start_date, end=end_date, freq='D')
    
    # Initialize data dictionary
    data = {
        'Date': dates,
        'nifty_50': [],
        'fd': [],
        'gold': [],
        'govt_bond': [],
        'mf': []
    }
    
    # Base values
    base_values = {
        'nifty_50': 10000,
        'fd': 100,
        'gold': 3000,
        'govt_bond': 100,
        'mf': 100
    }
    
    # Generate realistic price movements
    for i in range(len(dates)):
        # Nifty 50 (more volatile, higher returns)
        if i == 0:
            data['nifty_50'].append(base_values['nifty_50'])
        else:
            daily_return = np.random.normal(0.0004, 0.015)  # Higher volatility
            data['nifty_50'].append(data['nifty_50'][-1] * (1 + daily_return))
        
        # Fixed Deposit (stable, low returns)
        if i == 0:
            data['fd'].append(base_values['fd'])
        else:
            daily_return = np.random.normal(0.0001, 0.0005)  # Very low volatility
            data['fd'].append(data['fd'][-1] * (1 + daily_return))
        
        # Gold (moderate volatility, inflation hedge)
        if i == 0:
            data['gold'].append(base_values['gold'])
        else:
            daily_return = np.random.normal(0.0002, 0.008)  # Moderate volatility
            data['gold'].append(data['gold'][-1] * (1 + daily_return))
        
        # Government Bonds (low volatility, interest rate sensitive)
        if i == 0:
            data['govt_bond'].append(base_values['govt_bond'])
        else:
            daily_return = np.random.normal(0.00015, 0.001)  # Low volatility
            data['govt_bond'].append(data['govt_bond'][-1] * (1 + daily_return))
        
        # Mutual Funds (moderate-high volatility, diversified)
        if i == 0:
            data['mf'].append(base_values['mf'])
        else:
            daily_return = np.random.normal(0.0003, 0.01)  # Moderate-high volatility
            data['mf'].append(data['mf'][-1] * (1 + daily_return))
    
    # Create DataFrame
    df = pd.DataFrame(data)
    
    # Add some realistic market events
    # COVID-19 crash (March 2020)
    covid_start = df[df['Date'] == '2020-03-01'].index[0]
    covid_end = df[df['Date'] == '2020-04-30'].index[0]
    df.loc[covid_start:covid_end, 'nifty_50'] *= 0.7  # 30% crash
    df.loc[covid_start:covid_end, 'gold'] *= 1.1  # Gold as safe haven
    df.loc[covid_start:covid_end, 'mf'] *= 0.8  # 20% crash
    
    # 2022 market correction
    correction_start = df[df['Date'] == '2022-01-01'].index[0]
    correction_end = df[df['Date'] == '2022-06-30'].index[0]
    df.loc[correction_start:correction_end, 'nifty_50'] *= 0.85  # 15% correction
    df.loc[correction_start:correction_end, 'mf'] *= 0.9  # 10% correction
    
    # Save to CSV
    df.to_csv('historical_data.csv', index=False)
    return df

if __name__ == "__main__":
    df = generate_realistic_data()
    print("Sample data generated and saved to 'historical_data.csv'")
    print("\nFirst few rows of the data:")
    print(df.head())
    print("\nLast few rows of the data:")
    print(df.tail()) 