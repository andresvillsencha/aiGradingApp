const repo = require("../repositories/tests.repository");
const repoQ = require("../repositories/questions.repository");

/**
 * Returns all tests from the repository.
 *
 * @returns {Promise<Array<object>>} List of tests.
 */
async function getAll() {
    return repo.findAll();
}

/**
 * Returns one test by ID and raises a 404-style error when it does not exist.
 *
 * @param {number|string} id - Test identifier.
 * @returns {Promise<object>} Test record.
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

/**
 * Returns all questions associated with a test.
 *
 * @param {number|string} testId - Test identifier.
 * @returns {Promise<Array<object>>} Questions belonging to the test.
 */
async function getQuestions(testId) {
    return repoQ.getQuestions(testId);
}

/**
 * Returns a specific question for a test and raises a 404-style error when no matching record is found.
 *
 * @param {number|string} testId - Test identifier.
 * @param {number|string} qId - Question identifier.
 * @returns {Promise<object>} Requested question record.
 */
async function getQuestion(testId,qId) {    
    const row = await repoQ.getQuestion(testId,qId);

    if (!row) {
        const error = new Error(`Record with ID ${id} was not found`);
        error.statusCode = 404;
        throw error;
    }

    return row;
}

module.exports = {
    getAll,
    getById,
    getQuestions,
    getQuestion
};