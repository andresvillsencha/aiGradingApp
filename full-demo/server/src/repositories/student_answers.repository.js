const { pool } = require("../config/database");

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

async function getByAttemptId(attemptId) {

    const sql = `
        SELECT *
        FROM student_answers
        WHERE attempt_id = ?
    `;

    const [rows] = await pool.execute(sql, [attemptId]);

    return rows;
}


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