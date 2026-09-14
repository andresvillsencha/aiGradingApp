// Define HTTP endpoints for tests and their questions.

const express = require("express");

const controller = require(
    "../controllers/tests.controller"
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
    "/:id/questions",
    validateId("id"),
    controller.getQuestions
);

router.get(
    "/:id/questions/:questionId",
    validateId("id"),
    validateId("questionId"),
    controller.getQuestion
);

module.exports = router;