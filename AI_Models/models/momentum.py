import pandas as pd
from models.base import BaseRanker

class MomentumRanker(BaseRanker):
    def __init__(self, lookback=30):
        self.lookback = lookback

    def rank(self, prices: pd.DataFrame) -> list:
        """
        Ranks assets based on simple momentum (return over lookback window).
        Returns list of asset names sorted by descending momentum.
        """
        recent_prices = prices.iloc[-self.lookback:]
        returns = recent_prices.pct_change().sum()
        ranked_assets = returns.sort_values(ascending=False).index.tolist()
        return ranked_assets