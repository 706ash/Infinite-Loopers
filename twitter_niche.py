import os
import re
import random
from collections import Counter
from playwright.sync_api import sync_playwright
from dotenv import load_dotenv
import json
import datetime
import string

load_dotenv('p.env')
TWITTER_USER = os.getenv('TWITTER_USER')
TWITTER_PASS = os.getenv('TWITTER_PASS')
AUTH_FILE = "twitter_auth.json"

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
    # Replace newlines and tabs with a space
    text = text.replace('\n', ' ').replace('\r', ' ').replace('\t', ' ')
    # Remove slashes and other unwanted symbols (except hashtags, mentions, and punctuation)
    # You can customize this regex as needed
    text = re.sub(r'[\\/]+', ' ', text)
    # Remove multiple spaces
    text = re.sub(r'\s+', ' ', text)
    # Optionally, strip leading/trailing whitespace
    text = text.strip()
    return text

def scrape_hashtags(niche="cars"):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context(storage_state=AUTH_FILE)
        page = context.new_page()
        # Dynamically set the date range for the last 48 hours
        until_date = datetime.datetime.utcnow().date()
        since_date = until_date - datetime.timedelta(days=2)
        query = f'{niche} min_replies:5 min_faves:10 min_retweets:2 until:{until_date} since:{since_date}'
        url = f'https://twitter.com/search?q={query.replace(" ", "%20")}&src=typed_query&f=live'
        page.goto(url)
        page.wait_for_selector('article', timeout=15000)
        last_count = 0
        for _ in range(50):  # Up to 50 scrolls
            articles = page.query_selector_all('article')
            if len(articles) == last_count:
                break  # No new tweets loaded
            last_count = len(articles)
            page.mouse.wheel(0, 2000)
            page.wait_for_timeout(random.randint(1200, 2200))
        articles = page.query_selector_all('article')
        tweets_data = []
        for article in articles:
            text = clean_text(article.inner_text())
            # Find all engagement spans/buttons
            engagement = {"replies": 0, "retweets": 0, "likes": 0, "views": 0}
            for label, key in [("Reply", "replies"), ("Retweet", "retweets"), ("Repost", "retweets"), ("Like", "likes"), ("View", "views")]:
                try:
                    el = article.query_selector(f'[aria-label*="{label}"]')
                    if el:
                        count = parse_abbreviated_number(el.inner_text())
                        engagement[key] = count
                except Exception:
                    pass
            # Fallback: Try data-testid for retweets if still zero
            if engagement["retweets"] == 0:
                try:
                    el = article.query_selector('[data-testid="retweet"]')
                    if el:
                        count = parse_abbreviated_number(el.inner_text())
                        engagement["retweets"] = count
                except Exception:
                    pass

            # Extract tweet date (look for time tag)
            tweet_date = None
            try:
                time_tag = article.query_selector('time')
                if time_tag:
                    dt_str = time_tag.get_attribute('datetime')
                    if dt_str:
                        tweet_date = dt_str[:10]  # Only YYYY-MM-DD
            except Exception:
                pass

            # Extract tweet URL
            tweet_url = None
            link = article.query_selector('a[href*="/status/"]')
            if link:
                tweet_url = link.get_attribute('href')

            # Visit tweet thread page to get replies
            replies = []
            if tweet_url:
                thread_page = context.new_page()
                try:
                    thread_page.goto(f"https://twitter.com{tweet_url}")
                    thread_page.wait_for_selector('article', timeout=15000)
                    reply_articles = thread_page.query_selector_all('article')
                    for reply_article in reply_articles[1:4]:  # skip the first (main tweet), get up to 3 replies
                        replies.append(clean_text(reply_article.inner_text()))
                except Exception:
                    pass
                thread_page.close()

            tweets_data.append({
                "text": text,
                "date": tweet_date,
                "engagement": engagement,
                "replies": replies
            })
        browser.close()
        # Sort tweets by engagement: views, then likes, then retweets, then replies
        tweets_data.sort(key=lambda t: (
            t["engagement"].get("views", 0),
            t["engagement"].get("likes", 0),
            t["engagement"].get("retweets", 0),
            t["engagement"].get("replies", 0)
        ), reverse=True)
        print(json.dumps(tweets_data[:5], indent=2, ensure_ascii=False))

if __name__ == "__main__":
    if not os.path.exists(AUTH_FILE):
        save_twitter_auth()
    scrape_hashtags()