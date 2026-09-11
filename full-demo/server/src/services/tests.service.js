const repo = require("../repositories/tests.repository");
const repoQ = require("../repositories/questions.repository");

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

async function getQuestions(testId) {
    return repoQ.getQuestions(testId);
}

async function getQuestion(testId,qId) {    
    const row = await repoQ.getQuestion(testId,qId);

    if (!row) {
        const error = new Error(`Record with ID ${id} was not found`);
        error.statusCode = 404;
        throw error;
    }

    return row;
}

module.exports = {
    getAll,
    getById,
    getQuestions,
    getQuestion
};