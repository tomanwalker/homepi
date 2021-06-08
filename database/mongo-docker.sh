

## Install
docker run --name mongodb -p 27017:27017 \
--restart=always -m 256M -d \
-e MONGO_INITDB_ROOT_USERNAME=admin \
-e MONGO_INITDB_ROOT_PASSWORD=123 \
mongo


