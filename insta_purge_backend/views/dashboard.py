from __main__ import app
from flask import Flask, jsonify, request, make_response
from models import db, models
import jwt
from views.helpers import token_required
from instapy import InstaPy
 
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
        user_name = request.json['userName']
        password = request.json['password']
    except: 
        return 'bad inputs', 400

    if user_name and password:
        newAcc = models.InstagramAccounts(user_name, password, owner_id=user.id)
        db.session.add(newAcc)
        db.session.commit()
        return 'instagram account addition succeeded', 200
    else:
        return 'instagram account addition failed', 400

@app.route('/DELETE_INSTA_ACCOUNT', methods=['DELETE'])
@token_required
def delete_insta_accounts(caller_email):
    user = models.Users.query.filter_by(email=caller_email).first()

    try:
        account_id = request.json['account_id']
        insta_account = models.InstagramAccounts.query.filter_by(id=account_id).first()
        if insta_account == None:
            raise 
    except: 
        return 'bad inputs', 400
    if insta_account.owner_id != user.id:
        return 'user has no permission to perform this action', 400


    if insta_account:
        db.session.delete(insta_account)
        db.session.commit()

        return 'instagram account deletion succeeded', 200
    else:
        return 'instagram account deletion failed', 400

@app.route('/VERIFY_INSTA_ACCOUNT_VALIDITY', methods=['get'])
def verify_account_validity():
    insta_name = request.args['userName']
    insta_pw = request.args['password']

    if not (insta_name and insta_pw):
        return 'bad inputs', 400
    a = InstaPy(username='DEV___0000', password='Ve28cf9d??', headless_browser=True)
    # with smart_run(session, threaded=True):
    #     pass
    return 'asdf', 200