const express = require("express");
const {
    verifyAdmin,
    verifyUser,
    verifyToken,
} = require("../controllers/authController");
const {
    updateOrder,
    deleteOrder,
    getOrder,
    createOrder,
    getAllOrders,
    orderStats,
} = require("../controllers/orderController");

const router = express.Router();

router
    .route("/:id")
    .patch(verifyUser, updateOrder)
    .delete(verifyUser, deleteOrder);
router.route("/get/:userId").get(verifyToken, getOrder);
router.route("/").post(verifyToken, createOrder).get(verifyToken, getAllOrders);

module.exports = router;
