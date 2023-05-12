const express = require("express");
const {
  verifyAdmin,
  verifyUser,
  verifyToken,
} = require("../controllers/authController");
const {
  updateCategory,
  deleteCategory,
  getCategory,
  createCategory,
  getAllCategories,
  orderStats,
} = require("../controllers/categoryController");

const router = express.Router();

router.route("/:id").delete(verifyAdmin, deleteCategory);
router.route("/").post(verifyAdmin, createCategory).get(getAllCategories);

module.exports = router;
