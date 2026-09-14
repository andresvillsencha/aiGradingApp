const testAttemptsRepository = require("../repositories/attempts.repository");
const studentAnswersRepository = require("../repositories/student_answers.repository");
const questionsRepository = require("../repositories/questions.repository");
const aiGradingService = require("./aiGrading.service");

/**
 * Coordinates the grading workflow: loads answers, builds the AI request, calculates totals, and persists the grades.
 *
 * @param {object} attempt - Test-attempt record containing at least `id` and `test_id`.
 * @returns {Promise<object>} Overall score, percentage, pass status, and per-answer grades.
 */
async function gradeAttempt(attempt) {

    console.log('Reading Answers');
    // Let's get the answers
        const answers = await studentAnswersRepository.getAnswersForGrading(attempt.id);

        // Check for available answers
        if (!answers || answers.length === 0) {
            const error = new Error(
                "No answers found for this attempt"
            );

            error.status = 400;
            throw error;
        }

    // Create Request
        console.log('Creating request');
        const gradingRequest = {
            attempt_id: attempt.id,
            test_id: attempt.test_id,

            questions: answers.map(answer => ({
                answer_id: answer.answer_id,
                question_id: answer.question_id,

                question_text: answer.question_text,
                reference_answer: answer.expected_answer,
                grading_criteria: answer.grading_criteria,

                max_score: Number(answer.max_score),

                student_answer: answer.student_answer
            }))
        };

    // Create Result
        console.log('Connecting to open AI');
        const aiResult = await aiGradingService.gradeTest( gradingRequest );
        console.log('Got response');
        console.log(aiResult);

        // Manually calculate grade
            const gradedAnswers = aiResult.result.answers;

            const score = gradedAnswers.reduce(
                (total, answer) => total + Number(answer.score),
                0
            );

            const maxScore = answers.reduce(
                (total, answer) => total + Number(answer.max_score),
                0
            );

            const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
            const passed = percentage >= 70;
            const gradingResult = {
                attempt_id: attempt.id,
                score: score,
                max_score: maxScore,
                percentage: Math.round(percentage * 100) / 100,
                passed: passed,
                answers: gradedAnswers
            };

        // Save Result
            console.log('Saving grades per answer');
            for (const grade of gradedAnswers) {
                await studentAnswersRepository.saveGrade(
                    grade.answer_id,
                    {
                        score: grade.score,
                        percentage: grade.percentage,

                        feedback: grade.feedback,
                        strengths: grade.strengths,
                        weaknesses: grade.weaknesses,

                        confidence: grade.confidence,

                        grading_status: "graded",

                        ai_response: aiResult.aiResponse
                    }
                );
            }
            console.log('Saving the test grade');
            await testAttemptsRepository.saveGrade(
                attempt.id,
                {
                    score,
                    maxScore,
                    percentage,
                    passed,
                    status: "graded"
                }
            );

            console.log('=======RESPONSE=======');
            console.log(gradingResult);

    return gradingResult;
}

module.exports = {
    gradeAttempt
};
