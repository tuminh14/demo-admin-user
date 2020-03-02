sleep 5
chmod -R 777 mongo/data/
export MONGO_DATABASE_PASSWORD=$(cat mongo/secrets/MONGO_INITDB_PASSWORD)
export MONGO_DATABASE_USERNAME=$(cat mongo/secrets/MONGO_INITDB_USERNAME)
export MONGO_DATABASE_NAME=$(cat mongo/secrets/MONGO_INITDB_DATABASE)
npm install
chmod -R 777 node_modules/
npm run prod
pm2 logs
