from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
import json, os, bcrypt
from flask_cors import CORS

from models import db, models


def create_app():

    #inits
    app = Flask(__name__)
    CORS(app)
    basedir = os.path.abspath(os.path.dirname(__file__))
    #db
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.debug = True

    db.init_app(app)

    #-------------------CRUD API FOR USER MANAGEMENT#-------------------
    @app.route('/GET_USER', methods=['GET'])
    def get_user():
        return jsonify({'result': bcrypt.hashpw('123', bcrypt.gensalt()), 'length':123 }), 200


    @app.route('/CREATE_USER', methods=['POST'])
    def create_user():
        print(request.json)
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

        return jsonify({'result': bcrypt.hashpw('123', bcrypt.gensalt()), 'length':123 }), 200

    @app.route('/DELETE_USER', methods=['POST'])
    def delete_user():

        return jsonify({'result': bcrypt.hashpw('123', bcrypt.gensalt()), 'length':123 }), 200

    #-------------------END CRUD API FOR USER MANAGEMENT#-------------------

    @app.route('/validate', methods=['POST', 'GET'])
    def validate():
        try:
            email = request.json['email']
            password = request.json['password']
        except: 
            return 'bad inputs', 400
        if email and password:
            user = models.Users.query.filter_by(email=email).first()
            if user:
                return (jsonify({'Authenticated': True}), 200) if user.verify_password(password) else (jsonify({'Authenticated': False}), 200)
            return 'user creation succeeded', 200
        else:
            return 'user validation failed', 400

    return app

    #CRUD API FOR USER MANAGEMENT
if __name__ == "__main__":
    app = create_app()
    app.run()
