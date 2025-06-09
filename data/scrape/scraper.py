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
                'subreddit':post_data['subreddit'],
                'permalink': f"https://reddit.com{post_data['permalink']}" #comment URL in reddit
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
    
def reddit_with_comments(subreddit, sort = "hot", limit = 5):
    print(f"Scraping r/{subreddit}")
    posts = scrape_subreddit_posts(subreddit, sort, limit)

    with open("arg_mining/data/scrape/scrape_result.txt", "w", encoding = "utf-8") as file:
        for post_num, post in enumerate(posts, 1):
            # file.write(f"\n")
            # file.write("#" * 20)
            # file.write(f"\n")
            # file.write(f"URL: {post['url']}")
            # file.write(f"\n")
            # file.write(f"Reddit URL: {post['permalink']}")
            file.write("=" * 20)
            file.write(f"\n")
            file.write(f"Post {post_num}: {post['title']}")
            file.write(f"\n")
            file.write(f"Author: {post['author']}")

            if post['selftext']:
                file.write(f"Post Text: {post['selftext'][:10000]}")

            #get comments
            comments = scrape_post_comments(post['permalink'])
            if comments:
                for comment_num, comment in enumerate(comments, 1):
                    file.write(f"\n")
                    file.write("+" * 20)
                    file.write(f"\n")
                    file.write(f"{comment_num} : {comment['author']}")
                    file.write(f"Comment: {comment['body']}")
                    file.write(f"\n")
            else:
                file.write("No comments found")

            time.sleep(30)

reddit_with_comments('changemyview', 'hot', 100)
time.sleep(60)
reddit_with_comments('politicaldiscussion', 'hot', 100)
time.sleep(60)
reddit_with_comments('unpopularopinion', 'hot', 100)


    