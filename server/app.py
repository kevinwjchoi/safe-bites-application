#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User
from sqlalchemy import and_


from flask import render_template, request, make_response, jsonify, session
import logging

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.route('/')
def index(id=0):
    return render_template("index.html")

#User routes 
class GetUsers(Resource):
    def get(self):
        users = User.query.all()

        if not users: 
            return {'error': 'No users were found'}, 404
        
        return make_response(
            jsonify([user.to_dict() for user in users]), 200
        )

class Signup(Resource):
    def post(self):
        data = request.get_json()

        if 'username' not in data or 'email' not in data or 'password':
            return {'error':'Username, email, and password are required'}, 422

        username = data['username'].lower()
        email = data['email'].lower()
        password = data['password']

        username_exists = User.query.filter_by(username = username).first()
        email_exists = User.query.filter_by(email = email).first()

        if username_exists:
            return {'error' : 'An account with this username already exists'}, 409
        if email_exists:
            return {'error' : 'An account with this email already exists'}, 409
        
        new_user = User(
            username=username,
            email = email,
            password_hash = password
            )

        db.session.add(new_user)
        db.session.commit()

        return new_user.to_dict(), 201

class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()

        if user:
            return user.to_dict(), 201
        else:
            return {"error": "Unauthorized"}, 401
        
class Login(Resource):
    def post(self):
        data = request.get_json()

        username = data['username']
        password = data['password']

        if 'username' not in data or 'password' not in data:
            return {'error' : 'Username, email, password are required.'}
        
        user = User.query.filter(User.username == username).first()

        if not user:
            return {'error' : 'Username does not exist'}, 404
        
        if user:
            if user.authenticate(password): 
                session['user_id'] = user.id
                return user.to_dict(), 200

        return {'error': 'Invalid username or password'}, 401

class Logout(Resource):
    def delete(self):
        if 'user_id' in session and session['user_id']:
            session['user_id'] = None
            return {'message': 'Logged out successfully'}, 204
        else:
            return {'error': 'Unauthorized'}, 401

#User API Resources
api.add_resource(GetUsers, '/users', endpoint='/users')
api.add_resource(Signup, '/signup', endpoint='/signup')
api.add_resource(CheckSession, '/check_session', endpoint='/check_session')
api.add_resource(Login, '/login', endpoint='/login')
api.add_resource(Logout, '/logout', endpoint='logout')
