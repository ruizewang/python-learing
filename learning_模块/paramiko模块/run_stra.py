import paramiko
import subprocess
import os, subprocess

import paramiko
import sys
import os
import socket
import select
import getpass
from paramiko.py3compat import u

# import sshpass


def paramiko_ms():
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect('10.24.206.90', 22, 'zhanghan', '111111')
    while True:
        cmd = input('输入命令')
        if cmd == 'excit':
            break
        stdin, stdout, stderr = ssh.exec_command(cmd)
        print(stdout.read().decode())
    ssh.close()

    # cmd = sshpass


def paramiko_demo():
    default_username = getpass.getuser()
    username = input('Username [%s]: ' % default_username)
    if len(username) == 0:
        username = default_username

    hostname = input('Hostname: ')
    if len(hostname) == 0:
        print('*** Hostname required.')
        sys.exit(1)

    tran = paramiko.Transport((hostname, 22,))
    tran.start_client()

    default_auth = "p"
    auth = input('Auth by (p)assword or (r)sa key[%s] ' % default_auth)
    if len(auth) == 0:
        auth = default_auth

    if auth == 'r':
        default_path = os.path.join(os.environ['HOME'], '.ssh', 'id_rsa')
        path = input('RSA key [%s]: ' % default_path)
        if len(path) == 0:
            path = default_path
        try:
            key = paramiko.RSAKey.from_private_key_file(path)
        except paramiko.PasswordRequiredException:
            password = getpass.getpass('RSA key password: ')
            key = paramiko.RSAKey.from_private_key_file(path, password)
        tran.auth_publickey(username, key)
    else:
        pw = getpass.getpass('Password for %s@%s: ' % (username, hostname))
        tran.auth_password(username, pw)

    # 打开一个通道
    chan = tran.open_session()
    # 获取一个终端
    chan.get_pty()
    # 激活器
    chan.invoke_shell()

    while True:
        # 监视用户输入和服务器返回数据
        # sys.stdin 处理用户输入
        # chan 是之前创建的通道，用于接收服务器返回信息
        readable, writeable, error = select.select([chan, sys.stdin, ],[],[],1)
        if chan in readable:
            try:
                x = u(chan.recv(1024))
                if len(x) == 0:
                    print('\r\n*** EOF\r\n')
                    break
                sys.stdout.write(x)
                sys.stdout.flush()
            except socket.timeout:
                pass
        if sys.stdin in readable:
            inp = sys.stdin.readline()
            chan.sendall(inp)

    chan.close()
    tran.close()


# 文件路径
def get_path():
    path = os.getcwd()
    print(path)

    # print(os.path.abspath(os.path.dirname(__file__)))

    file_name = os.path.basename(__file__)
    print(file_name)
    file_path = path + '/' + file_name


# 执行脚本
def exshell(file_name, file_path):
    # result = subprocess.getoutput('./shell_yun.sh %s %s' % (file_path, file_name))
    result = subprocess.getoutput('ls')

    print(result)


# 执行脚本
def exshell_1():
    while True:
        cmd = input('请输入指令： ')
        if cmd == 'exit':
            break
    # result = subprocess.getoutput('./shell_yun.sh %s %s' % (file_path, file_name))
        else:
            result = subprocess.getoutput(cmd)

            print(result)


# 写入文件
def wirte(stratege):
    with open('xxx.py', 'w') as f:
        content = 'from a import b\nprint("%s")' % stratege
        f.write(content)


if __name__ == '__main__':
    # wirte('test')
    # exshell_1()
    paramiko_demo()

