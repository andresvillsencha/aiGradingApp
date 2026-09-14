/**
 * Handles requests that did not match any registered endpoint.
 *
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @returns {void} Sends an HTTP 404 JSON response.
 */
function notFound(req, res) {
    res.status(404).json({
        success: false,
        message: `Endpoint not found: ${req.method} ${req.originalUrl}`
    });
}

module.exports = notFound;