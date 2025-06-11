import re

# Read the file as plain text
with open("sample_data.txt", 'r') as file:
    text = file.read()

clean = re.split(r"[,:#_=+*|()]+", text)

# Remove empty strings
cleaned = []
for i in clean:
    if i:
        cleaned.append(i)

with open("sample_clean_data.txt", 'a') as text_file:
    for i in clean:
        text_file.write(i)

