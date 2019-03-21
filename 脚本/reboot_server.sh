/root/redhat/packages/redis-4.0.9/src/redis-server /root/redhat/packages/redis-4.0.9/redis.conf

#sh /root/redhat/runmemca.sh

service nginx start

sh /root/redhat/ai_site/runserver.sh

/usr/local/memcahced/bin/memcached -d -m 512 -u root -p 11211 -c 1024 -P /tmp/memcached.pid

