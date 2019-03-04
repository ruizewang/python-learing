from flask import Flask, url_for
app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'hello world1111222!'


@app.route('/user/<username>/')
def show_user_profile(username):
    return 'User %s'% username


@app.route('/post/<int:post_id>/')
def show_post(post_id):
    return 'post %d'% post_id


@app.route('/about')
def about():
    return 'about page'


@app.route('/projects')
def projects():
    return 'the projects page'


if __name__ == "__main__":
    app.run(debug=True)
