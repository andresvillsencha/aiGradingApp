const { pool } = require("../config/database");

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