
SERVICE_NAME=homepi_reminder

set -x;
set -e;

#npm install

#DIR=$(pwd)
DIR="$(dirname "${BASH_SOURCE[0]}")"
echo "DIR 1 = $DIR"
DIR="$(realpath "${DIR}")"
echo "DIR = $DIR"

cp $DIR/service.sh /etc/init.d/$SERVICE_NAME
sed -i "s@<DIR>@$DIR@" /etc/init.d/$SERVICE_NAME
chmod +x /etc/init.d/$SERVICE_NAME

/etc/init.d/$SERVICE_NAME start
#service $SERVICE_NAME start
#update-rc.d $SERVICE_NAME defaults


