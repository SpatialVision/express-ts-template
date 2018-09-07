"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by hxg on 9/10/17.
 * converted to TS by kis on 3/7/18
 */
const Log_1 = require("../logs/Log");
// const pgp = require('pg-promise')();
const pgPromise = require("pg-promise");
const pgp = pgPromise({
// Initialization Options
});
class Connection {
    static init() {
        if (!!this.db) {
            Log_1.default.info('DbConnection.init db already inited..');
            return;
        }
        // const CERT_FILE_PATH = `${__dirname}/../../rds-combined-ca-bundle.pem`;
        // log.info('DbConnection.init CERT_FILE_PATH: %s', CERT_FILE_PATH);
        Log_1.default.info('DbConnection.init POSTGRES_SSL: %s', process.env.POSTGRES_SSL);
        const CON = {
            host: process.env.POSTGRES_HOST,
            port: process.env.POSTGRES_PORT,
            database: process.env.POSTGRES_DATABASE,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            ssl: process.env.POSTGRES_SSL,
        };
        this.db = pgp(`postgres://${CON.user}:${CON.password}@${CON.host}:${CON.port}/${CON.database}?ssl=${CON.ssl}`);
        Log_1.default.info('DbConnection.init created db with CON: %s, process.env.NODE_ENV: %s', CON, process.env.NODE_ENV);
    }
    static getDb() {
        Log_1.default.debug('DbConnection.db');
        if (!this.db) {
            this.init();
        }
        return this.db;
    }
    static pgpHelper() {
        return pgp.helpers;
    }
}
exports.default = Connection;
//# sourceMappingURL=Connection.js.map