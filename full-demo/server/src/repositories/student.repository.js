const { pool } = require("../config/database");

/**
 * Retrieves all students ordered by ID.
 *
 * @returns {Promise<Array<object>>} Student rows returned by MySQL.
 */
async function findAll() {
    const sql = `
        SELECT
            *
        FROM students
        ORDER BY id ASC
    `;

    const [rows] = await pool.execute(sql);

    return rows;
}

/**
 * Retrieves one student by ID.
 *
 * @param {number|string} id - Student identifier.
 * @returns {Promise<object|null>} Matching student, or null when not found.
 */
async function findById(id) {
    const sql = `
        SELECT
            *
        FROM students
        WHERE id = ?
        LIMIT 1
    `;

    const [rows] = await pool.execute(sql, [id]);

    return rows[0] || null;
}

module.exports = {
    findAll,
    findById
};