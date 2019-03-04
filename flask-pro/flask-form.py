from flask import Flask, request, render_template
app = Flask(__name__)


@app.route('/login', methods=['POST', 'GET'])
def login():
    searchword = request.args.get('q', '')
    error = None
    if request.method == "POST":
        if valid_login(request.form['username'],
                       request.form['password']
                       ):
            return log_the_user_in(request.form['username'])
        else:
            error = 'invalid username/password'

    return render_template('login.html', error=error)