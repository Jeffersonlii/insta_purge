from __main__ import app
from flask import Flask, jsonify, request, make_response
from models import db, models

#-------------------CRUD API FOR USER MANAGEMENT#-------------------
@app.route('/GET_USER', methods=['GET'])
def get_user():
    #TODO
    return jsonify({'result': bcrypt.hashpw('123', bcrypt.gensalt()), 'length':123 }), 200

@app.route('/CREATE_USER', methods=['POST'])
def create_user():
    try:
        email = request.json['email']
        password = request.json['password']
    except: 
        return 'bad inputs', 400
    if email and password:
        newUser = models.Users(email, password)
        db.session.add(newUser)
        db.session.commit()
        return 'user creation succeeded', 200
    else:
        return 'user creation failed', 400

@app.route('/MODIFY_USER', methods=['POST'])
def modify_user():
    #TODO
    return jsonify({'result': bcrypt.hashpw('123', bcrypt.gensalt()), 'length':123 }), 200

@app.route('/DELETE_USER', methods=['POST'])
def delete_user():
    #TODO
    return jsonify({'result': bcrypt.hashpw('123', bcrypt.gensalt()), 'length':123 }), 200

#-------------------END CRUD API FOR USER MANAGEMENT#-------------------