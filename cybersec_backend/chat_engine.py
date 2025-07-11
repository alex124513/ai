from llama_index.core import VectorStoreIndex, Document
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.llms.ollama import Ollama
from llama_index.core import Settings

import json
import re

# === Step 1: 載入產品資料 ===
with open("data/products.json", "r", encoding="utf-8") as f:
    raw = json.load(f)

# 將每個產品轉為向量化 Document
documents = []
for p in raw:
    content = f"""產品名稱: {p['name']}
類別: {p['category']}
價格: {p['price']} 元
說明: {p['description']}"""
    metadata = {k: v for k, v in p.items() if k not in ["description", "id"]}
    documents.append(Document(text=content, metadata=metadata))

# === Step 2: 設定嵌入模型與 LLM ===
embed_model = HuggingFaceEmbedding(model_name="intfloat/multilingual-e5-large")
llm = Ollama(
    model="gemma3:12b",
    base_url="https://2ff8ce55d12c.ngrok-free.app",
    request_timeout=60
)

Settings.llm = llm
Settings.embed_model = embed_model

# === Step 3: 建立索引與查詢引擎 ===
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine(similarity_top_k=3, llm=llm)

# === Step 4: Prompt 構建函式 ===
def build_prompt(user_input: str) -> str:
    return f"""
        你係資安顧問公司嘅首席顧問兼高級業務代表，專幫香港中小企揀啱網絡保安方案。你嘅角色要「專業 + 輕鬆」，語氣類似銀行RM：唔硬銷，用粵語引導需求、解釋複雜概念、再提出部署建議。

        🧠【用戶問題】
        {user_input}

        🧭【回答步驟】
        1️⃣ 先快速理解用戶輸入的需求類型（如 VPN、端點防護、NAS保護）
        2️⃣ 判斷現有產品資料中，邊啲產品可以滿足其需求（邏輯對應）
        3️⃣ 若完全無法對應，需主動講明「無完全匹配方案」，並提供接近方案
        4️⃣ 回覆時請用以下結構：

        ---
        👋 **簡單打招呼 + 重述需求重點**

        🧠 **判斷分析：**
        - 判斷用戶想解決的問題是乜
        - 解釋常見做法 or 網絡架構
        - 用「如果你係想...，一般會咁做...」引導

        ⭐ **建議方案（最多 3 項）：**
        1. 產品名稱：<名稱>（⭐ 建議首選 - 如最推薦）
        * 適合原因：<一句對應用戶需求>
        * 核心功能：<最多三點條列式>
        * 價錢提示：每月約 HK$XXX 起

        🛠 **部署路線圖：**
        - 用一段話講解：應該點樣部署（例如「第一步係用 VPN router 放喺公司，再裝 VPN client 喺出差同事部機...」）

        📞 **Call to Action：**
        - 如果你想進一步了解，可以 Whatsapp 我哋資安顧問團隊，我哋會幫你睇清楚你部 NAS 同網絡點設置先最穩陣。

        📚 被引用產品資料如下（簡短列出）:
        - 格式：<產品名稱>｜<類型>｜<一句描述>

        ---
        📝 注意：
        - 用 70% 書面中文 + 30% 粵語口語
        - 如資訊不足，可用 5W1H 引導問法，例如：「你哋 NAS 係咪用緊 Synology？有冇開 VPN Server？」
        """

# === Step 5: 清理 markdown，使回應適合前端展示 ===
def clean_markdown(text: str) -> str:
    text = re.sub(r"\\*\\*|---|\\* ", "", text)
    text = re.sub(r"^\\d+\\. ", "", text, flags=re.MULTILINE)
    text = re.sub(r"^\\s*- ", "", text, flags=re.MULTILINE)
    text = re.sub(r"\\n{2,}", "\\n\\n", text)
    return text.strip()

# === Step 6: 查詢處理函式 ===
def query_llm(user_input: str) -> str:
    print("\n📝 使用者問題：", user_input)

    prompt = build_prompt(user_input)
    response = query_engine.query(prompt)

    print("\n🤖 模型回應（log only）：", response.response)
    print("\n📚 被引用的資料文件（log only）：")
    for i, node in enumerate(response.source_nodes):
        print(f"─── 第 {i+1} 筆文件 ───")
        print(node.node.text)

    return clean_markdown(response.response)
