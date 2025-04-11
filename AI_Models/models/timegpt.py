import os
import pandas as pd
from nixtla import NixtlaClient
from dotenv import load_dotenv
import logging

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_forecasted_prices(prices_df: pd.DataFrame, months: int) -> pd.DataFrame:
    """
    Forecasts future prices for each asset using Nixtla's TimeGPT.

    Args:
        prices_df (pd.DataFrame): Historical price data with datetime index and asset columns.
        months (int): Forecast horizon in months.

    Returns:
        pd.DataFrame: Forecasted price data for each asset.
    """
    api_key = os.getenv("TIMEGPT_API_KEY")
    if not api_key:
        raise EnvironmentError("TIMEGPT_API_KEY not found in environment variables.")

    client = NixtlaClient(api_key=api_key)

    try:
        client.validate_api_key()
    except Exception as e:
        raise RuntimeError(f"Failed to validate TimeGPT API key: {e}")

    forecasted_df = pd.DataFrame()
    logger.info("Starting forecast for each asset using TimeGPT...")

    for asset in prices_df.columns:
        logger.info(f"Processing asset: {asset}")
        try:
            series = pd.DataFrame({
                "unique_id": asset,
                "ds": prices_df.index,
                "y": prices_df[asset].values
            })

            forecast = client.forecast(df=series, h=months)

            if "yhat" in forecast.columns:
                forecast_column = "yhat"
            elif "TimeGPT" in forecast.columns:
                forecast_column = "TimeGPT"
            else:
                raise ValueError(
                    f"No valid forecast column found for asset {asset}. "
                    f"Available columns: {forecast.columns.tolist()}"
                )

            asset_forecast = forecast[forecast["unique_id"] == asset][["ds", forecast_column]]
            asset_forecast.set_index("ds", inplace=True)
            forecasted_df[asset] = asset_forecast[forecast_column]

        except Exception as e:
            logger.error(f"Forecasting failed for {asset}: {e}")
            raise RuntimeError(f"TimeGPT forecast failed for {asset}: {e}")

    logger.info("All assets forecasted successfully.")
    return forecasted_df
