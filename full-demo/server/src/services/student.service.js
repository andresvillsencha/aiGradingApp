const repo = require("../repositories/student.repository");

/**
 * Returns all students from the repository.
 *
 * @returns {Promise<Array<object>>} List of students.
 */
async function getAll() {
    return repo.findAll();
}

/**
 * Returns one student by ID and raises a 404-style error when it does not exist.
 *
 * @param {number|string} id - Student identifier.
 * @returns {Promise<object>} Student record.
 */
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