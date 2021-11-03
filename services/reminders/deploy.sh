
SERVICE_NAME=homepi_reminder

npm install

#DIR=$(pwd)
DIR="$(dirname "${BASH_SOURCE[0]}")"
DIR="$(realpath "${DIR}")"
echo $DIR

cp $DIR/service.sh /etc/init.d/$SERVICE_NAME
sed -i "s/<DIR>/$DIR/" /etc/init.d/$SERVICE_NAME
chmod +x /etc/init.d/$SERVICE_NAME

service $SERVICE_NAME start
update-rc.d $SERVICE_NAME defaults


