const express = require("express");
const aiService = require("../services/ai.service");
const validateId = require("../config/validateId");

const router = express.Router();

router.get("/attempts/", aiService.getAllTests);

router.get(
    "/attempts/:attempt_id",
    validateId("attempt_id"),
    aiService.getTest
);

// Grades the test
router.post(
    "/attempts/:attempt_id/grade",
    validateId("attempt_id"),
    aiService.gradeTest
);

module.exports = router;