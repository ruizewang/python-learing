# coding=utf-8

import socket
import re


def get_local_ip():
    """
    获取本机的ｉｐ
    :return:
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
    """
    判定是否是线上的ｉｐ
    8.8.8.8也是一个IP地址，这个地址实际上是域名解析服务器的地址，用于解析域名。
    国内的DNS服务器:114.114.114.114
    :return:
    """
    ip = get_local_ip()
    rep = re.compile('172.23.1[01]]')
    result = rep.match(ip)
    if result:
        return True


if __name__ == '__main__':
    is_online_ip()