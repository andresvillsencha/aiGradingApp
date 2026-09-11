const { pool } = require("../config/database");

async function getAllTests() {
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

async function getTest(attemptId) {
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
        WHERE test_attempts.id=?
        ORDER BY id
    `;

    const [rows] = await pool.execute(sql, [attemptId]);

    return rows;
}

async function getAnswers(attemptId) {
    const sql = `
    SELECT
        questions.question_text,
        questions.reference_answer,
        questions.grading_criteria,
        questions.max_score,
        student_answers.*
    FROM questions 
        LEFT JOIN student_answers
            ON questions.id=student_answers.question_id
    WHERE attempt_id=?
     ORDER BY questions.sort_order
    `;

    const [rows] = await pool.execute(sql, [attemptId]);

    return rows;
}



module.exports = {
    getAllTests,
    getTest,
    getAnswers
};