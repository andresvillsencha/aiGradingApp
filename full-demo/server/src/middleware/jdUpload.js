// middleware/jdUpload.js

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    /**
     * Selects the directory where uploaded job-description files are stored.
     *
     * @param {import("express").Request} req - Express request object.
     * @param {Express.Multer.File} file - File being processed by Multer.
     * @param {Function} cb - Multer callback that receives the destination path.
     * @returns {void} Calls the Multer callback with the destination.
     */
    destination: function (req, file, cb) {
        cb(null, "files/jd/");
    },

    /**
     * Generates a unique stored filename while preserving the original file extension.
     *
     * @param {import("express").Request} req - Express request object.
     * @param {Express.Multer.File} file - File being processed by Multer.
     * @param {Function} cb - Multer callback that receives the generated filename.
     * @returns {void} Calls the Multer callback with the generated name.
     */
    filename: function (req, file, cb) {
        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1E9);

        cb(
            null,
            uniqueName + path.extname(file.originalname)
        );
    }
});

/**
 * Restricts job-description uploads to PDF files.
 *
 * @param {import("express").Request} req - Express request object.
 * @param {Express.Multer.File} file - Uploaded file to validate.
 * @param {Function} cb - Multer callback used to accept or reject the file.
 * @returns {void} Calls the Multer callback with the validation result.
 */
const fileFilter = function (req, file, cb) {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed"));
    }
};

const jdUpload = multer({
    storage,
    fileFilter
});

module.exports = jdUpload;