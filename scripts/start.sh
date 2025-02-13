#!/bin/bash

if [ $NODE_ENV = 'production' ] || [ $NODE_ENV = 'staging' ]
then
  echo "$GCP_STORAGE_CREDS" > /app/storage-creds.json
  npm run build
  node ./out/src/index.js
  exit
fi

until nc -z -v -w30 nanostore-mysql 3306
do
  echo "Waiting for database connection..."
  sleep 1
done
knex migrate:latest
npm run dev