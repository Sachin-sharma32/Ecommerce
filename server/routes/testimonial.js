const { verifyToken } = require("../controllers/authController");
const { createTestimonial, getAllTestimonials } = require("../controllers/testimonialController");

const router = require("express").Router();

router.route("/").get(getAllTestimonials).post(createTestimonial);

module.exports = router;
