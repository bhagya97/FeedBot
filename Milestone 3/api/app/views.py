from app import app
from flask import request, jsonify, make_response, g
from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.json_util import dumps
import textblob
import re
import string

# Regular expression for removing characters except alphanumeric
pattern = re.compile('[\W_]+')

# Connction String required to connect to MongoDB database
MONGO_STRING = 'mongodb+srv://darshan:JNccCEOyemZ5mrN7@ti-project-1j7gp.mongodb.net/test?retryWrites=true&w=majority'

# set of questions to ask whenever student interacts with chatbot
question = ['How are you doing?',
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

# common words to be excluded from the worldcloud in Analysis Tab
# in the FeedBot portal.
common_words = ['so', 'a', 'an', 'hi', 'hello', 'am', 'was', 'is', 'the',
                'that', 'these', 'those', 'doing', 'okay', 'i', 'he',
                'she', 'it', 'we', 'are', 'were', 'in', 'do', 'does', 'think']

# Connects to MongoDB using pymongo library
def connect_mongo():
    client = MongoClient(MONGO_STRING)
    return client

# store database in the global dictionary provided by flask
# framework and return database instance.
def get_db():
    if 'db' not in g:
        g.db = connect_mongo()
    return g.db

# Remove database instance from global dictionary 
# after environment is terminated.
@app.teardown_appcontext
def teardown_db(e):
    db = g.pop('db', None)
    if db is not None:
        db.close()


# utility function for making response in json format.
# if no argument is not passed then it will return 
# default response as error.
def make_json_response(r=None, msg='Error'):
    if r is None:
        r = jsonify(code=0, msg=msg)
    r.headers['Content-Type'] = 'application/json'
    r.headers['Access-Control-Allow-Origin'] = '*'
    return r

# this function gets data from post request and
# stores that form data in database.
@app.route('/saveform', methods=['POST'])
def saveform():
    client = get_db()
    db = client.feedbot
    payload = request.get_json()
    if payload is not None and 'formData' in payload.keys(): #check if request is not empty
        form_data = payload['formData']
        inserted = db.forms.insert_one(form_data)
        if inserted.inserted_id != None:  # if form is inserted in the database  
            return make_json_response(jsonify(code=1, msg='Stored Sucessfully'))
    return make_json_response(msg='Unsuccessful Insertion')

# Returns stored form names and their ids to portal.
@app.route('/forms')
def forms():
    client = get_db()
    db = client.feedbot
    return make_json_response(
        jsonify(code=1, forms=dumps(db.forms.find({}, {'FormName': 1}))))

# returns departemnts to portal
@app.route('/departments')
def departments():
    client = get_db()
    db = client.feedbot
    return make_json_response(
        jsonify(code=1, departments=dumps(db.department.find({}))))

# Findas all courses in the department given by department_id
# and returs them to portal.
@app.route('/courses')
def courses():
    client = get_db()
    db = client.feedbot
    deparment = request.args.get('d_id')
    return make_json_response(
        jsonify(code=1, courses=dumps(db.courses.find({"department_id": ObjectId(deparment)}))))

# creates bag of words for and passes it to portal 
# to produce WordCloud.
@app.route('/get_words')
def words():
    a = {}
    client = get_db()
    db = client.feedbot
    answers = db.sentiment.find({}, {"_id": 0, "answer": 1})
    for answer in answers:
        for a_word in answer['answer'].split():
            ans = pattern.sub('', a_word.lower())
            if ans not in common_words:
                if a_word in a.keys():
                    a[ans] += 1
                else:
                    a[ans] = 1
    words = list(map(lambda kv: dict(label=kv[0], y=kv[1]), a.items()))
    return make_json_response(
        jsonify(code=1, words=words))

# utility function used by chat endpoint to prepare next
# question and computes sentiment of the response.
def fn(answer, q_no):
    sentence = textblob.TextBlob(answer)
    try:
        q = question[q_no+1]
    except:
        q = 'Okay then, I will catch you later. Nice talking with you as always.'
    return q, sentence.sentiment.polarity

# chat endpoint used by chatbot. computes sentiment of response 
# and stores it to databse with response. Also,
# returns next question to chatbot

@app.route('/chat', methods=['POST'])
def chat():
    client = get_db()
    db = client.feedbot
    payload = request.get_json()
    if payload is not None and ('answer' and 'q_no') in payload.keys():
        answer = payload['answer']
        q_no = payload['q_no']
        next_question, polarity = fn(answer, q_no)
        print(polarity)
        inserted = db.sentiment.insert_one(
            dict(question=question[q_no], answer=answer.lower(), sentiment=polarity))
        return make_json_response(
            jsonify(code=1, next_question=next_question, msg='Successful')
        )
    return make_json_response(msg='Unsuccessful Insertion')

# Stores the trigger in database
@app.route('/savetrigger', methods=['POST'])
def save_triggers():
    client = get_db()
    db = client.feedbot
    payload = request.get_json()
    if payload is not None and 'form' in payload.keys():
        form_data = payload['form']
        inserted = db.triggers.insert_one(form_data)
        if inserted.inserted_id != None:
            return make_json_response(jsonify(code=1, msg='Stored Sucessfully'))
    return make_json_response(msg='Unsuccessful Insertion')
