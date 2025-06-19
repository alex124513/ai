from fastapi import FastAPI
from routes import products, chat

app = FastAPI()

app.include_router(products.router, prefix="/products", tags=["Products"])
app.include_router(chat.router, prefix="/chat", tags=["Chat"])




from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
