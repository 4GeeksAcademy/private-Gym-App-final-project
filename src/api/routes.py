"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt

api = Blueprint('api', __name__)
app = Flask(__name__)

# Allow CORS requests to this API

CORS(api)

jwt = JWTManager(app)
bcrypt = Bcrypt(app)



@api.route('/all', methods=['GET'])
def all():
    query = User.query.all()
    all_users = [{
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'password': user.password,
        'id': user.id

    } for user in query]

    if len(all_users) == 0:
        return jsonify({'msg': 'no user in db :('}) 
    
    return all_users

@api.route('/singup', methods=['POST'])
def create_user():
    email = request.json.get('email')
    password= request.json.get('password')
    first_name= request.json.get('first_name')
    last_name= request.json.get('last_name')
    user_exist_db = User.query.filter_by(email = email).first()

    if user_exist_db:
        return jsonify({"msg": "this user already exist"}), 400

    if email and password:

        encrypted_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(
            email = email, 
            password= encrypted_password, 
            first_name= first_name,
            last_name= last_name
            )
        
        db.session.add(new_user)
        db.session.commit()

        return jsonify({
           "id" : new_user.id,
           "email" : new_user.email,
           "msg" : "success"

        }), 200
    
    else :
        return jsonify({'msg' : 'the email and password are required'}), 400
    

@api.route('/login', methods=['POST'])
def get_token():
    try:     
        email = request.json.get('email')
        password = request.json.get('password')

        if not email or not password:
            return jsonify({'error': 'Email and password are required.'}), 400
        
        email_from_db = User.query.filter_by(email=email).first()

        password_from_db = email_from_db.password 
        true_o_false = bcrypt.check_password_hash(password_from_db, password)
       
        if true_o_false:       
            access_token = create_access_token(identity= email_from_db.id)

            return jsonify({ 
                'access_token': access_token,
                'status': 'success',
                }), 200
        
        else:
            return {"Error": "Incorrect password"}
    
    except Exception as e:
        return {"error": f"this email not exist: {str(e)}"}, 500
    
@api.route('/private')
@jwt_required()
def sing_user():
    user_validation = get_jwt_identity()
    user_from_db = User.query.get(user_validation)

    if user_validation:
        return jsonify({
            'msg': 'success',
            'user_id': user_from_db.id,
            'create_at': user_from_db.create_at,
            'first_name': user_from_db.first_name,
            'last_name': user_from_db.last_name
            }), 200
    
    else:
        return jsonify({"msg": 'token no valido o inexistente'}), 401
    

@api.route('/edit', methods=['PUT'])
def editUser():
    query = User.query.all()
    all_users = [{
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'password': user.password,
        'id': user.id

    } for user in query]

    if len(all_users) == 0:
        return jsonify({'msg': 'no user in db :('}) 
    
    return all_users