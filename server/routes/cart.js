const express = require("express");
const router = express.Router();
const {
    createCart,
    getCart,
    addToCart,
    removeFromCart
} = require("../controllers/cartController");

router.route("/").post(createCart);
router.route("/:userId").get(getCart);
router.route("/addToCart/:cartId").patch(addToCart);
router.route("/removeFromCart/:cartId").patch(removeFromCart);

module.exports = router;
