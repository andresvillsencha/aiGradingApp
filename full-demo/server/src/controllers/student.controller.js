const service = require("../services/student.service");

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
            data: rows
        });
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
    updateRow
};