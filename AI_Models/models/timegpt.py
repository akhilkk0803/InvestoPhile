import os
import pandas as pd
from nixtla import NixtlaClient
from dotenv import load_dotenv

load_dotenv()

def get_forecasted_prices(prices_df: pd.DataFrame, months: int) -> pd.DataFrame:
    client = NixtlaClient(api_key=os.getenv("TIMEGPT_API_KEY"))
    client.validate_api_key()

    forecasted_df = pd.DataFrame()
    
    for column in prices_df.columns:
        try:
            series = pd.DataFrame({
                "unique_id": column,
                "ds": prices_df.index,
                "y": prices_df[column].values
            })

            # Perform forecast
            forecast = client.forecast(df=series, h=months)

            # Check available columns
            if "yhat" in forecast.columns:
                y_col = "yhat"
            elif "TimeGPT" in forecast.columns:
                y_col = "TimeGPT"
            else:
                raise ValueError(f"No forecast column found for {column}. Available columns: {forecast.columns.tolist()}")

            # Extract and format
            forecast = forecast[forecast["unique_id"] == column][["ds", y_col]]
            forecast.set_index("ds", inplace=True)
            forecasted_df[column] = forecast[y_col]
        
        except Exception as e:
            raise RuntimeError(f"TimeGPT forecast failed for {column}: {e}")

    return forecasted_df
