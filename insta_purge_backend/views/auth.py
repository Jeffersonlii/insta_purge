from __main__ import app
from models import db, models

from flask import Flask, jsonify, request, make_response
import jwt
import datetime

@app.route('/signin', methods=['POST'])
def signin():
    auth = request.authorization
    if not (auth and auth.password and auth.username):
        return 'bad inputs', 400
    email = auth.username
    password = auth.password
    print([email,password])
    if email and password:
        user = models.Users.query.filter_by(email=email).first()
        if user and user.verify_password(password):
            token = jwt.encode({'user': email, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=60)}, app.config['SECRET_KEY'])
            return (jsonify({'Authenticated': True, 'token': token.decode('UTF-8')}), 200)
        else:
            return jsonify({'Authenticated': False}), 200
    else:
        return 'bad inputs', 400