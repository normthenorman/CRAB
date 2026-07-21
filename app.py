import os
from flask import Flask, render_template, url_for, redirect, flash
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError, Email
from email_validator import validate_email, EmailNotValidError


app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-only-insecure-key')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(64), nullable=False, unique=True)
    username = db.Column(db.String(20), nullable=True, unique=True)
    password = db.Column(db.String(128), nullable=False)
    onboarding_complete = db.Column(db.Boolean,default=False, nullable=False)
    verified_email = db.Column(db.Boolean, default=False, nullable=False)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class RegisterForm(FlaskForm):
    email = StringField(
        validators=[InputRequired(), Email(), Length(min=8, max=48)],
        render_kw={"placeholder": "E-mail..."}
    )
    password = PasswordField(
        validators=[InputRequired(), Length(min=8, max=32)],
        render_kw={"placeholder": "Password..."}
    )
    submit = SubmitField('Register')

    def validate_username(self, username):
        existing_user = User.query.filter_by(username=username.data).first()
        if existing_user:
            raise ValidationError('That username is already taken. Please choose a different one.')


class LoginForm(FlaskForm):
    email = StringField(
        validators=[InputRequired(), Email(), Length(min=1, max=24)], 
        render_kw={"class" : "email-input" ,"placeholder": "E-mail..."}
    )
    
    password = PasswordField(
        validators=[InputRequired(), Length(min=8, max=32)], 
        render_kw={"class" : "password-input" ,"placeholder": "Password..."}
    )

    submit = SubmitField(
        render_kw={"class" : "submit-button", "value" : "Login"}    
    )


@app.route('/', methods=['POST', 'GET'])
def index():
    if current_user.is_authenticated:
        email_info = { "email" : current_user.email}
    else:
        email_info = None
    
    return render_template('index.html',email_info=email_info)

@app.route('/register', methods=['POST', 'GET'])
def register():
    form = RegisterForm()

    if form.validate_on_submit():
        try:    
            emailinfo = validate_email(form.email.data, check_deliverability=False)
        except EmailNotValidError:
            flash('This email is not valid', 'danger')
            return render_template('register.html', form=form)

        existing_user = User.query.filter_by(email=emailinfo.normalized).first()
        if existing_user:
            flash('An account with that email already exists', 'danger')
            return render_template('register.html', form=form)

        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        new_user = User(email=emailinfo.normalized, password=hashed_password)

        db.session.add(new_user)
        db.session.commit()

        login_user(new_user)
        return redirect(url_for('dashboard'))

    return render_template('register.html', form=form)

@app.route('/login', methods=['POST', 'GET'])
def login():
    form = LoginForm()

    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user)
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid username or password', 'danger')
            return redirect(url_for('login'))

    return render_template('login.html', form=form)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route('/dashboard')
@login_required
def dashboard():
    if not current_user.onboarding_complete:
        return redirect(url_for('onboarding'))
    return render_template('dashboard.html')

class onboardingForm(FlaskForm):

    username = StringField(
        validators=[InputRequired(), Length(min=3, max=24)],
        render_kw={"Placeholder" : "username"}
    )
    
    submit = SubmitField('Claim username')
    
@app.route('/onboarding', methods=['GET', 'POST'])
@login_required
def onboarding():
    form = onboardingForm()
    if form.validate_on_submit():
        current_user.username = form.username.data
        current_user.onboarding_complete = True
        db.session.commit()
        return redirect(url_for('dashboard'))

    return render_template('onboarding.html', form=form)

@app.route('/<username>')
def page(username):
    user = User.query.filter_by(username=username).first_or_404()
    return render_template('page.html', user=user)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)