"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config = {
    client: 'mysql',
    connection: process.env.KNEX_DB_CONNECTION
        ? JSON.parse(process.env.KNEX_DB_CONNECTION)
        : undefined,
    useNullAsDefault: true,
    migrations: {
        directory: './src/migrations'
    },
    pool: {
        min: 0,
        max: 7,
        idleTimeoutMillis: 15000
    }
};
const knexConfig = {
    development: config,
    staging: config,
    production: config
};
exports.default = knexConfig;
