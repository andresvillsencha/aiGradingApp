const repo = require("../repositories/attempts.repository");
const repoA = require("../repositories/student_answers.repository");

const gradingService = require("./grading.service");

async function getAll() {
    return repo.findAll();
}

async function getById(id) {
    const row = await repo.findById(id);

    if (!row) {
        const error = new Error(`Record with ID ${id} was not found`);
        error.statusCode = 404;
        throw error;
    }

    return row;
}

async function getAnswers(attemptId) {
    return repoA.getAnswers(attemptId);
}

async function getAnswersById(attemptId,answerId) {    
    const row = await repoA.getAnswersById(attemptId,answerId);

    if (!row) {
        const error = new Error(`Record with ID ${answerId} was not found`);
        error.statusCode = 404;
        throw error;
    }

    return row;
}

/**
 * 
 * @param {*} attemptId 
 * @returns 
 */
async function grade(attemptId) {
    const attempt = await repo.findById(attemptId);

    if (!attempt) {
        const error = new Error("Test attempt not found");
        error.status = 404;
        throw error;
    }

    return await gradingService.gradeAttempt(attempt);
}

module.exports = {
    getAll,
    getById,
    getAnswers,
    getAnswersById,
    grade
};