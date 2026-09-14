const { pool } = require("../config/database");

/**
 * Retrieves student answers joined with question text, reference answers, and maximum scores.
 *
 * @returns {Promise<Array<object>>} Joined answer rows returned by MySQL.
 */
async function findAll() {
    const sql = `
    SELECT
        questions.question_text,
        questions.reference_answer,
        questions.max_score,
        student_answers.*
    FROM questions 
        LEFT JOIN student_answers
            ON questions.id=student_answers.question_id
     ORDER BY questions.sort_order
    `;

    const [rows] = await pool.execute(sql);

    return rows;
}

/**
 * Retrieves the first answer row associated with an attempt ID.
 *
 * @param {number|string} id - Test-attempt identifier.
 * @returns {Promise<object|null>} Matching answer row, or null when not found.
 */
async function findById(id) {
    const sql = `
        SELECT
            questions.question_text,
            questions.reference_answer,
            questions.max_score,
            student_answers.*
        FROM questions 
            LEFT JOIN student_answers
                ON questions.id=student_answers.question_id
        WHERE attempt_id=?
        ORDER BY questions.sort_order
        LIMIT 1
    `;

    const [rows] = await pool.execute(sql, [id]);

    return rows[0] || null;
}

/**
 * Retrieves all answers for a test attempt together with related question data.
 *
 * @param {number|string} attemptId - Test-attempt identifier.
 * @returns {Promise<Array<object>>} Answers for the attempt.
 */
async function getAnswers(attemptId) {
    const sql = `
    SELECT
        questions.question_text,
        questions.reference_answer,
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

/**
 * Retrieves a specific student answer within a specific test attempt.
 *
 * @param {number|string} attemptId - Test-attempt identifier.
 * @param {number|string} answerId - Student-answer identifier.
 * @returns {Promise<object|null>} Matching answer, or null when not found.
 */
async function getAnswersById(attemptId,answerId) {
    console.log('data: '+attemptId+' '+answerId);
    const sql = `
        SELECT
            questions.question_text,
            questions.reference_answer,
            questions.max_score,
            student_answers.*
        FROM questions 
            LEFT JOIN student_answers
                ON questions.id=student_answers.question_id
        WHERE attempt_id=?
          AND student_answers.id=?
        ORDER BY questions.sort_order
        LIMIT 1
    `;

    const [rows] = await pool.execute(sql, [attemptId,answerId]);

    return rows[0] || null;
}

/**
 * Retrieves raw student-answer rows for a test attempt.
 *
 * @param {number|string} attemptId - Test-attempt identifier.
 * @returns {Promise<Array<object>>} Student-answer rows for the attempt.
 */
async function getByAttemptId(attemptId) {

    const sql = `
        SELECT *
        FROM student_answers
        WHERE attempt_id = ?
    `;

    const [rows] = await pool.execute(sql, [attemptId]);

    return rows;
}


/**
 * Stores the score and feedback for a student answer and marks it as evaluated.
 *
 * @param {number|string} answerId - Student-answer identifier.
 * @param {object} grade - Grade data containing at least `score` and `feedback`.
 * @returns {Promise<void>} Resolves after the UPDATE completes.
 */
async function saveGrade(answerId, grade) {

    const sql = `
        UPDATE student_answers
        SET
            score = ?,
            feedback = ?,
            grading_status='evaluated'
        WHERE id = ?
    `;

    await pool.execute(sql, [
        grade.score,
        grade.feedback,
        answerId
    ]);
}

/**
 * Retrieves answer and question metadata required to construct the AI grading request.
 *
 * @param {number|string} attemptId - Test-attempt identifier.
 * @returns {Promise<Array<object>>} Answer text, question text, reference answer, criteria, and maximum score.
 */
async function getAnswersForGrading(attemptId) {

    const sql = `
        SELECT
            sa.id AS answer_id,
            sa.attempt_id,
            sa.question_id,
            sa.answer_text AS student_answer,

            q.question_text,
            q.reference_answer AS expected_answer,
            q.grading_criteria,
            q.max_score

        FROM student_answers sa

        INNER JOIN questions q
            ON q.id = sa.question_id

        WHERE sa.attempt_id = ?

        ORDER BY q.id
    `;

    const [rows] = await pool.execute(sql, [attemptId]);

    return rows;
}

module.exports = {
    findAll,
    findById,
    getAnswers,
    getAnswersById,
    getAnswersForGrading,
    getByAttemptId,
    saveGrade
};