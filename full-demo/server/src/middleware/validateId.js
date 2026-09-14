/**
 * Creates middleware that validates a route parameter as a positive integer and normalizes it to a number.
 *
 * @param {string} parameterName - Route parameter name to validate.
 * @returns {import("express").RequestHandler} Middleware that rejects invalid IDs or continues the request.
 */
function validateId(parameterName = "id") {
    /**
     * Validates the configured ID parameter for the current request.
     *
     * @param {import("express").Request} req - Express request object.
     * @param {import("express").Response} res - Express response object.
     * @param {import("express").NextFunction} next - Callback used to continue the middleware chain.
     * @returns {void|import("express").Response} Sends HTTP 400 for invalid values; otherwise calls next().
     */
    return function validateIdMiddleware(req, res, next) {
        const value = Number(req.params[parameterName]);

        if (!Number.isInteger(value) || value <= 0) {
            return res.status(400).json({
                success: false,
                message: `${parameterName} must be a positive integer`
            });
        }

        req.params[parameterName] = value;

        next();
    };
}

module.exports = validateId;