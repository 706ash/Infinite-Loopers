import asyncio
from playwright.async_api import async_playwright
import re
from datetime import timedelta, datetime, timezone
from dateutil.parser import parse as parse_date


def _parse_date(date_str: str):
    if not date_str:
        return None
    try:
        # The meta tag provides a date in 'YYYY-MM-DD...' format.
        if re.match(r'^\d{4}-\d{2}-\d{2}', date_str):
            return date_str.split('T')[0]
        # For other text like "Premiered Oct 26, 2023", "Oct 26, 2023", etc.
        parsed_date = parse_date(date_str)
        return parsed_date.strftime('%Y-%m-%d')
    except (ValueError, TypeError):
        return None

async def run_youtube_crawler(query: str):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        page = await browser.new_page()
        YOUTUBE_URL = f"https://www.youtube.com/results?search_query={query}&sp=CAI%253D"
        await page.goto(YOUTUBE_URL)
        
        try:
            consent_button = await page.query_selector('button[aria-label="Agree to the use of cookies and other data for the purposes described"]')
            if consent_button:
                await consent_button.click()
                await page.wait_for_timeout(2000)
        except Exception:
            pass

        # Wait for initial results to load before scrolling
        await page.wait_for_selector('ytd-video-renderer', timeout=10000)

        # Scroll down until no more videos are loaded
        last_height = await page.evaluate('document.body.scrollHeight')
        for i in range(30):  # Increased to 30 scrolls
            await page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
            await page.wait_for_timeout(4000)  # Increased wait to 4 seconds
            new_height = await page.evaluate('document.body.scrollHeight')
            videos_found = len(await page.query_selector_all('ytd-video-renderer'))
            print(f"[DEBUG] Scroll {i+1}: {videos_found} videos found.")
            if new_height == last_height:
                break
            last_height = new_height

        videos = await page.query_selector_all('ytd-video-renderer')

        async def fetch_video_data(video):
            title_el = await video.query_selector('#video-title')
            if not title_el:
                return None
            
            url = await title_el.get_attribute('href')
            if not url or not (url.startswith('/watch') or url.startswith('/shorts')):
                return None
            
            meta_items = await video.query_selector_all('span.inline-metadata-item')
            if not meta_items or len(meta_items) < 1:
                return None
            
            title = await title_el.inner_text()
            views_text = await meta_items[0].inner_text()

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
            video_page = await browser.new_page()
            
            try:
                await video_page.goto(f"https://www.youtube.com{url}", timeout=60000)
                await video_page.wait_for_timeout(2000)

                video_date = None
                try:
                    date_el = await video_page.query_selector('div#info-strings yt-formatted-string')
                    if date_el:
                        video_date = await date_el.inner_text()
                    if not video_date:
                        shorts_date_el = await video_page.query_selector('span.ytd-video-primary-info-renderer')
                        if shorts_date_el:
                            video_date = await shorts_date_el.inner_text()
                    if not video_date:
                        meta_date = await video_page.query_selector('meta[itemprop="datePublished"]')
                        if meta_date:
                            video_date = await meta_date.get_attribute('content')
                except Exception:
                    pass

                parsed_date = _parse_date(video_date)
                
                # Filter videos based on date
                if not parsed_date:
                    print(f"[INFO] Skipping video (no date found): {title}")
                    return None

                try:
                    video_datetime = datetime.strptime(parsed_date, '%Y-%m-%d').replace(tzinfo=timezone.utc)
                    now = datetime.now(timezone.utc)
                    if (now - video_datetime) > timedelta(hours=48):
                        print(f"[INFO] Skipping video (older than 48 hours): {title}")
                        return None
                except Exception as e:
                    print(f"[WARN] Could not parse date for '{title}', skipping. Error: {e}")
                    return None

                comments = []
                comments_disabled = False
                try:
                    if '/shorts/' in url:
                        # Shorts: Click the comments button and extract from panel
                        try:
                            comments_button_selector = '#comments-button'
                            await video_page.wait_for_selector(comments_button_selector, timeout=5000)
                            comments_button = await video_page.query_selector(comments_button_selector)
                            if comments_button:
                                await comments_button.click()
                                await video_page.wait_for_selector('ytd-comment-thread-renderer', timeout=10000)
                                comment_elements = await video_page.query_selector_all('ytd-comment-thread-renderer #content-text')
                                for c in comment_elements[:3]:
                                    comments.append(await c.inner_text())
                            else:
                                comments_disabled = True
                        except Exception:
                            comments_disabled = True
                    else:
                        # Regular video: Check for '0 comments' indicator before scrolling
                        zero_comments = False
                        try:
                            # Look for a '0 Comments' label near the comments section
                            zero_comments_el = await video_page.query_selector('h2#count, ytd-comments-header-renderer #count')
                            if zero_comments_el:
                                zero_text = await zero_comments_el.inner_text()
                                if '0 comments' in zero_text.lower():
                                    zero_comments = True
                                    comments_disabled = True
                        except Exception:
                            pass
                        if not zero_comments:
                            # Scroll down in smaller increments to reliably load comments
                            for _ in range(5):
                                await video_page.evaluate('window.scrollBy(0, 800)')
                                await video_page.wait_for_timeout(1500)
                            try:
                                await video_page.wait_for_selector('ytd-comment-thread-renderer #content-text', timeout=15000)
                                comment_elements = await video_page.query_selector_all('ytd-comment-thread-renderer #content-text')
                                for c in comment_elements[:3]:
                                    text = await c.inner_text()
                                    comments.append(text)
                            except Exception:
                                # Check for comments disabled message
                                disabled_el = await video_page.query_selector('ytd-message-renderer, #message')
                                if disabled_el:
                                    msg = await disabled_el.inner_text()
                                    if 'Comments are turned off' in msg or 'disabled' in msg:
                                        comments_disabled = True
                except Exception as e:
                    print(f"[WARN] Could not extract comments for {url}: {e}")

                return {
                    "query": query,
                    "title": title,
                    "url": f"https://www.youtube.com{url}",
                    "views": views,
                    "is_short": is_short,
                    "date": parsed_date,
                    "comments": comments,
                    "comments_disabled": comments_disabled
                }

            except Exception as e:
                print(f"[ERROR] Failed to process video {url}: {e}")
                return None # Return None if any part of page navigation/scraping fails
            finally:
                await video_page.close()

        tasks = [fetch_video_data(video) for video in videos]
        results = await asyncio.gather(*tasks)
        
        videos_data = [res for res in results if res is not None]

        await browser.close()

    top_videos = sorted(videos_data, key=lambda x: x['views'], reverse=True)[:5]
    return top_videos



