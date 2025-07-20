from fastapi import FastAPI
from app.routers import crawler

app = FastAPI()
app.include_router(crawler.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to your FastAPI app!"}
