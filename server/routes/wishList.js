const express = require("express");
const { verifyToken } = require("../controllers/authController");
const router = express.Router();
const {
    createWishList,
    getWishList,
    addToWishList,
    removeFromWishList,
} = require("../controllers/wishListController");

router.route("/").post(createWishList);
router.route("/:userId").get(verifyToken, getWishList);
router.route("/addToWishList/:wishListId").patch(verifyToken, addToWishList);
router
    .route("/removeFromWishList/:wishListId")
    .patch(verifyToken, removeFromWishList);

module.exports = router;
