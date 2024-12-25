from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from flask_cors import CORS
from sklearn.preprocessing import StandardScaler

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Example average returns (replace with actual calculations if needed)
equities_avg_return = 8.0
bonds_avg_return = 4.0
gold_avg_return = 6.0
fd_avg_return = 3.5
mf_debt_avg_return = 7.0

# Scaler (load a pre-fitted scaler or fit with your data)
scaler = StandardScaler()
# Load pre-fitted scaler or train it here (commented to indicate where you'd do this)
# scaler.fit(training_data)  # Fit scaler on your dataset during preprocessing

# Mappings
risk_tolerance_mapping = {
    'Very Low': 0,
    'Low': 0.25,
    'Moderate': 0.5,
    'High': 0.75,
    'Very High': 1
}
investment_type_mapping = {
    'Lumpsum': 1,
    'Sip': 0
}

# Load the model
model = tf.keras.models.load_model('portfolio_model.h5')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data
        data = request.json
        print("Received data:", data)

        # Map risk tolerance and investment type
        data['riskToleranceScaled'] = risk_tolerance_mapping.get(data['riskTolerance'], None)
        data['investmentTypeScaled'] = investment_type_mapping.get(data['investmentType'], None)

        # Validate mappings
        if data['riskToleranceScaled'] is None or data['investmentTypeScaled'] is None:
            raise ValueError("Invalid riskTolerance or investmentType value.")

        # Prepare query input
        query = np.array([[
            data['riskToleranceScaled'],
            data['investmentAmount'],
            data['investmentTypeScaled'],
            data['duration'],
            data['targetAmount'],
            equities_avg_return,
            bonds_avg_return,
            gold_avg_return,
            fd_avg_return,
            mf_debt_avg_return
        ]])

        # Transform query using the scaler
       

        # Predict using the loaded model
        prediction = model.predict(query).tolist()
        print("Prediction:", prediction)

        # Return prediction
        return jsonify({'prediction': prediction})
    
    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=8000, debug=True)
