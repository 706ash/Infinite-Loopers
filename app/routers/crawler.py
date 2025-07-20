from fastapi import APIRouter
from app.services.crawler_service import run_youtube_crawler
from app.services.twitter_niche_service import run_twitter_niche_crawler

router = APIRouter()

@router.get("/youtube_crawler")
async def crawl(query: str):
    results = await run_youtube_crawler(query)
    return results

@router.get("/twitter_niche_crawler")
async def twitter_niche(niche: str = "cars"):
    results = await run_twitter_niche_crawler(niche)
    return results