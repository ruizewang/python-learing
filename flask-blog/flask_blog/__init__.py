# coding=utf-8
"""
    模块初始化文件，flask程序对象的创建必须在这个文件里面完成，然后可以安全的引入每个包
"""
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_blog.model import User, Category

app = Flask(__name__)

# 加载配置文件内容
# 模块下的setting文件名，不加py后缀
app.config.from_object('flask_blog.setting')
# 环境变量，指向配置文件setting的路径
# FLASKR_SETTINGS环境变量需要手工单独设置
app.config.from_envvar('FLASKR_SETTINGS', silent=True)
# app.config.from_envvar('/flask_blog/setting.py')
# 创建数据库链接
db = SQLAlchemy(app)