const service = require("../services/attempts.service");

/**
 * Retrieves all records available through this controller.
 *
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @param {import("express").NextFunction} next - Callback used to pass errors to the next middleware.
 * @returns {Promise<void>} Sends JSON containing the retrieved records.
 */
async function getAll(req, res, next) {
    try {
        const rows = await service.getAll();

        res.status(200).json({
            success: true,
            count: rows.length,
            data: rows
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Retrieves a single record identified by the route parameter `id`.
 *
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @param {import("express").NextFunction} next - Callback used to pass errors to the next middleware.
 * @returns {Promise<void>} Sends JSON containing the requested record.
 */
async function getById(req, res, next) {
    try {
        const rows = await service.getById(req.params.id);

        res.status(200).json({
            success: true,
            count: rows.length,
            data: rows
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Retrieves all answers associated with the test attempt identified by `id`.
 *
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @param {import("express").NextFunction} next - Callback used to pass errors to the next middleware.
 * @returns {Promise<void>} Sends JSON containing the attempt answers.
 */
async function getAnswers(req, res, next) {
    try {
        const rows = await service.getAnswers(req.params.id);

        res.status(200).json({
            success: true,
            count: rows.length, 
            data: rows
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Retrieves one answer from a specific test attempt using `id` and `answerId`.
 *
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @param {import("express").NextFunction} next - Callback used to pass errors to the next middleware.
 * @returns {Promise<void>} Sends JSON containing the requested answer.
 */
async function getAnswersById(req, res, next) {
    try {
        const { id, answerId } = req.params;
        const rows = await service.getAnswersById(id,answerId);

        res.status(200).json({
            success: true,
            data: rows
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Grades the test attempt identified by `attempt_id` through the service layer.
 *
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @param {import("express").NextFunction} next - Callback used to pass errors to the next middleware.
 * @returns {Promise<void>} Sends the grading result as JSON.
 */
async function grade(req, res, next) {
    console.log('Start Grading Service');
    try {
        const attemptId = req.params.attempt_id;

        const result = await service.grade(attemptId);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}


/**
 * Creates a new record using values from the request body.
 *
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Sends the created record with HTTP 201 or an error response.
 */
async function createRow(req, res) {
    try {
        const row = await service.createRow(req.body);

        res.status(201).json({
            success: true,
            data: row
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Error creating record"
        });
    }
}

/**
 * Updates the record identified by `id` using values from the request body.
 *
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Sends the updated record or an error response.
 */
async function updateRow(req, res) {
    try {
        const rowId = req.params.id;

        const row = await service.updateRow(
            rowId,
            req.body
        );

        res.json({
            success: true,
            data: row
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Error updating row"
        });
    }
}

module.exports = {
    getAll,
    getById,
    createRow,
    updateRow,
    getAnswers,
    getAnswersById,
    grade
};