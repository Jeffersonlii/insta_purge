from __main__ import app
from flask import Flask, jsonify, request, make_response
from functools import wraps
import jwt
from secrets import TEST_TOKEN
#wrappers
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        data = {}
        allow_test_token = True
        try:
            if request.headers['Authorization'].split()[1] == TEST_TOKEN and allow_test_token:
                data = {'user': 'jeffersonli2013@gmail.com'}
            else:
                data = jwt.decode(request.headers['Authorization'].split()[1].encode('UTF-8'), app.config['SECRET_KEY'])
        except :
            return 'Token is missing or invalid', 400
        return f(*args, **kwargs, caller_email = data['user'])
    return decorated
