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

## n8n Setup (on WSL)

1. **Install n8n globally:**
   ```bash
   npm install -g n8n
   ```
   If you get a permissions error, use:
   ```bash
   sudo npm install -g n8n
   ```

2. **Set environment variable permanently:**
   To allow HTTP requests in n8n nodes, add the following line to your `~/.bashrc`:
   ```bash
   echo 'export N8N_BLOCK_REQUEST_IN_NODE=false' >> ~/.bashrc
   source ~/.bashrc
   ```
   This will set `N8N_BLOCK_REQUEST_IN_NODE` to `false` for all future terminal sessions.

## Example Usage

To crawl YouTube for the top 5 "face-cream" videos from the last 48 hours, use:

**API Example URL:**
```
http://127.0.0.1:8000/youtube_crawler?query=face-cream
```

