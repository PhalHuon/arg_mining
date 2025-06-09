import re

# Read the file as plain text
with open("arg_mining/data/scrape/scrape_result.txt", 'r') as file:
    text = file.read()

clean = re.split(r"[,:#_=+*|]+", text)

# Remove empty strings
cleaned = []
for i in clean:
    if i:
        cleaned.append(i)

with open("arg_mining/data/curate/reddit_data.txt", 'w') as text_file:
    for i in clean:
        text_file.write(i)

