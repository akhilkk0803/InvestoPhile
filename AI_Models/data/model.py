import data
import json
import ollama

def llama_with_sdk(user_input_dict):
    historical_data = {
        "gold": data.gold,
        "bonds": data.bond,
        "stocks": data.nifty_50,
        "mf": data.mf,
        "fd": data.fd
    }
    prompt = f"""
You are a financial advisor AI. Your ONLY task is to take a user's investment profile and return a suggested asset allocation.

You are given:
1. Summary stats for historical performance of asset classes from 2004–2024
2. The user's investment goal

⚠️ IMPORTANT:
- Return ONLY a JSON object like this:
{{
  "bonds": "20%",
  "gold": "15%",
  "stocks": "30%",
  "mf": "25%",
  "fd": "10%"
}}
- Do NOT explain or describe your reasoning.
- Do NOT add any extra text or formatting.
- The percentages MUST add up to 100%.

### User Input:
{json.dumps(user_input_dict)}

### Historical Asset Summaries:
{json.dumps(historical_data)}
"""
    # Generate from the model
    response = ollama.generate(
        model='llama3.2',
        prompt=prompt
    )
    return response['response']


if __name__ == "__main__":
    user_data = {
        "age": 21,
        "initialInvestment": 200000,
        "goalInvestment": 400000,
        "goalDuration": "5 years"
    }

    result = llama_with_sdk(user_data)
    print(result)
