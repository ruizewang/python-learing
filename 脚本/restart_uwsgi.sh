#pkill -9 -f uwsgi

/usr/local/bin/uwsgi --ini /root/redhat/ai_site/aisite_uwsgi.ini 2>>errlog.log 1>>runlog.log &
