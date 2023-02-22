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

router.route("/:id").delete(deleteRating).get(getRating);
router.route("/").post(createRating).get(getAllRatings);

module.exports = router;
