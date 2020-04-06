from app import app
import requests
from flask import request, jsonify, make_response, g
import datetime
from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.json_util import dumps
import sys
import textblob
import re
import string

pattern = re.compile('[\W_]+')
MONGO_STRING = 'mongodb+srv://darshan:JNccCEOyemZ5mrN7@ti-project-1j7gp.mongodb.net/test?retryWrites=true&w=majority'

question = ['How are you doing?', 'Are you enjoying the semester?',
            'Do you feel comfortable studying in the class?']

common_words = ['so', 'a', 'an', 'hi', 'hello', 'am',
                'was', 'is', 'the', 'that', 'these', 'those', 'doing', 'okay']

def connect_mongo():
    client = MongoClient(MONGO_STRING)
    return client


def get_db():
    if 'db' not in g:
        g.db = connect_mongo()
    return g.db


@app.teardown_appcontext
def teardown_db(e):
    db = g.pop('db', None)
    if db is not None:
        db.close()


@app.route('/')
def index():
    return "Hello from Search"


def make_json_response(r=None, msg='Error'):
    if r is None:
        r = jsonify(code=0, msg=msg)
    r.headers['Content-Type'] = 'application/json'
    r.headers['Access-Control-Allow-Origin'] = '*'
    return r


@app.route('/saveform', methods=['POST'])
def saveform():
    client = get_db()
    db = client.feedbot
    payload = request.get_json()
    if payload is not None and 'formData' in payload.keys():
        form_data = payload['formData']
        inserted = db.forms.insert_one(form_data)
        if inserted.inserted_id != None:
            return make_json_response(jsonify(code=1, msg='Stored Sucessfully'))
    return make_json_response(msg='Unsuccessful Insertion')


@app.route('/forms')
def forms():
    client = get_db()
    db = client.feedbot
    return make_json_response(
        jsonify(code=1, forms=dumps(db.forms.find({}, {'FormName': 1}))))


@app.route('/departments')
def departments():
    client = get_db()
    db = client.feedbot
    return make_json_response(
        jsonify(code=1, departments=dumps(db.department.find({}))))


@app.route('/courses')
def courses():
    client = get_db()
    db = client.feedbot
    deparment = request.args.get('d_id')
    return make_json_response(
        jsonify(code=1, courses=dumps(db.courses.find({"department_id": ObjectId(deparment)}))))


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


def fn(answer, q_no):
    sentence = textblob.TextBlob(answer)
    try:
        q = question[q_no+1]
    except:
        q = 'Okay then, I will catch you later. Nice talking with you as always.'
    return q, sentence.sentiment.polarity


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
