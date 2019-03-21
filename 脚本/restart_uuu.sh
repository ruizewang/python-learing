pkill -9 -f uwsgi
sleep 5
pkill -9 -f manage.py

#ps -ef|grep uwsgi|xargs kill -9
sleep 10
/usr/local/bin/uwsgi --ini /root/redhat/project/aisite_uwsgi.ini 2>>errlog.log 1>>runlog.log &
