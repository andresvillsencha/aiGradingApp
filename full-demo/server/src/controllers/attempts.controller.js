const service = require("../services/attempts.service");

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
 * Grade the attempt
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
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