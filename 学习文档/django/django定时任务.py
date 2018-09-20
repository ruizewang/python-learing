

from apscheduler.scheduler import Scheduler
from siteathome import tests

sched = Scheduler()


@sched.interval_schedule(seconds=60)
def my_task():
    tests.testFuncton()


sched.start()