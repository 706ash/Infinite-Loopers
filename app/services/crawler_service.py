from crawlee.crawlers import PlaywrightCrawler, PlaywrightCrawlingContext
import asyncio
import re
from datetime import timedelta
from tabulate import tabulate



def is_within_48_hours(upload_text):
    match = re.match(r"(\d+)\s+(minute|hour|day)s? ago", upload_text)
    if not match:
        return False
    value, unit = int(match.group(1)), match.group(2)
    if unit == "minute":
        delta = timedelta(minutes=value)
    elif unit == "hour":
        delta = timedelta(hours=value)
    elif unit == "day":
        delta = timedelta(days=value)
    else:
        return False
    return delta <= timedelta(hours=48)

async def run_youtube_crawler(query: str):
    YOUTUBE_URL = f"https://www.youtube.com/results?search_query={query}&sp=CAMSBAgDEAE%253D"
    crawler = PlaywrightCrawler(
        max_requests_per_crawl=1,
        headless=True,
        browser_type='chromium',
    )
    videos_data = []

    @crawler.router.default_handler
    async def request_handler(context: PlaywrightCrawlingContext):
        await context.page.goto(YOUTUBE_URL)
        try:
            consent_button = await context.page.query_selector('button[aria-label="Agree to the use of cookies and other data for the purposes described"]')
            if consent_button:
                await consent_button.click()
                await context.page.wait_for_timeout(2000)
        except Exception:
            pass

        for _ in range(5):
            await context.page.mouse.wheel(0, 10000)
            await context.page.wait_for_timeout(1000)

        await context.page.wait_for_selector('ytd-video-renderer', timeout=10000)
        videos = await context.page.query_selector_all('ytd-video-renderer')
        for video in videos:
            title_el = await video.query_selector('#video-title')
            if not title_el:
                continue
            url = await title_el.get_attribute('href')
            if not url or not (url.startswith('/watch') or url.startswith('/shorts')):
                continue
            meta_items = await video.query_selector_all('span.inline-metadata-item')
            if not meta_items or len(meta_items) < 2:
                continue
            title = await title_el.inner_text()
            views_text = await meta_items[0].inner_text()
            upload_text = await meta_items[1].inner_text()
            if not is_within_48_hours(upload_text):
                continue
            try:
                views = views_text.replace(' views', '').replace(',', '').strip()
                if 'K' in views:
                    views = int(float(views.replace('K', '')) * 1_000)
                elif 'M' in views:
                    views = int(float(views.replace('M', '')) * 1_000_000)
                else:
                    views = int(views)
            except Exception:
                views = 0
            is_short = '/shorts/' in url
            videos_data.append({
                "title": title,
                "url": f"https://www.youtube.com{url}",
                "views": views,
                "uploaded": upload_text,
                "is_short": is_short
            })

    await crawler.run([YOUTUBE_URL])

    top_videos = sorted(videos_data, key=lambda x: x['views'], reverse=True)[:5]
    return top_videos
    # table = [
    #     [
    #         video['title'],
    #         video['views'],
    #         video['uploaded'],
    #         "Short" if video['is_short'] else "Regular",
    #         video['url']
    #     ]
    #     for video in top_videos
    # ]
    # headers = ["Title", "Views", "Uploaded", "Type", "URL"]
    # print(tabulate(table, headers=headers, tablefmt="grid", maxcolwidths=[30, None, None, None, 40]))


