import requests
from bs4 import BeautifulSoup
import time
import random

def scrape_subreddit_posts(subreddit, sort = "hot", limit = 5):
    url = url = f'https://old.reddit.com/r/{subreddit}/{sort}.json?limit={limit}'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }

    response = requests.get(url, headers = headers)
    if response.status_code == 200:
        data = response.json()

        posts = []
        for i in data['data']['children']:
            post_data = i['data']
            posts.append({
                'title':post_data['title'],
                'author':post_data['author'],
                'url':post_data['url'],
                'selftext':post_data.get('selftext', ''),
                'subreddit':post_data['subreddit']
            })
        return posts
    
    else:
        print(f"Failed to fetch: {response.status_code}")
        return []
    
def scrape_post_comments(post_url):
    json_url = post_url.replace('reddit.com', 'old.reddit.com') + '.json'
    headers = {'User-Agent':
               'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
    response = requests.get(json_url, headers = headers)
    if response.status_code == 200:
        data = response.json()
        comments = []
        comment_data = data[1]['data']['children']
        for i in comment_data:
            if i['kind'] == 't1':
                comment_info = i['data']
                comments.append({
                    'author': comment_info.get('author', 'Unkown'),
                    'body': comment_info.get('body', '')
                })

        return comments
    else:
        return []



posts = scrape_subreddit_posts("changemyview", "hot", 5 )
for j in posts:
    print("-" * 50)
    print(f"URL: {j['url']}")
    print(f"Title: {j['title']}")
    print("-" * 50)
    
    