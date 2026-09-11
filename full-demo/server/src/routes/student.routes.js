
const express = require("express");

const controller = require(
    "../controllers/student.controller"
);
const validateId = require("../middleware/validateId");

const router = express.Router();

router.get("/", controller.getAll);

router.get(
    "/:id",
    validateId("id"),
    controller.getById
);

module.exports = router;