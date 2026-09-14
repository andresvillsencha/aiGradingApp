const { pool } = require("../config/database");

/**
 * Returns all questions for the supplied test by delegating to `getQuestions`.
 *
 * @param {number|string} id - Test identifier.
 * @returns {Promise<Array<object>>} Questions belonging to the test.
 */
async function findAll(id) {
    return getQuestions(id);
}

/**
 * Returns one question for a test by delegating to `getQuestion`.
 *
 * @param {number|string} testId - Test identifier.
 * @param {number|string} qId - Question identifier.
 * @returns {Promise<Array<object>>} Matching question rows.
 */
async function findById(testId,qId) {
    return getQuestion(testId,qId);
}

/**
 * Retrieves a question directly by its question ID.
 *
 * @param {number|string} id - Question identifier.
 * @returns {Promise<object|undefined>} Matching question row, if found.
 */
async function getById(id) {
    const sql = `
        SELECT *
        FROM questions
        WHERE id = ?
    `;
    const [rows] = await db.execute(sql, [id]);

    return rows[0];
}

/**
 * Retrieves all questions for a test ordered by their configured sort order.
 *
 * @param {number|string} testId - Test identifier.
 * @returns {Promise<Array<object>>} Questions belonging to the test.
 */
async function getQuestions(testId) {
    const sql = `
        SELECT
            *
        FROM questions 
        WHERE test_id = ?
        ORDER BY sort_order
    `;

    const [rows] = await pool.execute(sql, [testId]);
    return rows;
}

/**
 * Retrieves a specific question that belongs to a specific test.
 *
 * @param {number|string} testId - Test identifier.
 * @param {number|string} qId - Question identifier.
 * @returns {Promise<Array<object>>} Matching question rows.
 */
async function getQuestion(testId,qId) {
    const sql = `
        SELECT
            *
        FROM questions 
        WHERE test_id = ?
          AND id = ?
        ORDER BY sort_order
        LIMIT 1
    `;

    const [rows] = await pool.execute(sql, [testId,qId]);

    return rows;
}


module.exports = {
    findAll,
    getQuestions,
    getQuestion,
    findById,
    getById
};