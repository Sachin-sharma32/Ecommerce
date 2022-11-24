const express = require("express");
const {
    verifyToken,
    verifyAdmin,
    verifyUser,
} = require("../controllers/authController");
const {
    updateUser,
    deleteUser,
    getAllUsers,
    getMe,
} = require("../controllers/userController");

const router = express.Router();

router
    .route("/:id")
    .patch(verifyUser, updateUser) //* use "userImage" in filed to upload
    .delete(verifyUser, deleteUser);
router.route("/").get(verifyAdmin, getAllUsers);
router.route("/getMe").get(getMe);

module.exports = router;
