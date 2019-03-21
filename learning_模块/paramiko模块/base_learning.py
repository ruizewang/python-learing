# coding=utf-8

"""
    基于用户名密码连接
"""

import paramiko
from collections import OrderedDict


# ###ssh 连接###
class SSh:

    def __init__(self, hostname, port, username, password):
        self.hostname = hostname
        self.port = port
        self.username = username
        self.password = password

    def ssh_con(self, cmd):
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy)
        ssh.connect(self.hostname, self.port, self.username, self.password)
        stdin, stdout, stderr = ssh.exec_command(cmd)
        res, err = stdout.read(), stderr.read()
        result = res if res else err
        print('hostname:%s'%(self.hostname))
        print('result:', result.decode())
        ssh.close()


# ###获取要执行的cmd命令###
def getCmd(stra_db):
    cmd = ''
    if stra_db == 'aimockdb':
        cmd = 'python /root/redhat/test_stra/test_mock.py'
    elif stra_db == 'aidevdb':
        cmd = 'python /root/redhat/test_stra/test_dev.py'
    elif stra_db == 'aiproddb':
        cmd = 'python /root/redhat/test_stra/test_prod.py'
    else:
        print('cmd参数有误')
    return cmd


if __name__ == '__main__':
    cmd = getCmd('aimock')
    if cmd:
        port = 22
        username = 'root'
        password = 'citics'
        ssh = SSh('172.23.122.11', port, username, password)
        try:
            ssh.ssh_con(cmd)
        except Exception as e:
            print(e)
    else:
        print('执行cmd的命令有误')



# # creating a object
#
# ssh = paramiko.SSHClient()
#
# # 允许连接不存在konw_hosts文件中的主机
#
# ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy)
#
# # 连接服务器
#
# ssh.connect(hostname='172.23.122.11', port =22, username='root', password='citics')
#
# # 执行命令
#
# stdin, stdout, stderr = ssh.exec_command('python /root/redhat/test_stra/test_hello.py')
#
# # 获取命令结果
#
# result = stdout.read()
# resutl1 = stderr.read()
# print(result)
#
# # 关闭连接
#
# ssh.close()