import contextlib
import pymysql
from pymysql.cursors import DictCursor

mysql_aidatabase_db = dict(host='127.0.0.1', user='aidata', password='citics', database='aidatabase',port=3306,charset='utf8')


# ###字典格式###
@contextlib.contextmanager
def mysql(dbconfig):
    conn = pymysql.connect(**dbconfig)
    cursor = conn.cursor(cursor=DictCursor)
    try:
        yield cursor
    finally:
        conn.commit()
        cursor.close()
        conn.close()

# ###元组形式###
@contextlib.contextmanager
def mysql_tuple(dbconfig):
    conn = pymysql.connect(**dbconfig)
    cursor = conn.cursor()
    try:
        yield cursor
    finally:
        conn.commit()
        cursor.close()
        conn.close()


# ###获取code 和name###
def getCodeMappingName():
    with mysql(mysql_aidatabase_db) as cursor:
        sql = "select distinct windcode, security_name from replace_security_list "
        cursor.execute(sql)
        data = cursor.fetchall()
        return data


# ###获取code and name 字典###
def codeAndNameDict():
    data = getCodeMappingName()
    res_list = list()
    for mem in data:
        code_and_name_dict = dict()
        name_and_code_dict = dict()
        code_and_name_dict['name'] = mem['security_name']
        name_and_code_dict['name'] = mem['windcode']
        res_list.append(code_and_name_dict)
        res_list.append(name_and_code_dict)
    print('最终结果:', res_list)
    print('length:', len(res_list))
    return res_list


# ###获取code and name 字典###
def nameAndCodeDict():
    data = getCodeMappingName()
    name_and_code_dict = dict()
    for mem in data:
        name_and_code_dict[mem['security_name']] = mem['windcode']
    print('最终结果:', name_and_code_dict)
    return name_and_code_dict


if __name__ == '__main__':
    codeAndNameDict()
    nameAndCodeDict()