from __main__ import app
from flask import Flask, jsonify, request, make_response
from functools import wraps
import jwt

#wrappers
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        data = {}
        try:
            data = jwt.decode(request.headers['Authorization'].encode('UTF-8'), app.config['SECRET_KEY'])
        except :
            return 'Token is missing or invalid', 400
        return f(*args, **kwargs, caller_email = data['user'])
    return decorated
