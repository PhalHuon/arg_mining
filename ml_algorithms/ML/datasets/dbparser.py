import re
import nltk
import random
nltk.download('punkt_tab')
nltk.download('punkt')


def clean_text(data):
    data = re.sub(r'\[.*?\]\(.*?\)', '', data) #url links
    data = re.sub(r'\(/r/.*?\)', '', data) #r/
    data = re.sub(r'[^\w\s]', '', data) #punctuations
    data = re.sub(r'\s+', ' ', data).strip() #extra spaces
    return data

def text_to_conll(text):
    lines = text.strip().split('\n')
    conll_sentences = []
    for i in lines:
        i = i.strip()
        if not i:
            continue
        cleaned_line = clean_text(i)
        cleaned_line = re.sub(r'[.!?]', '', cleaned_line)
        tokens = nltk.word_tokenize(cleaned_line)
        if tokens:
            conll_sent = "\n".join(tokens)
            conll_sentences.append(conll_sent)
    return conll_sentences

with open('arg_mining/ml_algorithms/ML/datasets/full_original_text.txt', 'r', encoding='utf-8') as f:
    raw_text = f.read()

conll_sentences = text_to_conll(raw_text)
random.shuffle(conll_sentences)

train_size = int(len(conll_sentences) * 0.8)
test_size = len(conll_sentences) - train_size
train = conll_sentences[:train_size]
test = conll_sentences[train_size:]

with open("arg_mining/ml_algorithms/ML/datasets/train.conll", 'w', encoding="utf-8") as f:
    f.write("\n\n".join(train))

with open("arg_mining/ml_algorithms/ML/datasets/test.conll", 'w', encoding="utf-8") as f:
    f.write("\n\n".join(test))



