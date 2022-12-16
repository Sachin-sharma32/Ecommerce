const express = require("express");
const { verifyToken } = require("../controllers/authController");
const router = express.Router();
const {
    createCart,
    getCart,
    addToCart,
    removeFromCart
} = require("../controllers/cartController");

router.route("/").post(createCart);
router.route("/:userId").get(verifyToken, getCart);
router.route("/addToCart/:cartId").patch(verifyToken, addToCart);
router.route("/removeFromCart/:cartId").patch(verifyToken, removeFromCart);

module.exports = router;
