const repo = require("../repositories/attempts.repository");
const repoA = require("../repositories/student_answers.repository");

const gradingService = require("./grading.service");

/**
 * Returns all test attempts from the repository.
 *
 * @returns {Promise<Array<object>>} List of test attempts.
 */
async function getAll() {
    return repo.findAll();
}

/**
 * Returns one test attempt by ID and raises a 404-style error when it does not exist.
 *
 * @param {number|string} id - Test-attempt identifier.
 * @returns {Promise<object>} Test-attempt record.
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
 * Returns all student answers associated with a test attempt.
 *
 * @param {number|string} attemptId - Test-attempt identifier.
 * @returns {Promise<Array<object>>} Answers for the attempt.
 */
async function getAnswers(attemptId) {
    return repoA.getAnswers(attemptId);
}

/**
 * Returns one answer belonging to a specific test attempt.
 *
 * @param {number|string} attemptId - Test-attempt identifier.
 * @param {number|string} answerId - Student-answer identifier.
 * @returns {Promise<object>} Requested answer record.
 */
async function getAnswersById(attemptId,answerId) {    
    const row = await repoA.getAnswersById(attemptId,answerId);

    if (!row) {
        const error = new Error(`Record with ID ${answerId} was not found`);
        error.statusCode = 404;
        throw error;
    }

    return row;
}

/**
 * Loads a test attempt and delegates the complete grading workflow to the grading service.
 *
 * @param {number|string} attemptId - Test-attempt identifier to grade.
 * @returns {Promise<object>} Final grading result for the attempt.
 */
async function grade(attemptId) {
    const attempt = await repo.findById(attemptId);

    if (!attempt) {
        const error = new Error("Test attempt not found");
        error.status = 404;
        throw error;
    }

    return await gradingService.gradeAttempt(attempt);
}

module.exports = {
    getAll,
    getById,
    getAnswers,
    getAnswersById,
    grade
};