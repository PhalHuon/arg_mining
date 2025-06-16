import re
import nltk
import random

nltk.download('punkt_tab')
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger_eng')  # part of speech

def clean_text(data):
    data = re.sub(r'\[.*?\]\(.*?\)', '', data)  # url links
    data = re.sub(r'\(/r/.*?\)', '', data)  # r/
    data = re.sub(r'[^\w\s]', '', data)  # punctuations
    data = re.sub(r'\s+', ' ', data).strip()  # extra spaces
    return data

def text_to_conll(text, add_labels=False):
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
            pos_tags = nltk.pos_tag(tokens)
            conll_lines = []
            
            for token, pos in pos_tags:
                if add_labels:
                    label = 'O'
                    conll_line = f"{token}\t{pos}\t{label}"
                else:
                    conll_line = f"{token}\t{pos}"
                conll_lines.append(conll_line)
                
            conll_sent = "\n".join(conll_lines)
            conll_sentences.append(conll_sent)
            
    return conll_sentences

with open('arg_mining/ml_algorithms/ML/datasets/full_original_text.txt', 'r', encoding='utf-8') as f:
    raw_text = f.read()

conll_sentences = text_to_conll(raw_text, add_labels=True)

random.shuffle(conll_sentences)
train_size = int(len(conll_sentences) * 0.8)
test_size = len(conll_sentences) - train_size

train = conll_sentences[:train_size]
test = conll_sentences[train_size:]

with open("arg_mining/ml_algorithms/ML/datasets/train.conll", 'w', encoding="utf-8") as f:
    f.write("\n\n".join(train))

with open("arg_mining/ml_algorithms/ML/datasets/test.conll", 'w', encoding="utf-8") as f:
    f.write("\n\n".join(test))

print(f"Train sentences: {len(train)}")
print(f"Test sentences: {len(test)}")

