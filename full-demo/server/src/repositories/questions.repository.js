const { pool } = require("../config/database");

async function findAll(id) {
    return getQuestions(id);
}

async function findById(testId,qId) {
    return getQuestion(testId,qId);
}

async function getById(id) {
    const sql = `
        SELECT *
        FROM questions
        WHERE id = ?
    `;
    const [rows] = await db.execute(sql, [id]);

    return rows[0];
}

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