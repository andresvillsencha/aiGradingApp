const service = require("../services/tests.service");

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
            data: rows
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Retrieves all questions belonging to the test identified by `id`.
 *
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @param {import("express").NextFunction} next - Callback used to pass errors to the next middleware.
 * @returns {Promise<void>} Sends JSON containing the test questions.
 */
async function getQuestions(req, res, next) {
    try {
        const rows = await service.getQuestions(req.params.id);

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
 * Retrieves one question from a test using `id` and `questionId`.
 *
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @param {import("express").NextFunction} next - Callback used to pass errors to the next middleware.
 * @returns {Promise<void>} Sends JSON containing the requested question.
 */
async function getQuestion(req, res, next) {
    try {
        const { id, questionId } = req.params;
        const rows = await service.getQuestion(id,questionId);

        res.status(200).json({
            success: true,
            data: rows
        });
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
    getQuestions,
    getQuestion,
    createRow,
    updateRow
};