const express = require("express");
const {
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProducts,
    createProduct,
} = require("../controllers/productController");

const {
    verifyToken,
    verifyAdmin,
    verifyUser,
} = require("../controllers/authController.js");

const router = express.Router();

router
    .route("/:id")
    .patch(verifyAdmin, updateProduct)
    .delete(verifyAdmin, deleteProduct)
    .get(getProduct);
router
    .route("/")
    .get(getAllProducts)
    .post(verifyAdmin, createProduct);

module.exports = router;
