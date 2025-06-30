import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from peft import PeftModel

# === 基本設定 ===
BASE_MODEL = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"   # 你訓練用邊隻 base model
LORA_PATH = "./lora-out"                             # 你 LoRA 輸出資料夾

# === 載入 tokenizer ===
tokenizer = AutoTokenizer.from_pretrained(BASE_MODEL, trust_remote_code=True)
tokenizer.pad_token = tokenizer.eos_token

# === 載入 base model 及 LoRA 權重 ===
base_model = AutoModelForCausalLM.from_pretrained(
    BASE_MODEL, device_map="auto", torch_dtype=torch.float16
)
model = PeftModel.from_pretrained(base_model, LORA_PATH)
model.eval()

# === 測試函式 ===
def generate(prompt, max_new_tokens=128):
    inputs = tokenizer(prompt, return_tensors="pt", padding=True).to(model.device)
    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_new_tokens=max_new_tokens,
            do_sample=True,
            top_p=0.95,
            temperature=0.7,
            pad_token_id=tokenizer.eos_token_id
        )
    # 只取模型 output 部分
    output_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    # 將 prompt 移除，只留回應
    return output_text[len(prompt):].strip()

# === 測試 prompt（必須同 dataset 格式一致！）===
prompt = (
    "### 問題：用輕鬆但專業既語氣，講解密碼管理工具幫 SME 管好帳戶\n"
    "點樣設定強密碼先安全？\n\n"
    "### 回覆："
)

response = generate(prompt)
print("=== AI 回覆 ===")
print(response)
