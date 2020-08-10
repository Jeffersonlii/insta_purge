from flask_sqlalchemy import SQLAlchemy
#from flask_security import Security, SQLAlchemyUserDatastore, UserMixin, RoleMixin, login_required
import bcrypt

db = SQLAlchemy()

class models:
    class Users(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        email = db.Column(db.String(120), unique=True, nullable=False)
        password_hash = db.Column(db.String(128))

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
            
    # class InstagramAccounts():
    #     id = db.Column(db.Integer, primary_key=True)
    #     user_name = db.Column(db.String(120), unique=False, nullable=False)
    #     password = db.Column(db.String(128))
    #     owner = 

    #     def __init__(self, user_name, password_hash):
    #         self.user_name = user_name
    #         self.password = password
