const { pool } = require("../config/database");

/**
 * Retrieves all tests together with the number of questions in each test.
 *
 * @returns {Promise<Array<object>>} Test rows returned by MySQL.
 */
async function findAll() {
    const sql = `
        SELECT
            t.id,
            t.title,
            t.description,
            t.passing_score,
            t.status,
            q.question_count
        FROM tests t
        LEFT JOIN (SELECT test_id, COUNT(id) AS question_count from questions GROUP BY test_id) q
            ON q.test_id = t.id
        ORDER BY t.id
    `;

    const [rows] = await pool.execute(sql);

    return rows;
}

/**
 * Retrieves one test and its question count by ID.
 *
 * @param {number|string} id - Test identifier.
 * @returns {Promise<object|null>} Matching test, or null when not found.
 */
async function findById(id) {
    const sql = `
        SELECT
            t.id,
            t.title,
            t.description,
            t.passing_score,
            t.status,
            q.question_count
        FROM tests t
        LEFT JOIN (SELECT test_id, COUNT(id) AS question_count from questions GROUP BY test_id) q
            ON q.test_id = t.id
        WHERE t.id = ?
        GROUP BY
            t.id,
            t.title,
            t.description
        LIMIT 1
    `;

    const [rows] = await pool.execute(sql, [id]);

    return rows[0] || null;
}

module.exports = {
    findAll,
    findById
};