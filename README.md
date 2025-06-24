# 🧠 AI Cybersecurity Sales Assistant（LLM + RAG 全端聊天機器人）

> **用 AI 幫助新客戶選擇資安產品，節省人力成本，提升初步導客效率。**  
> 結合向量檢索、本地語言模型、FastAPI + React，打造適用於資安產品導購的 AI 聊天助理。

---

## 🎯 專案目的

本系統是一套**資安產品推薦機器人**，讓新客戶可透過自然語言詢問資安相關問題，並快速得到合適產品建議。

### ☝️ 我們的目標不是取代真人客服，而是做「導購前站」的角色

此聊天機器人專為**新客戶 / 潛在客戶**設計，幫助他們：
- 初步了解有哪些資安產品可能適用
- 減輕開口壓力（不必一開始就面對真人業務）
- 用自己的話表達需求，再進一步聯絡客服或業務

### 👥 假設前提

1. **新客戶常見問題與障礙：**
   - a. 不知道自己是否需要資安產品
   - b. 不確定公司預算是否足夠
   - c. 面對工程師會有溝通壓力，怕聽不懂技術語言  
   → 本 AI 能以親切語氣回應問題，幫助降低初期接觸門檻。

2. **舊客戶仍以真人溝通為主：**
   - 已建立關係者通常會直接找認識的業務詢問（如用 Line 或 WhatsApp）
   - 業務對客戶背景熟悉，比 AI 更有效率  
   → 本系統不干擾既有流程，專注服務第一線的新客轉換。

3. **新客戶只會跟AI對話約15分鐘內**
---

## 🖼️ 系統架構圖

```
User ↔️ Frontend (React) ↔️ Backend API (FastAPI)
                                       ↘
                                          +→ Vector Index (llama-index + E5)
                                          +→ Local LLM (via Ollama)
                                          +→ JSON Product Data
```

---

## 🔧 技術棧

| 層級 | 技術 |
|------|------|
| 前端 | React, TypeScript, Mantine UI |
| 後端 | FastAPI, Pydantic |
| 向量檢索 | [llama-index](https://github.com/jerryjliu/llama_index), [E5 embedding](https://huggingface.co/intfloat/multilingual-e5-large) |
| 模型推理 | [Ollama](https://ollama.com/)（搭配 `Llama-Breeze2-8B-Instruct` 模型） |
| 資料來源 | JSON 資安產品資料庫 |

---

## 🚀 快速啟動指南

### ✅ 前置需求

- Node.js v18+
- Python 3.10+
- [Ollama](https://ollama.com/) 並已安裝以下模型：

```bash
ollama run willqiu/Llama-Breeze2-8B-Instruct:latest
```

---

### 1 安裝後端（FastAPI）

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
可以用Postman測API

### 2 安裝前端（React）

```bash
cd frontend
npm install
npm run dev
```
⚠️ 預設前端會呼叫 http://localhost:8000 取得回應

### 2 本地LLM（Llama）
(待更新)
---

## 📦 資料結構說明

產品資料存於 `products/products.json` 中，格式範例如下：

```json
{
  "id": 1,
  "name": "FortiGate 60F",
  "category": "防火牆",
  "product_type": "hardware",
  "description": "這是一款適用於中小企業的入門型防火牆...",
  "tags": ["網路安全", "威脅防護"],
  "price": 18800
}
```


---

## 🤖 Prompt 設計邏輯

聊天機器人透過 Prompt 工程設定行為，具備以下規則：
(待更新)
---

## 🏗️ 開發中項目（Beta）

- [ ] 對話歷史記憶與 Session 管理（目前使用簡易 global set）
- [ ] 聊天視覺優化（tag highlight / 回覆動畫）
- [ ] 精簡提示詞工程與錯誤處理
- [ ] 文件與測試補齊（pytest / E2E 測試）
