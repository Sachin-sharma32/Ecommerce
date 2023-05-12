const express = require("express");
const { verifyAdmin, verifyToken } = require("../controllers/authController");
const {
  updateCollection,
  deleteCollection,
  getCollection,
  createCollection,
  getAllCollections,
} = require("../controllers/collectionController");

const router = express.Router();

router.route("/:id").delete(verifyAdmin, deleteCollection);
router.route("/").post(verifyAdmin, createCollection).get(getAllCollections);

module.exports = router;
