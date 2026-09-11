const repo = require("../repositories/student.repository");

async function getAll() {
    return repo.findAll();
}

async function getById(id) {
    const row = await repo.findById(id);

    if (!row) {
        const error = new Error(`Record with ID ${id} was not found`);
        error.statusCode = 404;
        throw error;
    }

    return row;
}

module.exports = {
    getAll,
    getById
};