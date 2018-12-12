import ldap3
from ldap3 import Server, Connection, ALL, SUBTREE, ServerPool


#测试
LDAP_URI = 'ldap://127.0.0.1:389'

LDAP_BIND_USER = 'uid={},cn=users,dc=yourweb,dc=com'


#OA验证
def Authorize(user=None, password=None):
    try:
        server = Server(LDAP_URI, get_info=ALL)
        conn = None
        if user and password:
            conn = Connection(server, user=LDAP_BIND_USER.format(user), password=password, auto_bind=True)
        print(conn)
        # if not auto_bind:
        #     succ = conn.bind()
        # else:
        #     succ = True
        # msg = conn.result
        if conn:
            conn.unbind()
            print('{name}登录验证成功'.format(name=user))
            return 'True'
    except Exception as e:
        if conn:
            conn.unbind()
        print('{name}登录验证失败'.format(name=user))
        return 'False'


# 连接超时，尝试多次连接
def GetDn(user, password, trynum=10):
    i = 0

    foundResult = ""
    while (i <= trynum):
        foundResult = Authorize(user, password)
        if foundResult:
            break
        i += 1
        print('连接失败，第{}次链接'.format(i))
    return foundResult


def LDAPLogin(user, password):
    
    if (password == ""):
        print("PassWord empty")
        return

    if (user == ''):
        print("Not Exist User")
        return
       
    return GetDn(user, password, 0)


if __name__ == '__main__':
    print(LDAPLogin(user='030290', password='Wzs_0314'))
