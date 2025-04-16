from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from portfolio_optimizer import PortfolioOptimizer
from time_series_model import TimeSeriesModel
import json
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Initialize the portfolio optimizer and time series model
portfolio_optimizer = PortfolioOptimizer()
time_series_model = TimeSeriesModel()

# Fixed path for the historical data
HISTORICAL_DATA_PATH = os.path.join(os.path.dirname(__file__), 'historical_data.csv')

@app.route('/optimize', methods=['POST'])
def optimize_portfolio():
    try:
        logger.info("Starting portfolio optimization")
        data = request.get_json()
        
        # Extract user inputs
        investment_amount = float(data['amount'])
        expected_return = float(data['expected_return'])
        risk_capacity = int(data['risk_capacity'])  # Scale of 1-5
        duration = int(data['duration'])  # in months
        
        logger.info(f"Processing request with parameters: amount={investment_amount}, return={expected_return}, risk={risk_capacity}, duration={duration}")
        
        # Read and process the data from fixed path
        if not os.path.exists(HISTORICAL_DATA_PATH):
            logger.error("Historical data file not found")
            return jsonify({
                'status': 'error',
                'message': 'Historical data file not found. Please run generate_sample_data.py first.'
            }), 400
            
        # Read CSV with proper data types
        logger.info("Reading historical data")
        df = pd.read_csv(HISTORICAL_DATA_PATH)
        
        # Convert Date column to datetime
        df['Date'] = pd.to_datetime(df['Date'])
        
        # Convert numeric columns to float
        numeric_columns = ['nifty_50', 'fd', 'gold', 'govt_bond', 'mf']
        for col in numeric_columns:
            df[col] = pd.to_numeric(df[col], errors='coerce')
        
        # Drop any rows with NaN values
        df = df.dropna()
        
        # Create a copy of the DataFrame without the Date column for calculations
        df_calc = df[numeric_columns].copy()
        
        logger.info("Starting MPT optimization")
        # Get initial MPT optimization
        initial_weights = portfolio_optimizer.optimize(
            df_calc,
            expected_return,
            risk_capacity
        )
        logger.info("MPT optimization completed")
        
        logger.info("Starting time series optimization")
        # Apply time series optimization
        final_weights = time_series_model.optimize_weights(
            df_calc,
            initial_weights,
            duration
        )
        logger.info("Time series optimization completed")
        
        logger.info("Calculating portfolio metrics")
        # Calculate portfolio metrics
        portfolio_metrics = portfolio_optimizer.calculate_metrics(
            df_calc,
            final_weights
        )
        
        logger.info("Optimization completed successfully")
        return jsonify({
            'status': 'success',
            'optimal_weights': final_weights.tolist(),
            'portfolio_metrics': portfolio_metrics
        })
        
    except Exception as e:
        logger.error(f"Error during optimization: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 400

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True) 