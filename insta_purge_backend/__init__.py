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
    return app

app = create_app()

#views
import views.auth
import views.dashboard
import views.user

if __name__ == "__main__":
    app.run()

