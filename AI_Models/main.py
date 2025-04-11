from mpt.optimizer import mpt_optimizer
from simulator.tracker import simulate_portfolio
from utils.plotting import plot_portfolio_performance

if __name__ == "__main__":
    result = mpt_optimizer("data/dummy_portfolio.csv")
    sim_series = simulate_portfolio(result['prices'], result['weights'])
    plot_portfolio_performance(sim_series)