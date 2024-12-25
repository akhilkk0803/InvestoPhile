# import numpy as np
# import pandas as pd

# # Create a realistic dummy dataset for historical returns (2009-2019)
# years = np.arange(2009, 2020)

# # Simulating average returns for equities, bonds, and gold (in %)
# np.random.seed(42)  # For reproducibility

# equities_returns = np.random.normal(8, 2, len(years))  # Mean = 8%, Std = 2%
# bonds_returns = np.random.normal(4, 1, len(years))  # Mean = 4%, Std = 1%
# gold_returns = np.random.normal(6, 1.5, len(years))  # Mean = 6%, Std = 1.5%

# # Create DataFrame for the historical data
# historical_data = pd.DataFrame({
#     'Year': years,
#     'Equities Return (%)': equities_returns,
#     'Bonds Return (%)': bonds_returns,
#     'Gold Return (%)': gold_returns
# })

# # historical_data.to_csv("historicalData.csv", index = False)
# print(historical_data)


# # Simulate user data for 5 users with different risk profiles
# user_data = pd.DataFrame({
#     'Risk_Tolerance': [0.2, 0.5, 0.8, 0.2, 0.7],  # 0.2: Conservative, 0.5: Balanced, 0.8: Aggressive
#     'SIP_Amount': [5000, 10000, 15000, 2000, 12000],  # Monthly SIP
#     'Years': [5, 10, 15, 5, 20],  # Investment duration (in years)
#     'Desired_Amount': [300000, 1500000, 5000000, 200000, 3500000],  # Desired target amount
# })

# # Calculate the average returns for each asset class for each user based on historical data
# equities_avg_return = historical_data['Equities Return (%)'].mean()
# bonds_avg_return = historical_data['Bonds Return (%)'].mean()
# gold_avg_return = historical_data['Gold Return (%)'].mean()

# # Add average returns for asset classes to user data
# user_data['Equities_Avg_Return'] = equities_avg_return
# user_data['Bonds_Avg_Return'] = bonds_avg_return
# user_data['Gold_Avg_Return'] = gold_avg_return

# print(user_data)

# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import Dense
# from sklearn.preprocessing import StandardScaler

# # Normalize user data (important for neural network performance)
# scaler = StandardScaler()
# user_data_scaled = scaler.fit_transform(user_data.drop(columns=['Desired_Amount']))

# # Define target data: Portfolio allocations based on risk tolerance
# # Here, we define dummy allocations based on risk profile
# # For example, conservative users might prefer more bonds and less equities and gold.
# target_data = np.array([
#     [0.4, 0.5, 0.1],  # Conservative: 40% Equities, 50% Bonds, 10% Gold
#     [0.6, 0.3, 0.1],  # Balanced: 60% Equities, 30% Bonds, 10% Gold
#     [0.8, 0.1, 0.1],  # Aggressive: 80% Equities, 10% Bonds, 10% Gold
#     [0.3, 0.6, 0.1],  # Conservative: 30% Equities, 60% Bonds, 10% Gold
#     [0.7, 0.2, 0.1]   # Aggressive: 70% Equities, 20% Bonds, 10% Gold
# ])

# # Define the neural network model
# model = Sequential()
# model.add(Dense(64, input_dim=user_data_scaled.shape[1], activation='relu'))  # Hidden layer 1
# model.add(Dense(32, activation='relu'))  # Hidden layer 2
# model.add(Dense(3, activation='softmax'))  # Output layer: Portfolio allocation (Equities, Bonds, Gold)

# # Compile the model
# model.compile(optimizer='adam', loss='mean_squared_error')

# # Train the model
# model.fit(user_data_scaled, target_data, epochs=100)

# # Predict the portfolio allocation for a new user input (dummy example)
# new_user_data = np.array([[0.5, 10000, 10, 1500000, equities_avg_return, bonds_avg_return, gold_avg_return]])
# new_user_data_scaled = scaler.transform(new_user_data)
# portfolio_allocation = model.predict(new_user_data_scaled)

# print(f"Recommended Portfolio Allocation (Equities, Bonds, Gold): {portfolio_allocation[0]}")


#Second chance

# import numpy as np
# import pandas as pd
# import tensorflow as tf
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import Dense
# from sklearn.preprocessing import StandardScaler

# # 1. Create a realistic dummy dataset for historical returns (2009-2019)
# years = np.arange(2009, 2020)

# # Simulating average returns for equities, bonds, and gold (in %)
# np.random.seed(42)  # For reproducibility

# equities_returns = np.random.normal(8, 2, len(years))  # Mean = 8%, Std = 2%
# bonds_returns = np.random.normal(4, 1, len(years))  # Mean = 4%, Std = 1%
# gold_returns = np.random.normal(6, 1.5, len(years))  # Mean = 6%, Std = 1.5%

# # Create DataFrame for the historical data
# historical_data = pd.DataFrame({
#     'Year': years,
#     'Equities Return (%)': equities_returns,
#     'Bonds Return (%)': bonds_returns,
#     'Gold Return (%)': gold_returns
# })

# print("Historical Data:\n", historical_data)

# # 2. Simulate user data for 5 users with different risk profiles
# user_data = pd.DataFrame({
#     'Risk_Tolerance': [0.2, 0.5, 0.8, 0.2, 0.7],  # 0.2: Conservative, 0.5: Balanced, 0.8: Aggressive
#     'SIP_Amount': [5000, 10000, 15000, 2000, 12000],  # Monthly SIP
#     'Years': [5, 10, 15, 5, 20],  # Investment duration (in years)
#     'Desired_Amount': [300000, 1500000, 5000000, 200000, 3500000],  # Desired target amount
# })

# # Calculate the average returns for each asset class for each user based on historical data
# equities_avg_return = historical_data['Equities Return (%)'].mean()
# bonds_avg_return = historical_data['Bonds Return (%)'].mean()
# gold_avg_return = historical_data['Gold Return (%)'].mean()

# # Add average returns for asset classes to user data
# user_data['Equities_Avg_Return'] = equities_avg_return
# user_data['Bonds_Avg_Return'] = bonds_avg_return
# user_data['Gold_Avg_Return'] = gold_avg_return

# print("\nUser Data:\n", user_data)

# # 3. Normalize user data (important for neural network performance)
# scaler = StandardScaler()

# # Fit scaler on the user data (excluding 'Desired_Amount')
# user_data_scaled = scaler.fit_transform(user_data.drop(columns=['Desired_Amount']))

# # 4. Define target data: Portfolio allocations based on risk tolerance
# # Dummy allocations based on risk profile:
# # Example: conservative users might prefer more bonds and less equities and gold.
# target_data = np.array([
#     [0.4, 0.5, 0.1],  # Conservative: 40% Equities, 50% Bonds, 10% Gold
#     [0.6, 0.3, 0.1],  # Balanced: 60% Equities, 30% Bonds, 10% Gold
#     [0.8, 0.1, 0.1],  # Aggressive: 80% Equities, 10% Bonds, 10% Gold
#     [0.3, 0.6, 0.1],  # Conservative: 30% Equities, 60% Bonds, 10% Gold
#     [0.7, 0.2, 0.1]   # Aggressive: 70% Equities, 20% Bonds, 10% Gold
# ])

# # 5. Define the neural network model
# model = Sequential()
# model.add(Dense(64, input_dim=user_data_scaled.shape[1], activation='relu'))  # Hidden layer 1
# model.add(Dense(32, activation='relu'))  # Hidden layer 2
# model.add(Dense(3, activation='softmax'))  # Output layer: Portfolio allocation (Equities, Bonds, Gold)

# # Compile the model
# model.compile(optimizer='adam', loss='mean_squared_error')

# # Train the model
# model.fit(user_data_scaled, target_data, epochs=100)

# # 6. Predict the portfolio allocation for a new user input
# # New user data (example)
# new_user_data = np.array([[0.5, 10000, 10, 1500000, equities_avg_return, bonds_avg_return, gold_avg_return]])

# # Ensure new user data matches the same feature set (exclude 'Desired_Amount')
# new_user_data_scaled = scaler.transform(new_user_data[:, [0, 1, 2, 3, 4, 5]])

# # Predict the portfolio allocation
# portfolio_allocation = model.predict(new_user_data_scaled)

# print(f"\nRecommended Portfolio Allocation (Equities, Bonds, Gold): {portfolio_allocation[0]}")


#Third Chance

# import numpy as np
# import tensorflow as tf
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import Dense
# from sklearn.preprocessing import StandardScaler
# from sklearn.model_selection import train_test_split
# from tensorflow.keras import regularizers

# # 1. Generate dummy data with risk tolerance, investment type, amount, duration, returns for equity/bonds/gold
# # Assuming returns for each asset class
# equities_avg_return = 8.0  # Example average return for equities
# bonds_avg_return = 4.0     # Example average return for bonds
# gold_avg_return = 6.0      # Example average return for gold

# # Example of data with:
# # [Risk tolerance, Investment amount, Investment type (SIP=1 or lumpsum=0), Duration (years), Desired amount, Equities return, Bonds return, Gold return]
# X_train = np.array([
#     [0.1, 10000, 1, 10, 1500000, equities_avg_return, bonds_avg_return, gold_avg_return],  # Low risk tolerance, SIP
#     [0.7, 20000, 1, 10, 1500000, equities_avg_return, bonds_avg_return, gold_avg_return],  # High risk tolerance, SIP
#     [0.5, 10000, 0, 10, 1500000, equities_avg_return, bonds_avg_return, gold_avg_return],  # Balanced, lumpsum
#     [0.4, 15000, 1, 5, 1000000, equities_avg_return, bonds_avg_return, gold_avg_return],   # Low risk tolerance, SIP
#     [0.6, 30000, 1, 10, 2000000, equities_avg_return, bonds_avg_return, gold_avg_return],  # Medium risk tolerance, SIP
#     [0.8, 25000, 0, 15, 2000000, equities_avg_return, bonds_avg_return, gold_avg_return],  # High risk tolerance, lumpsum
#     [0.3, 5000, 0, 8, 1000000, equities_avg_return, bonds_avg_return, gold_avg_return],   # Low risk tolerance, lumpsum
#     [0.5, 10000, 1, 20, 1500000, equities_avg_return, bonds_avg_return, gold_avg_return]   # Balanced, SIP
# ])

# # Target portfolio allocations (equities, bonds, gold) for each scenario
# y_train = np.array([
#     [0.2, 0.6, 0.2],  # Low risk: more bonds, less equities
#     [0.8, 0.1, 0.1],  # High risk: more equities
#     [0.5, 0.3, 0.2],  # Balanced
#     [0.4, 0.4, 0.2],  # Low risk: more bonds
#     [0.6, 0.3, 0.1],  # Medium risk
#     [0.7, 0.2, 0.1],  # High risk: more equities
#     [0.3, 0.5, 0.2],  # Low risk: more bonds, less equities
#     [0.5, 0.3, 0.2]   # Balanced
# ])

# # 2. Scaling the data
# scaler = StandardScaler()
# X_train_scaled = scaler.fit_transform(X_train)

# # 3. Define the neural network model
# model = Sequential()
# model.add(Dense(64, input_dim=X_train_scaled.shape[1], activation='relu', kernel_regularizer=regularizers.l2(0.01)))
# model.add(Dense(32, activation='relu', kernel_regularizer=regularizers.l2(0.01)))
# model.add(Dense(3, activation='sigmoid'))  # Output layer with 3 values for portfolio allocation (equities, bonds, gold)

# # Compile the model
# model.compile(loss='mean_squared_error', optimizer='adam', metrics=['accuracy'])

# # 4. Train the model
# model.fit(X_train_scaled, y_train, epochs=100, batch_size=1)

# # 5. Testing the model with new user input
# # For SIP
# new_user_data_sip = np.array([[0.5, 10000, 1, 10, 1500000, equities_avg_return, bonds_avg_return, gold_avg_return]])
# new_user_data_sip_scaled = scaler.transform(new_user_data_sip)
# portfolio_allocation_sip = model.predict(new_user_data_sip_scaled)
# print(f"Recommended Portfolio Allocation for SIP: {portfolio_allocation_sip[0]}")

# # For Lumpsum
# new_user_data_lumpsum = np.array([[0.5, 200000, 0, 10, 1500000, equities_avg_return, bonds_avg_return, gold_avg_return]])
# new_user_data_lumpsum_scaled = scaler.transform(new_user_data_lumpsum)
# portfolio_allocation_lumpsum = model.predict(new_user_data_lumpsum_scaled)
# print(f"Recommended Portfolio Allocation for Lumpsum: {portfolio_allocation_lumpsum[0]}")

#Fourth Chance

import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from sklearn.preprocessing import StandardScaler
from tensorflow.keras import regularizers

# 1. Generate dummy data with risk tolerance, investment type, amount, duration, returns for each asset class
equities_avg_return = 8.0  # Example average return for equities
bonds_avg_return = 4.0     # Example average return for bonds
gold_avg_return = 6.0      # Example average return for gold
fd_avg_return = 3.5        # Example average return for Fixed Deposits
mf_debt_avg_return = 7.0   # Example average return for Mutual Funds (Debt)

# Example of data with:
# [Risk tolerance, Investment amount, Investment type (SIP=1 or lumpsum=0), Duration (years), Desired amount, Equities return, Bonds return, Gold return, FD return, MF Debt return]
X_train = np.array([
    [0.1, 10000, 1, 10, 1500000, equities_avg_return, bonds_avg_return, gold_avg_return, fd_avg_return, mf_debt_avg_return],  # Low risk tolerance, SIP
    [0.7, 20000, 1, 10, 1500000, equities_avg_return, bonds_avg_return, gold_avg_return, fd_avg_return, mf_debt_avg_return],  # High risk tolerance, SIP
    [0.5, 10000, 0, 10, 1500000, equities_avg_return, bonds_avg_return, gold_avg_return, fd_avg_return, mf_debt_avg_return],  # Balanced, lumpsum
    [0.4, 15000, 1, 5, 1000000, equities_avg_return, bonds_avg_return, gold_avg_return, fd_avg_return, mf_debt_avg_return],   # Low risk tolerance, SIP
    [0.6, 30000, 1, 10, 2000000, equities_avg_return, bonds_avg_return, gold_avg_return, fd_avg_return, mf_debt_avg_return],  # Medium risk tolerance, SIP
    [0.8, 25000, 0, 15, 2000000, equities_avg_return, bonds_avg_return, gold_avg_return, fd_avg_return, mf_debt_avg_return],  # High risk tolerance, lumpsum
    [0.3, 5000, 0, 8, 1000000, equities_avg_return, bonds_avg_return, gold_avg_return, fd_avg_return, mf_debt_avg_return],   # Low risk tolerance, lumpsum
    [0.5, 10000, 1, 20, 1500000, equities_avg_return, bonds_avg_return, gold_avg_return, fd_avg_return, mf_debt_avg_return]   # Balanced, SIP
])

# Target portfolio allocations (equities, bonds, gold, FD, MF Debt) for each scenario
y_train = np.array([
    [0.2, 0.5, 0.2, 0.05, 0.05],  # Low risk: more bonds, less equities, more FD
    [0.8, 0.1, 0.05, 0.05, 0.05],  # High risk: more equities, less FD, MF Debt
    [0.5, 0.3, 0.1, 0.05, 0.05],  # Balanced, some FD and MF Debt
    [0.4, 0.4, 0.1, 0.05, 0.05],  # Low risk: more bonds and FD
    [0.6, 0.3, 0.05, 0.05, 0.05],  # Medium risk, more equities
    [0.7, 0.2, 0.05, 0.05, 0.05],  # High risk, more equities
    [0.3, 0.5, 0.1, 0.05, 0.05],  # Low risk: more bonds, less equities
    [0.5, 0.3, 0.1, 0.05, 0.05]   # Balanced
])

# 2. Scaling the data
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)

# 3. Define the neural network model
model = Sequential()
model.add(Dense(64, input_dim=X_train_scaled.shape[1], activation='relu', kernel_regularizer=regularizers.l2(0.01)))
model.add(Dense(32, activation='relu', kernel_regularizer=regularizers.l2(0.01)))
model.add(Dense(5, activation='sigmoid'))  # Output layer with 5 values for portfolio allocation (equities, bonds, gold, FD, MF Debt)

# Compile the model
model.compile(loss='mean_squared_error', optimizer='adam', metrics=['accuracy'])

# 4. Train the model
model.fit(X_train_scaled, y_train, epochs=100, batch_size=1)

# 5. Testing the model with new user input
# For SIP
model.save('portfolio_model.h5')