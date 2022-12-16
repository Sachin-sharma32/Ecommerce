const express = require("express");
const {
    deleteRating,
    getRating,
    getAllRatings,
    createRating,
} = require("../controllers/ratingController");

const {
    verifyToken,
    verifyAdmin,
    verifyUser,
} = require("../controllers/authController.js");

const router = express.Router();

router
    .route("/:id")
    .delete(verifyAdmin, deleteRating)
    .get(verifyToken, getRating);
router
    .route("/")
    .post(verifyToken, createRating)
    .get(verifyToken, getAllRatings);

module.exports = router;
