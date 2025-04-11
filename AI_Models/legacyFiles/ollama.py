import ollama
import requests
import json
from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings

# Sample user profiles for investment recommendations
user_profiles = [
    {"age": 25, "risk": "high", "goal": "Wealth Growth", "investment": "80% equity, 10% crypto, 10% MF"},
    {"age": 40, "risk": "moderate", "goal": "Retirement", "investment": "50% MF, 30% gold, 20% equity"},
    {"age": 60, "risk": "low", "goal": "Stability", "investment": "70% gold, 20% FD, 10% MF"}
]

# Convert profiles to JSON strings for vector storage
profile_texts = [json.dumps(profile) for profile in user_profiles]
embedding_model = OpenAIEmbeddings()

# Create FAISS vector store
vector_store = FAISS.from_texts(profile_texts, embedding_model)

def get_gold_price():
    url = "https://metals-api.com/api/latest"
    params = {
        "access_key": "d24b3674f682f704ecd698fa1087a1e9",
        "base": "XAU",
        "currency": "INR"  # Gold (XAU)
    }
    
    response = requests.get(url, params=params)
    data = response.json()
    
    return data["rates"]["INR"] if "rates" in data else None

# Example Usage
gold_price = get_gold_price()
print(f"Gold Price (per ounce): ${gold_price}")
def get_stock_price(ticker):
    url = f"https://api.marketstack.com/v1/eod/latest"
    params = {
        "access_key": "0bc04f7c25b4b4609890227f4fc062ad",
        "symbols": ticker
    }
    
    response = requests.get(url, params=params)
    data = response.json()
    
    if "data" in data and len(data["data"]) > 0:
        return data["data"][0]["close"]
    return None

# Example Usage
apple_stock = get_stock_price("AAPL")
print(f"Apple Stock Price: ${apple_stock}")

def get_mutual_fund_nav(fund_code):
    url = f"https://api.moneycontrol.com/mf/nav/{fund_code}"
    
    response = requests.get(url)
    data = response.json()
    
    return data.get("NAV") if data else None

# Example Usage
mutual_fund_nav = get_mutual_fund_nav("118834")  # Example fund code
print(f"Mutual Fund NAV: {mutual_fund_nav}")


def generate_investment_plan(age, risk, goal, amount):
    # Get real-time data
    gold_price = get_gold_price()
    stock_price = get_stock_price("AAPL")  # Example: Apple stock
    mf_nav = get_mutual_fund_nav("118834")  # Example Mutual Fund
    
    # Create augmented prompt
    prompt = f"""
    User Details:
    - Age: {age}
    - Risk Level: {risk}
    - Goal: {goal}
    - Investment Amount: {amount}

    Latest Market Data:
    - Gold Price: {gold_price}
    - Apple Stock Price: {stock_price}
    - Mutual Fund NAV: {mf_nav}

    Provide an **investment allocation breakdown** in JSON format like this:
    {{
        "equity": "percentage",
        "mutual_funds": "percentage",
        "gold": "percentage",
        "crypto": "percentage",
        "bonds": "percentage"
    }}
    """

    response = ollama.chat("mistral", messages=[{"role": "user", "content": prompt}])
    return response["message"]

# Example Usage

if __name__ == "__main__":
    investment_plan = generate_investment_plan(age=30, risk="moderate", goal="Retirement", amount=500000)
    print(investment_plan)