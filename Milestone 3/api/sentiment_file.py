import textblob
sentence=textblob.TextBlob('I am a good boy')
print(sentence.sentiment.polarity)

count=0

def save(answer):
    pass

def fn(answer):
    sentence = textblob.TextBlob(answer)
    save(sentence.sentiment.polarity)
    question = ['So what are you upto these days?',
                'Do you think that the course taught by this faculty is completed in due time?',
                'Are you enjoying the semester?',
                'Do you feel comfortable studying in the class?',
                'Do you think the faculty is punctual in his behavior?',
                'Does your faculty motivate you to perform better?',
                'Do you feel the faculty is creative and has unique way of teaching?',
                'Does the faculty have in depth knowledge about their subject?',
                'Does your faculty encourage you to perform better?',
                'Does your faculty interact well in the class?'
                'How clearly does this teacher present the information that you need to learn?']
    global count
    try:
        question=question[count]
    except:
        question='Okay then, I will catch you later. Nice talking with you as always.'
    count += 1
    return question

