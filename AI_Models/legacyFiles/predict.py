import sys
import numpy as np
from tensorflow.keras.models import load_model

model = load_model('portfolio_model.h5')

# Get user input from Express
user_input = eval(sys.argv[1])
user_data = np.array([user_input])  # Format input as required by the model

# Make prediction
prediction = model.predict(user_data)
print(prediction.tolist())
