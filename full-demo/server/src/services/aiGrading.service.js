const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function gradeTest(gradingRequest) {

    const response = await openai.responses.create({

        model: process.env.OPENAI_MODEL || "gpt-5.6-sol",

        instructions: `
You are an expert technical instructor grading a test.

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
Return only the requested structured result.
        `,

        input: [
            {
                role: "user",

                content: [
                    {
                        type: "input_text",

                        text:
                            "Grade the following test attempt:\n\n" +
                            JSON.stringify(
                                gradingRequest,
                                null,
                                2
                            )
                    }
                ]
            }
        ],

        text: {
            format: {

                type: "json_schema",

                name: "test_grading_result",

                strict: true,

                schema: {

                    type: "object",

                    properties: {

                        attempt_id: {
                            type: "integer"
                        },

                        score: {
                            type: "number"
                        },

                        max_score: {
                            type: "number"
                        },

                        percentage: {
                            type: "number"
                        },

                        passed: {
                            type: "boolean"
                        },

                        answers: {

                            type: "array",

                            items: {

                                type: "object",

                                properties: {

                                    answer_id: {
                                        type: "integer"
                                    },

                                    question_id: {
                                        type: "integer"
                                    },

                                    score: {
                                        type: "number"
                                    },

                                    max_score: {
                                        type: "number"
                                    },

                                    percentage: {
                                        type: "number"
                                    },

                                    feedback: {
                                        type: "string"
                                    },

                                    strengths: {
                                        type: "string"
                                    },

                                    weaknesses: {
                                        type: "string"
                                    },

                                    confidence: {
                                        type: "number"
                                    }
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
    gradeTest
};