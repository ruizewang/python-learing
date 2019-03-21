import socket
import re


def get_host_ip():
    """
    查询本机ip地址
    :return: ip
    """
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
        print(s.getsockname())
    finally:
        s.close()
    return ip


def is_online_ip():
    ip = get_host_ip()
    rep = re.compile('127.0.0.1')
    result = rep.match(ip)
    if result:
        return ip


if __name__ == '__main__':
    get_host_ip()