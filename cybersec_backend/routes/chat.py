
from fastapi import APIRouter
from pydantic import BaseModel
from chat_engine import query_llm

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

# ✅ 路由函式改為同步
@router.post("/")
def chat(req: ChatRequest):
    response = query_llm(req.message)
    print("從llm得到的回應:", response)
    return {"response": response}
