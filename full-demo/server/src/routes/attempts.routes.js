// Define HTTP endpoints for test attempts, answers, and AI grading.

const express = require("express");

const controller = require(
    "../controllers/attempts.controller"
);
const validateId = require("../middleware/validateId");

const router = express.Router();

router.get("/", controller.getAll);

router.get(
    "/:id",
    validateId("id"),
    controller.getById
);

router.get(
    "/:id/answers",
    validateId("id"),
    controller.getAnswers
);

router.get(
    "/:id/answers/:answerId",
    validateId("id"),
    validateId("answerId"),
    controller.getAnswersById
);

// Grade the test attempt
router.post(
    "/:attempt_id/grade",
    validateId("attempt_id"),
    controller.grade
);

module.exports = router;