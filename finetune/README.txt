構想說明
在這次應用中，LLM使用全RAG而不用Fine Tuning 應該也是可以，純粹好奇自己的想法到底能不能微調模型。
若技術上&硬件上可行，微調應該只限於改善a.增強資安相關認知 > b.粵語對答風格
Product List由於公司會隨時改動eg.上架/下架   所以只能用RAG去讀，不宜進行微調。
用QLORA應該會比LORA更省VRAM (RTX3050 4GB)。
LLM改用TinyLlama-1.1B-Chat-v1.0 去做實驗，因為7B model跑得動不代表硬體上能做微調。


資料夾說明
dataset/：放訓練資料，例如 sales_style_qa.jsonl
scripts/：放訓練程式 train.py
scripts/lora-out/：儲存微調後的 LoRA 結果


使用步驟
0.確定有裝好pip install transformers datasets peft accelerate bitsandbytes
1. 將 .jsonl 訓練資料放進 dataset/，修改 scripts/train.py 中的模型名稱。
2. 執行train.py
3. 執行test.py

目前開發進度
1.dataset設計的欄位應該算是有問題
2.導致測試模型時 要用奇怪的格式去input
3.dataset大概只有128筆(行)資料&當中有重複


==============================================================================
測試                                                                       ===
-------------------                                                        ===
1.根據test.py :                                                            ===
prompt = (                                                                 ===
    "### 問題：用輕鬆但專業既語氣，講解密碼管理工具幫 SME 管好帳戶\n"          ===
    "點樣設定強密碼先安全？\n\n"                                             ===
    "### 回覆："                                                            ===
)                                                                           ===
-------------------                                                         ===
2. LLM 輸出:                                                                ===
root@8b39a811a1f9:/workspace/finetune/scripts# python test.py              ===
=== AI 回覆 ===                                                             ===
可以考慮用 password manager，唔洗記住曬。                                     ===
==============================================================================