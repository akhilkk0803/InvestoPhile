from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from mpt.optimizer import mpt_optimizer_from_df

# === Configuration ===
CSV_PATH = 'data/prices.csv'  # Update this if your CSV is named differently
app = Flask(__name__)

# === Helper to map risk level (1–5) to max volatility threshold ===
def map_risk_level_to_volatility(risk_level):
    return {
        1: 0.05,
        2: 0.10,
        3: 0.15,
        4: 0.20,
        5: 0.25
    }.get(risk_level, 0.15)  # Default to 0.15 if invalid level

# === Route to accept user query and return MPT portfolio ===
@app.route('/get_portfolio', methods=['POST'])
@app.route("/get_portfolio", methods=["POST"])
def get_portfolio():
    data = request.get_json()

    initial_amount = data.get("initial_amount")
    duration_months = data.get("duration_months")
    target_return = data.get("target_return")
    risk_level = data.get("risk_level")

    try:
        # Load the prices
        prices_df = pd.read_csv(CSV_PATH, index_col=0, parse_dates=True)

        # Call MPT optimizer
        result = mpt_optimizer_from_df(prices_df)

        return jsonify({
            "assets": list(result["weights"].keys()),
            "allocations": list(result["weights"].values())
        })

    except Exception as e:
        return jsonify({"error": f"MPT Optimization failed: {str(e)}"})


# === Run the Flask app ===
if __name__ == '__main__':
    app.run(debug=True)
