const mysql = require('mysql');
const fs = require('fs');
const util = require('util');
const logger = require('../utils/logger');
const path = require("path");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: fs.readFileSync(path.resolve(__dirname, '../infraestructure/resources/systemfiles/BaltimoreCyberTrustRoot.crt.pem'))
});

pool.getConnection((err, connection) => {
    if (err) {
        logger.error(`Error connecting to the database: ${err}`);
    } else {
        connection.release();
        logger.info('Successful database connection');
    }
});

pool.query = util.promisify(pool.query);

module.exports = pool;
