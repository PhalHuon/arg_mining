import re
import nltk
import random
nltk.download('punkt_tab')


def clean_text(data):
    data = re.sub(r'\[.*?\]\(.*?\)', '', data) #url links
    data = re.sub(r'\(/r/.*?\)', '', data) #r/
    data = re.sub(r'[^\w\s]', '', data) #punctuations
    data = re.sub(r'\s+', ' ', data).strip() #extra spaces
    return data

def text_to_conll(text):
    cleaned_text = clean_text(text)
    sentences = nltk.sent_tokenize(cleaned_text)
    conll_sentences = []
    for i in sentences:
        tokens = nltk.word_tokenize(i)
        if tokens:
            conll_sent = "\n".join(tokens)
            conll_sentences.append(conll_sent)
    return conll_sentences

def split_text(sentences, train_ratio = 0.8, shuffle=False):
    if shuffle:
        random.shuffle(sentences)

    #fix this: nothing was split and went to train.conll
    split_index = int(len(sentences) * train_ratio)
    train = sentences[:split_index]
    test = sentences[split_index:]
    return train, test


with open("arg_mining/ml_algorithms/ML/datasets/full_original_text.txt", "r", encoding="utf-8") as f:
    raw_text = f.read()

conll_sentences = text_to_conll(raw_text)
train, test = split_text(conll_sentences, train_ratio = 0.8, shuffle = True)

with open("arg_mining/ml_algorithms/ML/datasets/train.conll", 'w', encoding = "utf-8") as f:
    f.write("\n\n".join(train))
with open("arg_mining/ml_algorithms/ML/datasets/test.conll", 'w', encoding = "utf-8") as f:
    f.write("\n\n".join(test))
