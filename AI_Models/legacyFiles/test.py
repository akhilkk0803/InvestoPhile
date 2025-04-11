import transformers
import torch

# Load Model
model_id = "WiroAI/WiroAI-Finance-Qwen-1.5B"
pipeline = transformers.pipeline(
    "text-generation",
    model=model_id,
    model_kwargs={"torch_dtype": torch.bfloat16},
    device_map="auto",
)

pipeline.model.eval()

# Prompt (Qwen models generally use text input)
prompt = """You are a finance chatbot developed by Wiro AI.
User: How can central banks balance the trade-off between controlling inflation and maintaining economic growth, especially in an environment of high public debt and geopolitical uncertainty?
AI:"""

# Define Terminator Token
eos_token_id = pipeline.tokenizer.eos_token_id  # Default EOS token

# Generate Response
outputs = pipeline(
    prompt,
    max_new_tokens=512,
    eos_token_id=eos_token_id,
    do_sample=True,
    temperature=0.9,
)

print(outputs[0]["generated_text"])
