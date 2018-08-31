# coding=utf-8

import psutil
from base_learning import SSh, getCmd
from xmlrpc.client import ServerProxy
if __name__ == '__main__':
    s = ServerProxy("http://172.23.122.11:8080")
    res = s.add(3, 4)
    print(res)

hostname = '172.23.122.11'
port = 22
username = 'root'
password = 'citics'
ssh = SSh(hostname, port, username, password)
cmd = 'psutil.virtual_memory().percent'
res = ssh.ssh_con(cmd)
print('res:', res)

# def getCpuRatio():
