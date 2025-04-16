import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import LSTM, Dense, Dropout
import logging
import os
import pickle

logger = logging.getLogger(__name__)

class TimeSeriesModel:
    def __init__(self):
        self.model = None
        self.scaler = MinMaxScaler()
        self.sequence_length = 12  # 12 months of historical data
        self.max_epochs = 50  # Limit training epochs
        self.model_path = 'saved_model'
        self.scaler_path = 'saved_scaler.pkl'
        
        # Create directory for saved model if it doesn't exist
        if not os.path.exists(self.model_path):
            os.makedirs(self.model_path)
        
        # Try to load existing model and scaler
        self._load_model()
        
    def _load_model(self):
        """Load the saved model and scaler if they exist"""
        model_file = os.path.join(self.model_path, 'lstm_model.h5')
        if os.path.exists(model_file) and os.path.exists(self.scaler_path):
            try:
                logger.info("Loading saved model and scaler")
                self.model = load_model(model_file)
                with open(self.scaler_path, 'rb') as f:
                    self.scaler = pickle.load(f)
                logger.info("Model and scaler loaded successfully")
            except Exception as e:
                logger.error(f"Error loading model: {str(e)}")
                self.model = None
                self.scaler = MinMaxScaler()
        
    def _save_model(self):
        """Save the trained model and scaler"""
        try:
            logger.info("Saving model and scaler")
            model_file = os.path.join(self.model_path, 'lstm_model.h5')
            self.model.save(model_file)
            with open(self.scaler_path, 'wb') as f:
                pickle.dump(self.scaler, f)
            logger.info("Model and scaler saved successfully")
        except Exception as e:
            logger.error(f"Error saving model: {str(e)}")
        
    def prepare_data(self, df):
        """Prepare data for LSTM model"""
        logger.info("Preparing data for LSTM model")
        # Calculate monthly returns
        returns = df.pct_change().dropna()
        
        # Scale the data
        scaled_data = self.scaler.fit_transform(returns)
        
        X, y = [], []
        for i in range(len(scaled_data) - self.sequence_length):
            X.append(scaled_data[i:(i + self.sequence_length)])
            y.append(scaled_data[i + self.sequence_length])
            
        return np.array(X), np.array(y)
    
    def build_model(self, input_shape):
        """Build LSTM model"""
        logger.info("Building LSTM model")
        model = Sequential([
            LSTM(64, return_sequences=True, input_shape=input_shape),
            Dropout(0.2),
            LSTM(32, return_sequences=False),
            Dropout(0.2),
            Dense(input_shape[1])
        ])
        
        model.compile(optimizer='adam', loss='mse')
        return model
    
    def optimize_weights(self, df, initial_weights, duration):
        """
        Optimize portfolio weights using LSTM predictions
        Args:
            df: DataFrame with asset prices
            initial_weights: Initial weights from MPT
            duration: Prediction duration in months
        """
        logger.info("Starting time series optimization")
        # Prepare data
        X, y = self.prepare_data(df)
        
        # Build and train model if not already loaded
        if self.model is None:
            logger.info("Training new LSTM model")
            self.model = self.build_model((X.shape[1], X.shape[2]))
            self.model.fit(
                X, y,
                epochs=self.max_epochs,
                batch_size=16,
                verbose=0,
                validation_split=0.2
            )
            logger.info("LSTM model training completed")
            # Save the trained model
            self._save_model()
        
        # Make predictions
        logger.info("Making predictions")
        last_sequence = X[-1:]
        predictions = []
        
        # Make predictions for the specified duration
        for i in range(duration):
            pred = self.model.predict(last_sequence, verbose=0)
            predictions.append(pred[0])
            
            # Update sequence for next prediction
            last_sequence = np.roll(last_sequence, -1, axis=1)
            last_sequence[0, -1] = pred[0]
            
            if i % 3 == 0:  # Log progress every 3 months
                logger.info(f"Made {i+1}/{duration} monthly predictions")
        
        # Convert predictions back to original scale
        predictions = self.scaler.inverse_transform(np.array(predictions))
        
        # Calculate expected returns from predictions
        expected_returns = np.mean(predictions, axis=0)
        
        # Adjust weights based on predicted returns
        # Higher predicted returns get higher weights
        return_weights = np.exp(expected_returns) / np.sum(np.exp(expected_returns))
        
        # Blend with initial weights (70% initial, 30% predicted)
        final_weights = 0.7 * initial_weights + 0.3 * return_weights
        
        # Normalize to ensure weights sum to 1
        final_weights = final_weights / np.sum(final_weights)
        
        logger.info("Time series optimization completed")
        return final_weights 