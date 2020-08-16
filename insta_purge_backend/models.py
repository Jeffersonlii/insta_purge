from flask_sqlalchemy import SQLAlchemy
import bcrypt

db = SQLAlchemy()

class models:
    class Users(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        email = db.Column(db.String(120), unique=True, nullable=False)
        password_hash = db.Column(db.String(128))
        instagram_accounts =db.relationship('InstagramAccounts', backref='owner')
        @property
        def password(self):
            raise AttributeError('password not readable')
        def encrypt_password(self, password):
            return bcrypt.hashpw(password, bcrypt.gensalt())

        def __init__(self, email, password_hash):
            self.email = email
            self.password_hash = self.encrypt_password(password_hash)

        def verify_password(self, password):
            return bcrypt.checkpw(password, self.password_hash)
            
    class InstagramAccounts(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        instagram_user_name = db.Column(db.String(120), unique=False, nullable=False)
        instagram_password = db.Column(db.String(128), unique=False, nullable=False)
        owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))

        def __init__(self, user_name, password, owner_id):
            self.instagram_user_name = user_name
            self.instagram_password = password
            self.owner_id = owner_id

        def serialize(self):
            return {
                'id': self.id, 
                'instagram_user_name': self.instagram_user_name,
                'instagram_password': self.instagram_password,
                'owner_id': self.owner_id,
            }
