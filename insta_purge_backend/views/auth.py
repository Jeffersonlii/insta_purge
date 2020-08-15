from __main__ import app

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