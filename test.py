import requests

url = "http://127.0.0.1:8000/youtube_crawler?query=face-cream"
headers = {
    "Accept": "application/json",
    "User-Agent": "Mozilla/5.0"
}

response = requests.get(url, headers=headers)
print(response.json())


