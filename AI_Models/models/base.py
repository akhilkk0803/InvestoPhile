from abc import ABC, abstractmethod
import pandas as pd

class BaseRanker(ABC):
    @abstractmethod
    def rank(self, prices: pd.DataFrame) -> list:
        pass