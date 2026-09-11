const { pool } = require("../config/database");

async function findAll() {
    const sql = `
        SELECT
            test_attempts.*,
            tests.title,
            students.full_name
        FROM test_attempts 
            LEFT JOIN tests
                ON test_attempts.test_id=tests.id
            LEFT JOIN students
                ON test_attempts.student_id=students.id
        ORDER BY id
    `;

    const [rows] = await pool.execute(sql);

    return rows;
}

async function findById(id) {
    const sql = `
        SELECT
            test_attempts.*,
            tests.title,
            students.full_name
        FROM test_attempts 
            LEFT JOIN tests
                ON test_attempts.test_id=tests.id
            LEFT JOIN students
                ON test_attempts.student_id=students.id
        WHERE test_attempts.id = ?
        ORDER BY id
        LIMIT 1
    `;

    const [rows] = await pool.execute(sql, [id]);

    return rows[0] || null;
}

async function saveGrade(attemptId, evaluation) {

    const sql = `
        UPDATE test_attempts
        SET
            score = ?,
            max_score = ?,
            percentage = ?,
            status = 'graded',
            passed = ?
        WHERE id = ?
    `;

    console.log('Saving: ');
    console.log(evaluation);

    await pool.execute(sql, [
        evaluation.score,
        evaluation.maxScore,
        evaluation.percentage,
        evaluation.passed,
        attemptId
    ]);
}

module.exports = {
    findAll,
    findById,
    saveGrade
};