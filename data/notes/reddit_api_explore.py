import requests
import json
url = "https://old.reddit.com/r/changemyview.json"
response = requests.get(url, headers = {'User-Agent':'test'})
data = response.json()

with open('arg_mining/data/notes/json_structure_reddit.txt', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent = 2, ensure_ascii = False)

