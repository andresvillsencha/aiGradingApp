const OpenAI = require("openai");
const dataRepo = require("../repo/data.repo");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function getAllTests(req, res, next) {
    try {
        const rows = await dataRepo.getAllTests();

        res.status(200).json({
            success: true,
            count: rows.length,
            data: rows
        });
    } catch (error) {
        next(error);
    }
}

async function getTest(req, res, next) {
    try {
        console.log("Get Test");
        const attemptId = req.params.attempt_id;
        console.log("Get Attempt Id: "+attemptId);
        const rows = await dataRepo.getTest(attemptId);

        res.status(200).json({
            success: true,
            count: rows.length,
            data: rows
        });
    } catch (error) {
        next(error);
    }
}

async function gradeTest(req, res, next) {
    console.log('Start Grading Service');
    try {
        const attemptId = req.params.attempt_id;

        const result = await performGrade(attemptId);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

async function performGrade(idAttempt) {
    // STEP 1: Get attempt, and  questions + answers
        const attempt = await dataRepo.getTest(idAttempt);
        const answers = await dataRepo.getAnswers(idAttempt);

    // STEP 2: Prepare grading object
        const request = {
            attempt_id: attempt.id,
            test_id: attempt.test_id,

            questions: answers.map(answer => ({
                answer_id: answer.id,
                question_id: answer.question_id,

                question_text: answer.question_text,
                reference_answer: answer.reference_answer,
                grading_criteria: answer.grading_criteria,

                max_score: Number(answer.max_score),

                student_answer: answer.answer_text
            }))
        };

        console.log("==request==");
        console.log(request);
        console.log("===========");

    // STEP 3: Let's create the AI Connection
        const aiResult = await aiGrade(request);

    // STEP 4: Let's calculate totals
        const gradedAnswers = aiResult.result.answers;
        const score = gradedAnswers.reduce( (total, answer) => total + Number(answer.score), 0 );
        const maxScore = answers.reduce( (total, answer) => total + Number(answer.max_score), 0 );
        const gradingResult = {
            attempt_id: attempt.id,
            score: score,
            max_score: maxScore,
            percentage: maxScore > 0 ? (score / maxScore) * 100 : 0,
            passed: score >= maxScore * 0.7,
            answers: gradedAnswers
        };

    // STEP 5: Return result
        return gradingResult;
}

async function aiGrade(gradingRequest) {
    const response = await openai.responses.create({
        model: process.env.OPENAI_MODEL || "gpt-5.6-sol",
        instructions: 
            `You are an expert technical instructor grading a test.

            Grade each student's answer independently.

            Use only:
            - the question
            - the reference answer
            - the grading criteria
            - the student's answer

            Do not assume knowledge that is not present in the student's answer.
            Award partial credit when appropriate.
            The score for each answer must be between 0 and max_score.
            Good answers, even if lacking detail should be 7 or above.
            A grade of 7 is a passing grade, make sure to grade accordingly.
            The percentage for each answer must be between 0 and 100.
            Confidence must be a number between 0 and 1.
            Strengths should briefly explain what the student did well.
            Weaknesses should briefly explain what was missing, incorrect, or unclear.
            Feedback should be concise and useful to the student.
            Calculate the total score by adding the individual question scores.
            Calculate the overall percentage using:
            (total score / total maximum score) * 100
            Return only the requested structured result.`,

        input: [{
            role: "user",
            content: [{
                type: "input_text",
                text: "Grade the following test attempt:\n\n" + JSON.stringify(gradingRequest, null, 2)
            }]
        }],
        text: {
            format: {
                type: "json_schema",
                name: "test_grading_result",
                strict: true,
                schema: {
                    type: "object",
                    properties: {
                        attempt_id: {type: "integer"},
                        score: {type: "number"},
                        max_score: {type: "number"},
                        percentage: {type: "number"},
                        passed: {type: "boolean"},
                        answers: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    answer_id: {type: "integer"},
                                    question_id: {type: "integer"},
                                    score: {type: "number"},
                                    max_score: {type: "number"},
                                    percentage: {type: "number"},
                                    feedback: {type: "string"},
                                    strengths: {type: "string"},
                                    weaknesses: {type: "string"},
                                    confidence: {type: "number"}
                                },
                                required: [
                                    "answer_id",
                                    "question_id",
                                    "score",
                                    "max_score",
                                    "percentage",
                                    "feedback",
                                    "strengths",
                                    "weaknesses",
                                    "confidence"
                                ],
                                additionalProperties: false
                            }
                        }
                    },
                    required: [
                        "attempt_id",
                        "score",
                        "max_score",
                        "percentage",
                        "passed",
                        "answers"
                    ],
                    additionalProperties: false
                }
            }
        }
    });

    const result = JSON.parse(
        response.output_text
    );

    return {
        result,
        aiResponse: response
    };
}









module.exports = {
    getAllTests,
    getTest,
    gradeTest
};