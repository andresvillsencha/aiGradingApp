/**
 * Central Express error handler that converts application errors into JSON HTTP responses.
 *
 * @param {Error & {statusCode?: number}} error - Error passed by previous middleware or controllers.
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @param {import("express").NextFunction} next - Express next callback required by the error-handler signature.
 * @returns {void} Sends an error response to the client.
 */
function errorHandler(error, req, res, next) {
    console.error(error);

    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message:
            statusCode === 500
                ? 'Internal server error'
                : error.message
    });
}

module.exports = errorHandler;