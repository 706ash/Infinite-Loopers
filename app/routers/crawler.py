from fastapi import APIRouter
from app.services.crawler_service import run_youtube_crawler

router = APIRouter()

@router.get("/youtube_crawler")
async def crawl(query: str):
    results = await run_youtube_crawler(query)
    return results
