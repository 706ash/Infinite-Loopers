import os
import re
import random
from playwright.sync_api import sync_playwright
from dotenv import load_dotenv
import datetime
import string
from fastapi.concurrency import run_in_threadpool

load_dotenv('p.env')
TWITTER_USER = os.getenv('TWITTER_USER')
TWITTER_PASS = os.getenv('TWITTER_PASS')
AUTH_FILE = "twitter_auth.json"

def parse_abbreviated_number(s):
    s = s.replace(',', '').strip()
    if s[-1].upper() == 'K':
        return int(float(s[:-1]) * 1_000)
    elif s[-1].upper() == 'M':
        return int(float(s[:-1]) * 1_000_000)
    elif s[-1].isdigit():
        return int(s)
    else:
        return 0

def clean_text(text):
    text = text.replace('\n', ' ').replace('\r', ' ').replace('\t', ' ')
    text = re.sub(r'[\\/]+', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    text = text.strip()
    return text

def save_twitter_auth():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context()
        page = context.new_page()
        page.goto('https://twitter.com/login')
        page.wait_for_selector('input[name="text"]', timeout=15000)
        page.fill('input[name="text"]', TWITTER_USER)
        page.keyboard.press('Enter')
        page.wait_for_selector('input[name="password"]', timeout=15000)
        page.fill('input[name="password"]', TWITTER_PASS)
        page.keyboard.press('Enter')
        page.wait_for_timeout(5000)
        context.storage_state(path=AUTH_FILE)
        browser.close()

def scrape_twitter_niche(niche="cars"):
    if not os.path.exists(AUTH_FILE):
        save_twitter_auth()
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(storage_state=AUTH_FILE)
        page = context.new_page()
        until_date = datetime.datetime.utcnow().date()
        since_date = until_date - datetime.timedelta(days=2)
        query = f'{niche} min_replies:5 min_faves:10 min_retweets:2 until:{until_date} since:{since_date}'
        # query = f'{niche} until:{until_date} since:{since_date}'
        url = f'https://twitter.com/search?q={query.replace(" ", "%20")}&src=typed_query&f=live'
        page.goto(url)
        page.wait_for_selector('article', timeout=15000)
        last_count = 0
        for _ in range(50):
            articles = page.query_selector_all('article')
            if len(articles) == last_count:
                break
            last_count = len(articles)
            page.mouse.wheel(0, 2000)
            page.wait_for_timeout(random.randint(1200, 2200))
        articles = page.query_selector_all('article')
        tweets_data = []
        for article in articles:
            text = clean_text(article.inner_text())
            engagement = {"replies": 0, "retweets": 0, "likes": 0, "views": 0}
            for label, key in [("Reply", "replies"), ("Retweet", "retweets"), ("Repost", "retweets"), ("Like", "likes"), ("View", "views")]:
                try:
                    el = article.query_selector(f'[aria-label*="{label}"]')
                    if el:
                        count = parse_abbreviated_number(el.inner_text())
                        engagement[key] = count
                except Exception:
                    pass
            if engagement["retweets"] == 0:
                try:
                    el = article.query_selector('[data-testid="retweet"]')
                    if el:
                        count = parse_abbreviated_number(el.inner_text())
                        engagement["retweets"] = count
                except Exception:
                    pass
            tweet_date = None
            try:
                time_tag = article.query_selector('time')
                if time_tag:
                    dt_str = time_tag.get_attribute('datetime')
                    if dt_str:
                        tweet_date = dt_str[:10]
            except Exception:
                pass
            tweet_url = None
            link = article.query_selector('a[href*="/status/"]')
            if link:
                tweet_url = link.get_attribute('href')
            replies = []
            if tweet_url:
                thread_page = context.new_page()
                try:
                    thread_page.goto(f"https://twitter.com{tweet_url}")
                    thread_page.wait_for_selector('article', timeout=15000)
                    reply_articles = thread_page.query_selector_all('article')
                    for reply_article in reply_articles[1:4]:
                        replies.append(clean_text(reply_article.inner_text()))
                except Exception:
                    pass
                thread_page.close()
            tweets_data.append({
                "text": text,
                "date": tweet_date,
                "replies": engagement["replies"],
                "retweets": engagement["retweets"],
                "likes": engagement["likes"],
                "views": engagement["views"],
                "top_replies": " || ".join(replies)
            })
        browser.close()
        tweets_data.sort(key=lambda t: (
            t.get("views", 0),
            t.get("likes", 0),
            t.get("retweets", 0),
            t.get("replies", 0)
        ), reverse=True)
        return tweets_data[:5]

async def run_twitter_niche_crawler(niche: str = "cars"):
    return await run_in_threadpool(scrape_twitter_niche, niche)
