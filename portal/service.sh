#!/bin/sh
### BEGIN INIT INFO
# Provides:          Portfolio
# Required-Start:    $local_fs $network $named $time $syslog
# Required-Stop:     $local_fs $network $named $time $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Description:       Homepi portal
### END INIT INFO

# cp service.sh /etc/init.d/home_portal
#service $SERVICE_NAME start
#update-rc.d $SERVICE_NAME defaults

SCRIPT="cd /home/pi/workbench/homepi/portal && npm start"
RUNAS=pi

PIDFILE=/var/run/homepi_portal.pid

start() {
  if [ -f /var/run/$PIDNAME ] && kill -0 $(cat /var/run/$PIDNAME); then
    echo 'Service already running' >&2
    return 1
  fi

  echo 'Starting service…' >&2
  local CMD="$SCRIPT & echo \$!"
  su -c "$CMD" $RUNAS > "$PIDFILE"
  echo 'Service started' >&2
}

stop() {
  if [ ! -f "$PIDFILE" ] || ! kill -0 $(cat "$PIDFILE"); then
    echo 'Service not running' >&2
    return 1
  fi
  echo 'Stopping service…' >&2
  kill -15 $(cat "$PIDFILE") && rm -f "$PIDFILE"
  echo 'Service stopped' >&2
}

case "$1" in
    start)
       start
       ;;
    stop)
       stop
       ;;
    restart)
       stop
       start
       ;;
    status)
       cat $PIDFILE
       ;;
    *)
       echo "Usage: $0 {start|stop|status|restart}"
esac

exit 0


