from flask import Flask, render_template, request
app = Flask(__name__)


@app.route('/hello/')
@app.route('/hello/<name>')
def hello(name=None):
    return render_template('hello.html', name=name)


@app.route('/login_2', methods=['GET', 'POST'])
def login_2():
    print(request)
    if request.method == 'POST':
        return 'this is post request'
    else:
        return 'this is get request'


with app.test_request_context('/hello', method='POST'):
    assert request.path == '/hello'
    assert request.method == 'POST'

with app.request_context(environ):
    assert request.path == '/hello'
    assert request.method == 'POST'

if __name__ == '__main__':
    app.run(debug=True)