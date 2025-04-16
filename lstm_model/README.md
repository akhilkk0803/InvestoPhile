# Portfolio Optimization Server

This Flask server implements Modern Portfolio Theory (MPT) combined with LSTM-based time series optimization to provide optimal portfolio allocations based on user inputs.

## Features

- Modern Portfolio Theory optimization
- LSTM-based time series prediction
- Risk-adjusted portfolio allocation
- Customizable investment parameters
- RESTful API interface

## Installation

1. Clone the repository
2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

1. Generate monthly historical data:
```bash
python generate_monthly_data.py
```

2. Start the server:
```bash
python app.py
```

3. Send a POST request to `/optimize` with the following JSON body:
```json
{
    "amount": 100000,
    "expected_return": 0.15,
    "risk_capacity": 3,
    "duration": 12,
    "csv_file_path": "path/to/your/data.csv"
}
```

Where:
- `amount`: Total investment amount
- `expected_return`: Expected total return over the investment duration (e.g., 0.15 for 15% total return)
- `risk_capacity`: Risk tolerance on a scale of 1-5 (1 being most conservative, 5 being most aggressive)
- `duration`: Investment duration in months
- `csv_file_path`: Path to your CSV file containing historical price data (optional, defaults to historical_monthly_data.csv)

The CSV file should have the following format:
- Each column should represent an asset
- Each row should represent a date
- Values should be the closing prices for each asset

## API Response

The server will return a JSON response with:
```json
{
    "status": "success",
    "optimal_weights": [0.3, 0.4, 0.3],
    "portfolio_metrics": {
        "total_return": 0.15,
        "annualized_return": 0.08,
        "annual_volatility": 0.15,
        "sharpe_ratio": 0.4,
        "risk_adjusted_return": 0.53,
        "asset_metrics": {
            "nifty_50": {"weight": 0.3, "contribution": 0.045},
            "fd": {"weight": 0.2, "contribution": 0.03},
            "gold": {"weight": 0.2, "contribution": 0.03},
            "govt_bond": {"weight": 0.2, "contribution": 0.03},
            "mf": {"weight": 0.1, "contribution": 0.015}
        }
    }
}
```

## Health Check

You can check if the server is running by sending a GET request to `/health`:
```bash
curl http://localhost:5000/health
```

## Notes

- The server uses a 2% risk-free rate for calculations
- The LSTM model uses 12 months of historical data for predictions
- The final weights are a blend of MPT optimization (70%) and time series predictions (30%)
- The expected_return parameter represents the total return over the investment duration, not an annual return 