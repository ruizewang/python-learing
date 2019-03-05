"""
    配置文件，数据库用户名密码等
"""
# 调试模式是否开启
DEBUG = True

SQLALCHEMY_TRACK_MODIFICATIONS = False

# session必须要设置ｋｅｙ:os.urandom(24)
SECRET_KEY = '\x9f\xd5\x9a+\xf1\xb5\xc3\xf5\xca)\xb4\x0f\x19B\x17\x9d\xe1\xe2B\x8b.W\xbdU'

# mysql数据库链接信息，这里是自己的帐号
SQLALCHEMY_DATABASE_URI = 'mysql://root:root@127.0.0.1:3306/flask_blog'