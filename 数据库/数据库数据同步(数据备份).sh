yd=`date -d yesterday +%Y%m%d`
rm -rf /opt/dump/exp_citics_ai_$yd.sql

today=`date +%Y%m%d`
mysqldump -uroot -proot citics_ai >/opt/dump/exp_citics_ai_$today.sql

