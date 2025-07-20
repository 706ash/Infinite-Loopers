# Infinite-Loopers

## Setup

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Install Playwright browsers:**
   ```bash
   playwright install
   ```

3. **Run the FastAPI server:**
   ```bash
   uvicorn app.main:app --reload
   ```

- The server will start at [http://127.0.0.1:8000](http://127.0.0.1:8000)
- Interactive API docs are available at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

## Example Usage

To crawl YouTube for the top 5 "face-cream" videos from the last 48 hours, use:

**API Example URL:**
```
http://127.0.0.1:8000/crawl?platform=youtube&query=face-cream
```