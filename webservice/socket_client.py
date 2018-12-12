import socket
import struct
#本地
# HOST = '10.24.206.34'
# PORT = 8000
#线上
# HOST = '10.24.206.34'
# PORT = 8000
BUFFER_SIZE = 1024


def socket_login(user, psword):
    try:
        socket.setdefaulttimeout(5)
        # 创建客户端套接字
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        # 连接到服务器
        sock.connect((HOST, PORT))
        send_message = 'user:{user}, psword:{psword}'.format(user=user, psword=psword).encode()
        # 发起数据给服务器
        sock.sendall(send_message)
        while True:
            # 接收服务器返回的数据
            data = sock.recv(10)
            print('Client Received: {}'.format(data.decode()))

            if data:
                break

    except socket.timeout as e:
        print('Socket error: {}'.format(e))
    finally:
        sock.close()


if __name__ == '__main__':

    socket_login('root', 'Admin84588763')