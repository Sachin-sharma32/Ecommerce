const express = require("express");
const { verifyAdmin, verifyUser } = require("../controllers/authController");
const {
    updateOrder,
    deleteOrder,
    getOrder,
    createOrder,
    getAllOrders,
} = require("../controllers/orderController");

const router = express.Router();

router
    .route("/:id")
    .patch(verifyUser, updateOrder)
    .delete(verifyUser, deleteOrder);
router.route("/get/:userId").get(verifyUser, getOrder);
router.route("/").post(createOrder).get(verifyAdmin, getAllOrders);

module.exports = router;
