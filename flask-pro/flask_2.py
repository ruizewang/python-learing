# coding=utf-8
import requests
from flask import Flask, url_for
app = Flask(__name__)


@app.route('/')
def index():
    return 'this is index'


@app.route('/login')
def login():
    return 'this is login'


@app.route('/user/<username>')
def profile(username):
    return 'User %s'% username


@app.route('/login_2', methods=['GET', 'POST'])
def login_2():
    if request.method == 'POST':
        return 'this is post request'
    else:
        return 'this is get request'


with app.test_request_context():
    print(url_for('index'))
    print(url_for('login'))
    print(url_for('login', next='/'))
    print(url_for('profile', username='yang'))

if __name__ == '__main__':
    app.run(debug=True)
