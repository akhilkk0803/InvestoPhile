import pandas as pd
from nixtla import NixtlaClient

class TimeGPTForecaster:
    def __init__(self, horizon=30, api_key=None):
        self.horizon = horizon
        self.client = NixtlaClient(api_key=api_key)

        # ✅ Validate API Key
        if not self.client.validate_api_key():
            raise ValueError("❌ Invalid TimeGPT API Key. Please check your API key.")

    def forecast(self, prices: pd.DataFrame) -> pd.DataFrame:
        forecasts = {}
        for asset in prices.columns:
            df = pd.DataFrame({
                "ds": prices.index,
                "y": prices[asset]
            })
            forecast = self.client.forecast(
                df=df,
                h=self.horizon,
                time_col='ds',
                target_col='y'
            )
            forecasts[asset] = forecast['TimeGPT'].values

        forecast_index = pd.date_range(start=prices.index[-1], periods=self.horizon + 1, freq='D')[1:]
        return pd.DataFrame(forecasts, index=forecast_index)
