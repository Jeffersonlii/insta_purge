import sys, os
from models import models
from app import db, create_app

def create_db():
    app = create_app()
    with app.app_context():
        db.create_all()


if __name__ == '__main__':
    if sys.argv[1] == 'create_db':
        create_db()
    else:
        raise Exception('action missing')