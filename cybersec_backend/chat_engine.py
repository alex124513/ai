from llama_index.core import VectorStoreIndex, Document
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.llms.ollama import Ollama
from llama_index.core import Settings
import json
from typing import Set

# 🔁 單一 session 追蹤推薦過的產品 ID
recommended_product_ids: Set[int] = set()

# 讀取產品資料
with open("data/products_10.json", "r", encoding="utf-8") as f:
    raw = json.load(f)

# 準備 Document 結構
documents = []
for p in raw:
    content = f"""產品名稱: {p['name']}
類別: {p['category']}
價格: {p['price']} 元
說明: {p['description']}"""
    metadata = {k: v for k, v in p.items() if k not in ["description"]}
    documents.append(Document(text=content, metadata=metadata))

# 嵌入模型
embed_model = HuggingFaceEmbedding(model_name="intfloat/multilingual-e5-large")

# LLM 模型 via Ollama
llm = Ollama(
    model="willqiu/Llama-Breeze2-8B-Instruct:latest",
    request_timeout=180
)

# 設定全域模型
Settings.llm = llm
Settings.embed_model = embed_model

# 建立向量索引與查詢引擎
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine(similarity_top_k=3, llm=llm)

# 查詢函式（給 FastAPI 用）
async def query_llm(user_input: str) -> str:
    global recommended_product_ids

    print("📝 使用者問題：", user_input)

    prompt = (
        "你係一位資深資安顧問兼銷售員，幫潛在客戶解決資安問題，目標係引導佢搵到適合我哋公司現有產品，唔好亂作資料。\n"
        "你手上有一份公司資安產品資料庫，只能用入面資料推薦產品。\n\n"
        "請依以下原則回覆：\n"
        "1. 如果你推薦的產品是首次在對話中出現，請用以下格式回覆：\n"
        "   - 產品名稱（ID）/ 價格 / 一句簡介\n"
        "   - 為何這個產品啱佢，請根據佢描述的實際問題去解釋。\n\n"
        "2. 如果佢問你推介過的產品的功能細節，而資料庫無寫，但你知道背景資訊，你可以用常識補充，但請清楚講明：「以下係一般知識，唔一定包含喺公司產品資料庫」。\n\n"
        "3. 如果客戶嘅描述唔夠清楚，你要反問佢一啲簡單問題，幫你了解佢問題所在。\n\n"
        "4. 如果產品資料庫中無適合產品，請真誠咁建議佢聯絡我哋真人客服，我哋可以根據佢情況開新方案處理，費用另議。\n\n"
        "你要用繁體中文，風格係親切、專業、有 sales feel。\n\n"
        "以下係客戶嘅提問：\n"
        f"{user_input}"
    )

    response = query_engine.query(prompt)

    print("🤖 模型回應：", response.response)
    print("📚 被引用的資料文件：")
    for i, node in enumerate(response.source_nodes):
        print(f"─── 第 {i+1} 筆文件 ───")
        print(node.node.text)

        # 嘗試記錄已回應的產品 ID
        product_id = node.node.metadata.get("id")
        if product_id:
            recommended_product_ids.add(product_id)

    return str(response.response)
