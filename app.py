from flask import Flask, render_template, url_for
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
bcrypt = Bcrypt(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

@app.route('/', methods=['POST', 'GET'])
def index():
    return render_template('index.html')


if __name__ == "__main__":
    with app.app_context():
        db.create_all() 
    
    app.run(debug=True)