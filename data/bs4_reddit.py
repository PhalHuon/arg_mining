import requests
from bs4 import BeautifulSoup

# URL to scrape
url = "http://quotes.toscrape.com"

# Send a GET request to the URL
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Parse the HTML content
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find all quote blocks
    quotes = soup.find_all('div', class_='quote')

    for quote in quotes:
        text = quote.find('span', class_='text').get_text()
        author = quote.find('small', class_='author').get_text()
        print(f"{text} — {author}")
else:
    print("Failed to retrieve the page.")
