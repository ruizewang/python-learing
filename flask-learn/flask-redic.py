from flask import Flask, abort, redirect, url_for, render_template
app = Flask(__name__)

@app.route('/')
def index():
    """
    redirect:用户重定向
    :return:
    """
    return redirect(url_for('login'))

@app.route('/login')
def login():
    """
    abort:放弃请求，并返回错误代码
    :return:
    """
    abort(401)
    this_is_never_executed()

    
@app.errorhandler(404)
def page_not_found(error):
    return render_template('page not found.html'), 404