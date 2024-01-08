"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import resend
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Trainer, Routines, Diets
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from flask_mail import Mail




api = Blueprint('api', __name__)
app = Flask(__name__)


# configuro la api de correos utilzada para alertar al usuario
app.config['MAIL_SERVER'] = 'smtp.resend.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'resend'
app.config['MAIL_PASSWORD'] = 're_GeRFSVeg_Jx373tv4jpEfRr2j6gbT3aVw'

app.config['RESEND_API_KEY'] = os.environ.get('RESEND_API_KEY', 're_GeRFSVeg_Jx373tv4jpEfRr2j6gbT3aVw')
mail = Mail(app)

# Allow CORS requests to this API

CORS(api)

jwt = JWTManager(app)
bcrypt = Bcrypt(app)

url_front = "https://potential-journey-wrg5rvjrj543vj7-3000.app.github.dev/"


@api.route('/all', methods=['GET'])
@jwt_required()

def all():
    query = User.query.all()
    
    all_users = [{
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'id': user.id,
        'role': user.role,
        'create_at': user.create_at,
        

    } for user in query]


    if len(all_users) == 0 :
        
        return jsonify({'msg': 'no user in db :('}), 200
    
    return jsonify(all_users), 200


@api.route('/get/diet/<int:id_user>', methods=['GET'])
@jwt_required()
def get_diet(id_user):
    
    query_diet = Diets.query.filter_by(id_user = id_user).first()
    
    if not query_diet:
        return jsonify({'msg': 'this user not have diet assigned'}), 200
    
    return jsonify({
        'breakfast': query_diet.breakfast,
        'brunch': query_diet.brunch,
        'lunch': query_diet.lunch,
        'dinner': query_diet.dinner,
        'supper': query_diet.supper,
        'trainer_first_name': Trainer.query.filter_by(id = query_diet.id_trainer).first().first_name,
        'trainer_last_name': Trainer.query.filter_by(id = query_diet.id_trainer).first().last_name

    }), 200

@api.route('/get/routine/<int:id_user>', methods=['GET'])
@jwt_required()
def get_routine(id_user):
    
    query_routine = Routines.query.filter_by(id_user = id_user).first()
    
    if not query_routine:
        return jsonify({'msg': 'this user not have routine assigned'}), 200
    
    return jsonify({
        'Chest': query_routine.Chest,
        'shoulders': query_routine.shoulders,
        'arms': query_routine.arms,
        'legs': query_routine.legs,
        'trainer_first_name': Trainer.query.filter_by(id = query_routine.id_trainer).first().first_name,
        'trainer_last_name': Trainer.query.filter_by(id = query_routine.id_trainer).first().last_name

    }), 200

@api.route('/all/trainers', methods=['GET'])
@jwt_required()
def all_trainers():
    query = Trainer.query.all()
    all_trainers = [{
        'first_name': trainer.first_name,
        'last_name': trainer.last_name,
        'email': trainer.email,
        'id': trainer.id,
        'role': trainer.role,
        'create_at': trainer.create_at    

    } for trainer in query]
    if len(all_trainers) == 0:
        
        return jsonify({'msg': 'no trainers in db :('}), 200
    
    return jsonify(all_trainers), 200



    # params = {
    #     "from": "Acme <onboarding@resend.dev>",
    #     "to": ["delivered@resend.dev"],
    #     "subject": "hello world",
    #     "html": "<strong>it works!</strong>",
    # }



    # return jsonify(params)


@api.route('/signup', methods=['POST'])
def create_one_user():    
    email = request.json.get('email')
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'Email already exists.'}), 409
    
    body = request.json
    raw_password = request.json.get('password')
    password_hash = bcrypt.generate_password_hash(raw_password).decode('utf-8')
    new_user = User(
        first_name  = body["first_name"],
        last_name  = body["last_name"],
        date_of_birth = body["date_of_birth"],
        email = body["email"],
        pathologies = body["pathologies"],
        password = password_hash,
        role = body["role"]
        )
    db.session.add(new_user)
    db.session.commit()

    ok_to_share = {
        "first_name" : body["first_name"],
        "last_name" : body["last_name"],
        "date_of_birth" : body["date_of_birth"],
        "email" : body["email"],
        "pathologies" : body["pathologies"],
        "password" : body["password"]
        }

    return jsonify({"msg": "success", "user_added": ok_to_share }), 200


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
                'msg': 'success',
                "role": email_from_db.role
                }), 200

        else:
            return {"msg": "Incorrect password"}

    except Exception as e:
        return {"error": f"this email not exist: {str(e)}"}, 500
    
@api.route('/login/trainer', methods=['POST'])
def get_token_trainer():
    try:
        email = request.json.get('email')
        password = request.json.get('password')

        if not email or not password:
            return jsonify({'error': 'Email and password are required.'}), 400

        email_from_db = Trainer.query.filter_by(email= email).first()

        password_from_db = email_from_db.password
        true_o_false = bcrypt.check_password_hash(password_from_db, password)

        if true_o_false:
            access_token = create_access_token(identity= email_from_db.id)

            return jsonify({
                'access_token': access_token,
                'msg': 'success',
                "role": email_from_db.role
                }), 200

        else:
            return {"msg": "Incorrect password"}

    except Exception as e:
        return {"error": f"this email not exist: {str(e)}"}, 500

@api.route('/private')
@jwt_required()
def private_data():
    user_validation = get_jwt_identity()
    user_from_db = User.query.get(user_validation)

    if user_validation:
        return jsonify({
            'msg': 'success',
            'user_id': user_from_db.id,
            'create_at': user_from_db.create_at,
            'first_name': user_from_db.first_name,
            'last_name': user_from_db.last_name,
            'email': user_from_db.email
            }), 200

    else:
        return jsonify({"msg": 'token no valido o inexistente'}), 401


#@api.route('/edit', methods=['PUT'])
#def editUser():
#   query = User.query.all()
#    all_users = [{
#       'first_name': user.first_name,
#        'last_name': user.last_name,
#        'email': user.email,
#        'password': user.password,
#       'id': user.id

#    } for user in query]

#    if len(all_users) == 0:
#        return jsonify({'msg': 'no users in db :('})

#    return all_users


@api.route('/resetpass', methods=['POST'])
def resetPass():
    email = request.json.get('email')

    if not email:
        return jsonify({'msg': 'email is required'}), 400
    

    email_from_db = User.query.filter_by(email= email).first()

    if not email_from_db:
    
        return({'msg': 'this email not exist'}), 404
    
    params = {
        "from": "onboarding@resend.dev",
        "to": [email],
        "subject": "Reset your password",
        "html": f"<strong>{url_front}</strong>",
    }

    resend.api_key = "re_GeRFSVeg_Jx373tv4jpEfRr2j6gbT3aVw"

    try:
        r = resend.Emails.send(params)
        return jsonify({'msg': 'email was sended'}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@api.route('/user/delete/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_user(id):

    user_exist_db = User.query.filter_by(id = id).first()

    if user_exist_db :
        db.session.delete(user_exist_db)
        db.session.commit()

        return jsonify({
            'msg': 'success'
        }), 200
    else:
        return jsonify({
           'msg': 'this user not exist' 
        }),500
    
@api.route('/trainer/delete/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_trainer(id):

    trainer_exist_db = Trainer.query.filter_by(id = id).first()

    if trainer_exist_db :
        db.session.delete(trainer_exist_db)
        #db.session.commit()

        return jsonify({
            'msg': 'success'
        }), 200
    else:
        return jsonify({
           'msg': 'this trainer not exist' 
        }),500

@api.route('/signup/trainer', methods=['POST'])
def create_trainer():    
    email = request.json.get('email')
    existing_trainer = Trainer.query.filter_by(email=email).first()
    if existing_trainer:
        return jsonify({'msg': 'Email already exists.'}), 409
    
    body = request.json
    raw_password = request.json.get('password')
    password_hash = bcrypt.generate_password_hash(raw_password).decode('utf-8')
    new_trainer = Trainer(
        first_name  = body["first_name"],
        last_name  = body["last_name"],
        email = body["email"],
        password = password_hash,
        role = body["role"]
        )
    db.session.add(new_trainer)
    db.session.commit()

    ok_to_share = {
        "first_name" : body["first_name"],
        "last_name" : body["last_name"],
        "email" : body["email"],
        "password" : body["password"],
        "msg": "success"
        }
    
    return jsonify(ok_to_share), 200

@api.route('/assign/routine', methods=['POST'])
@jwt_required()
def assign_routine():
    
    trainer = get_jwt_identity()
    chest = request.json.get('chest')
    shoulders = request.json.get('shoulders')
    arms = request.json.get('arms')
    legs = request.json.get('legs')
    id_user = request.json.get('id_user')

    user_from_db = Routines.query.filter_by(id_user = id_user).first()

    if not chest or not shoulders or not arms or not legs:
        return jsonify({'msg': 'fill all inputs'}), 400    
    
    if user_from_db :
        return jsonify({'msg': 'user already have routine assigned'}), 400
    
    new_routine = Routines(
        Chest = chest,
        shoulders = shoulders,
        arms = arms,
        legs = legs,
        id_user = id_user,
        id_trainer = trainer
        )
    db.session.add(new_routine)
    db.session.commit()
    return jsonify({'msg': 'success'}), 200

@api.route('/get/routine', methods=['GET'])
@jwt_required()
def get_one_routine_user():
    user_validation = get_jwt_identity()
    user_from_db = User.query.get(user_validation)


    if not user_from_db:
        return ({"msg": "user not exist"})

    routine = Routines.query.filter_by(id_user = user_from_db.id).first()

    if not routine:
        return jsonify({"msg": "no routine yet",
                        "status": True
                        }), 200
    

    return jsonify({"chest": routine.Chest,
                    "trainer_first_name": Trainer.query.filter_by(id = routine.id_trainer).first().first_name,
                    "trainer_last_name": Trainer.query.filter_by(id = routine.id_trainer).first().last_name,
                    "shoulders": routine.shoulders,
                    "legs": routine.legs,
                    "arms": routine.arms,
                    "msg": "success",
                    "status": True

                    }), 200

@api.route('/get/diet', methods=['GET'])
@jwt_required()
def get_one_diet_user():
    user_validation = get_jwt_identity()
    user_from_db = User.query.get(user_validation)

    if not user_from_db:
        return ({"msg": "user not exist"})

    diet = Diets.query.filter_by(id_user = user_from_db.id).first()

    if not diet:
        return jsonify({
                        "msg": "no diet yet"
                        }), 200

    return jsonify({
                    "breakfast": diet.breakfast,
                    "trainer_first_name": Trainer.query.filter_by(id = diet.id_trainer).first().first_name,
                    "trainer_last_name": Trainer.query.filter_by(id = diet.id_trainer).first().last_name,
                    "brunch": diet.brunch,
                    "lunch": diet.lunch,
                    "dinner": diet.dinner,
                    "supper": diet.supper,
                    "msg": "success",
                    

                    }), 200


@api.route('/routine/delete/<int:id>', methods=['DELETE'])
def delete_routine(id):

    routine_exist_db = Routines.query.filter_by(id_user = id).first()

    if routine_exist_db :
        db.session.delete(routine_exist_db)
        db.session.commit()

        return jsonify({
            'msg': 'success'
        }), 200
    else:
        return jsonify({
           'msg': 'this user not have routines' 
        }),500
    
@api.route('/diet/delete/<int:id>', methods=['DELETE'])
def delete_diet(id):

    diet_exist_db = Diets.query.filter_by(id_user = id).first()

    if diet_exist_db :
        db.session.delete(diet_exist_db)
        db.session.commit()

        return jsonify({
            'msg': 'success'
        }), 200
    else:
        return jsonify({
           'msg': 'this user not have diet' 
        }),500


@api.route('/assign/diet', methods=['POST'])
@jwt_required()
def assign_diet():
    
    trainer = get_jwt_identity()
    breakfast = request.json.get('breakfast')
    brunch = request.json.get('brunch')
    lunch = request.json.get('lunch')
    dinner = request.json.get('dinner')
    supper = request.json.get('supper')
    id_user = request.json.get('id_user')

    diet_from_db = Diets.query.filter_by(id_user = id_user).first()

     
    if not breakfast or not brunch or not lunch or not dinner or not supper:
        return jsonify({'msg': 'fill all inputs'}), 400    
    
    if diet_from_db :
        return jsonify({'msg': 'user already have diet assigned'}), 400
    
    new_diet = Diets(
        id_trainer = trainer,
        breakfast = breakfast,
        brunch =  brunch,
        lunch = lunch,
        dinner = dinner,
        supper = supper,
        id_user = id_user
        )
    db.session.add(new_diet)
    db.session.commit()

    return jsonify({'msg': 'success'}), 200

