import os
import json
import torch
from datasets import Dataset
from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
    BitsAndBytesConfig,
    default_data_collator
)
from peft import LoraConfig, get_peft_model
from accelerate import Accelerator
from torch.utils.data import DataLoader

# === 設定 ===
MODEL_NAME = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
DATA_PATH = "../dataset/sales_style_qa.jsonl"
OUTPUT_DIR = "./lora-out"

print("=" * 40)
print(f"🖥️ CUDA: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"🧠 GPU: {torch.cuda.get_device_name(0)}")
print("=" * 40)

# === tokenizer ===
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME, trust_remote_code=True)
tokenizer.pad_token = tokenizer.eos_token

# === QLoRA 4bit 量化設定 ===
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_use_double_quant=True,
    bnb_4bit_compute_dtype=torch.float16
)

# === 載入模型 ===
base_model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,
    quantization_config=bnb_config,
    device_map="auto"
)

# === 準備 LoRA ===
peft_config = LoraConfig(
    r=8,
    lora_alpha=16,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)
model = get_peft_model(base_model, peft_config)

# === 加速器 ===
accelerator = Accelerator()
model = accelerator.prepare(model)

# === 載入資料 ===
def load_jsonl(path):
    with open(path, "r", encoding="utf-8") as f:
        return [json.loads(line) for line in f]

data = Dataset.from_list(load_jsonl(DATA_PATH))

# === 前處理 ===
def preprocess(example):
    if example["input"]:
        prompt = f"### 問題：{example['instruction']}\n{example['input']}\n\n### 回覆："
    else:
        prompt = f"### 問題：{example['instruction']}\n\n### 回覆："
    full_text = prompt + example["output"]
    prompt_ids = tokenizer(prompt).input_ids
    tokenized = tokenizer(full_text, max_length=512, truncation=True, padding="max_length")
    labels = [-100] * len(prompt_ids) + tokenized["input_ids"][len(prompt_ids):]
    labels = labels[:512] + [-100] * (512 - len(labels))
    tokenized["labels"] = labels
    return tokenized

data = data.map(preprocess)
dataloader = DataLoader(data, batch_size=1, shuffle=True, collate_fn=default_data_collator)

optimizer = torch.optim.AdamW(model.parameters(), lr=2e-4)
model.train()

num_epochs = 3
gradient_accumulation_steps = 8
global_step = 0

for epoch in range(num_epochs):
    for step, batch in enumerate(dataloader):
        with accelerator.accumulate(model):
            outputs = model(**{k: v.to(model.device) for k, v in batch.items()})
            loss = outputs.loss
            accelerator.backward(loss)
            if accelerator.sync_gradients:
                optimizer.step()
                optimizer.zero_grad()
                global_step += 1

        if step % 10 == 0:
            print(f"[Epoch {epoch}] Step {step} - Loss: {loss.item():.4f}")

# === 儲存 ===
accelerator.wait_for_everyone()
model.save_pretrained(OUTPUT_DIR)
tokenizer.save_pretrained(OUTPUT_DIR)
print(f"✅ 已儲存至 {OUTPUT_DIR}")
