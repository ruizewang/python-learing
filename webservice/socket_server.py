import socket
from ldap3_login import LDAPLogin
#线上
HOST = '127.0.0.2'      # 服务器主机地址
PORT = 8001             # 服务器监听端口
BUFFER_SIZE = 2048      # 读取数据大小

# socket.setdefaulttimeout(3)
# 创建一个套接字
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  
# 绑定主机和端口
sock.bind((HOST, PORT))
# 开启socket监听
sock.listen(5)
print('Server start, listening {}'.format(PORT))


def login_socket_server():
    try:
        while True:
            # 建立连接，连接为建立的时候阻塞
            conn, addr = sock.accept()
            while True:
                # 读取数据，数据还没到来阻塞
                data = conn.recv(BUFFER_SIZE)
                data1 = data.decode(encoding='utf-8', errors='strict')
                print(data1)
                if data1:
                    result_list = data1.split(',')
                    username = result_list[0].split(':')[1]
                    password = result_list[1].split(':')[1]

                if username and password:
                    result = LDAPLogin(username, password)
                    result_ldap = result.encode()
                    print(result)

                if len(result_ldap):
                    print('username:{user}\npassword{password}'.format(user=username, password=password))
                    conn.send(result_ldap)
                else:
                    print('Server Recv Over')
                break
    except:
        result_ldap = '连接失败'.encode()
        conn.send(result_ldap)
        login_socket_server()
    finally:
        if conn:
            conn.close()

if __name__ == '__main__':
    login_socket_server()



