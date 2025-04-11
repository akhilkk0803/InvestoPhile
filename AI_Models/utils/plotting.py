import matplotlib.pyplot as plt

def plot_portfolio_performance(portfolio_series):
    plt.figure(figsize=(10, 5))
    plt.plot(portfolio_series.index, portfolio_series.values, label='Portfolio Value')
    plt.title("Simulated Portfolio Performance")
    plt.xlabel("Date")
    plt.ylabel("Value")
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.show()