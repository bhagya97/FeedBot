from app import app
import requests
from flask import request, jsonify, make_response, g
import datetime
from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.json_util import dumps
import sys
import sentiment_file
MONGO_STRING = 'mongodb+srv://darshan:JNccCEOyemZ5mrN7@ti-project-1j7gp.mongodb.net/test?retryWrites=true&w=majority'


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


@app.route('/chat', methods=['POST'])
def chat():
    client = get_db()
    db = client.feedbot
    payload = request.get_json()
    if payload is not None and 'answer' in payload.keys():
        answer = payload['answer']
        next_question=sentiment.fn(answer)
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
