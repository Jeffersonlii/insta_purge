from __main__ import app
from flask import Flask, jsonify, request, make_response
from models import db, models
import jwt
from views.helpers import token_required

@app.route('/GET_INSTA_ACCOUNTS', methods=['GET'])
@token_required
def get_insta_accounts(caller_email):
    try:
        user = models.Users.query.filter_by(email=caller_email).first()
        insta_accounts = models.InstagramAccounts.query.filter_by(owner_id=user.id).all()
        #TODO make sure these accounts are still valid/ username, password still match 
    except:
        return 'get insta accounts failed', 400
    return jsonify([e.serialize() for e in insta_accounts]), 200

@app.route('/ADD_INSTA_ACCOUNT', methods=['POST'])
@token_required
def add_insta_accounts(caller_email):
    user = models.Users.query.filter_by(email=caller_email).first()

    try:
        user_name = request.json['user_name']
        password = request.json['password']
    except: 
        return 'bad inputs', 400
    try:
        #TODO make sure this account is valid by using instaPy 
        pass
    except: 
        return 'instagram credentials invalid', 400

    if user_name and password:
        newAcc = models.InstagramAccounts(user_name, password, owner_id=user.id)
        db.session.add(newAcc)
        db.session.commit()
        return 'instagram account addition succeeded', 200
    else:
        return 'instagram account addition failed', 400



