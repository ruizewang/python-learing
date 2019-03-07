# coding=utf-8
from flask_blog.model.User import User
from flask_blog.model.Category import Category
import os

from flask_blog import app, db
from flask import request, render_template, flash, abort, url_for, session, redirect, session, Flask, g


@app.route('/')
def show_entries():
    categorys = Category.query.all()
    return render_template('show_entries.html', entries=categorys)


@app.route('/add', methods=['POST'])
def add_entry():
    if not session.get('logged_in'):
        abort(401)
    title = request.form['title']
    content = request.form['text']
    category = Category(title, content)
    db.session.add(category)
    db.session.commit()
    flash('New entry was successlly posted')
    return redirect(url_for('show_entries'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=request.form['username']).first()
        passwd = User.query.filter_by(password=request.form['password']).first()

        if user is None:
            error = 'Invalid Username'
        elif passwd is None:
            error = 'Invalid password'
        elif username is None and password is None:
            return redirect(url_for('register'))
        else:
            session['logged_in'] = True
            session['username'] = username
            flash('You were logged in')
            return redirect(url_for('show_entries'))
    return render_template('login.html', error=error)


@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    session.pop('username', None)
    flash('You were logged put')
    return redirect(url_for('show_entries'))


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == "GET":
        return render_template('register.html')
    else:
        error = None
        username = request.form['username']
        password = request.form['password']
        if username is None:
            error = 'Invalid Username'
        elif password is None:
            error = 'Invalid password'
        elif username is None and password is None:
            flash('Please enter username and password！')
            return redirect(url_for('register'))
        userinfo = User(username, password)
        db.session.add(userinfo)
        db.session.commit()
        flash('You were successlly registered!')
        return render_template('login.html', error=error)