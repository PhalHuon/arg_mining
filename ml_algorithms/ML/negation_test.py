#find index of negative word
import spacy

def word_is_negated(word):
    """ """

    for child in word.children:
        if child.dep_ == 'neg':
            return True

    if word.pos_ in {'VERB'}:
        for ancestor in word.ancestors:
            if ancestor.pos_ in {'VERB'}:
                for child2 in ancestor.children:
                    if child2.dep_ == 'neg':
                        return True

    return False

def find_negated_wordSentIdxs_in_sent(sent, idxs_of_interest=None):
    """ """

    negated_word_idxs = set()
    for word_sent_idx, word in enumerate(sent):
        if idxs_of_interest:
            if word_sent_idx not in idxs_of_interest:
                continue
        if word_is_negated(word):
            negated_word_idxs.add(word_sent_idx)

    return negated_word_idxs

nlp = spacy.load('en_core_web_lg')
#python -m spacy download en_core_web_lg
print(find_negated_wordSentIdxs_in_sent(nlp("I have hope, but I do not like summer")))