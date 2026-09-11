const { pool } = require("../config/database");

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