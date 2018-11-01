echo ---------------------------------------- >> errlog.log
echo ---------------------------------------- >> runlog.log
date >> errlog.log
date >> runlog.log
uwsgi --ini aisite_uwsgi.ini 2>>errlog.log 1>>runlog.log &
