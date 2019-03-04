from flask import Flask, session, redirect, url_for, escape, request, render_template
app = Flask(__name__)


@app.route('/')
def index():
    """
     escape() 可以在你模板引擎外做转义
    :return:
    """
    if 'username' in session:
        return 'Logged in as %s'%escape(session['username'])
    return 'You are not logged in'


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        session['username'] = request.form['username']
        return redirect(url_for('index'))
    return """
            <from action='' method='post'>
                <p>
                    <input type=text name=username>
                </p>
                <p>
                    <input type=submit value=Login>
                </p>
            """


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))


app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
"""
随机的问题在于很难判断什么是真随机。一个密钥应该足够随机。你的操作系统可以基于一个密钥随机生成器来生成漂亮的随机值，这个值可以用来做密钥:
>>> import os
>>> os.urandom(24)
'\xfd{H\xe5<\x95\xf9\xe3\x96.5\xd1\x01O<!\xd5\xa2\xa0\x9fR"\xa1\xa8'
使用基于 cookie 的会话需注意: Flask 会将你放进会话对象的值序列化至 Cookies。如果你发现某些值在请求之间并没有持久存在，然而确实已经启用了 Cookies，但也没有得到明确的错误信息。这时，请检查你的页面响应中的 Cookies 的大小，并与 Web 浏览器所支持的大小对比。
"""