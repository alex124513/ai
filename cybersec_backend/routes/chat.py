from fastapi import APIRouter, Request
from pydantic import BaseModel
from chat_engine import query_llm

router = APIRouter()

class ChatRequest(BaseModel):
    message: str



@router.post("/")
async def chat(req: ChatRequest):
    response = await query_llm(req.message)
    print("從llm得到的回應:", response)
    return {"response": response}
