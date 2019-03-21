from flask import Flask, request, make_response, render_template
app = Flask(__name__)


@app.route('/')
def index():
    resp = make_response(render_template('...'))
    resp.set_cookie('username', 'the username')
    return resp


@app.route('/getcookie')
def getCookie():
    username = request.cookies.get('username')