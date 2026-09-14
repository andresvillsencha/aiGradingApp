// Create the shared MySQL connection pool used by repository modules.
const mysql = require("mysql2/promise");

console.log('Preparing DB connection');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
    queueLimit: 0,

    decimalNumbers: true
});

/**
 * Verifies that the MySQL pool can obtain a connection and communicate with the database.
 *
 * @returns {Promise<void>} Resolves after a successful database ping.
 * @throws {Error} Propagates connection or ping failures.
 */
async function testConnection() {
    const connection = await pool.getConnection();

    try {
        await connection.ping();
        console.log("Database connection established");
    } finally {
        connection.release();
    }
}

module.exports = {
    pool,
    testConnection
};