import textblob
sentence=textblob.TextBlob('I am a good boy')
print(sentence.sentiment.polarity)

count=0

def save(answer):
    pass

def fn(answer):
    sentence = textblob.TextBlob('I am a good boy')
    save(sentence.sentiment.polarity)
    question=['So what are you upto these days?','Are you enjoying the semester?','Do you feel comfortable studying in the class?']
    global count
    try:
        question=question[count]
    except:
        question='Okay then, I will catch you later. Nice talking with you as always.'
    count += 1
    return question

