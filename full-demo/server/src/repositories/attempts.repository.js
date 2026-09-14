const { pool } = require("../config/database");

/**
 * Retrieves all test attempts with the related test title and student name.
 *
 * @returns {Promise<Array<object>>} Rows returned by MySQL.
 */
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

/**
 * Retrieves one test attempt with its related test and student data.
 *
 * @param {number|string} id - Test-attempt identifier.
 * @returns {Promise<object|null>} Matching attempt, or null when not found.
 */
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

/**
 * Persists the final grade and status for a test attempt.
 *
 * @param {number|string} attemptId - Test-attempt identifier.
 * @param {object} evaluation - Calculated score, maximum score, percentage, and pass status.
 * @returns {Promise<void>} Resolves after the UPDATE completes.
 */
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