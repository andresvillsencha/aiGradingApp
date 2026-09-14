// Load configuration, verify infrastructure dependencies, and start the HTTP server.
require('dotenv').config();

const app = require('./app');


const { testConnection } = require("./config/database");

const port = process.env.PORT || 3000;

/**
 * Starts the API only after the database connection has been verified.
 *
 * @returns {Promise<void>} Resolves after the startup sequence completes.
 */
async function startServer() {
    try {
        await testConnection();

        app.listen(port, () => {
            console.log(
                `Test Evaluation API running at http://localhost:${port}`
            );
        });
    } catch (error) {
        console.error("Unable to start server:");
        console.error(error);
        process.exit(1);
    }
}

startServer();