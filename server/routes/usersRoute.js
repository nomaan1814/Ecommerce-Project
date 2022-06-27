const express = require("express");

const {
  authController,
  getUserProfile,
  registerUser,
  updateUserProfile,
} = require("../controllers/usersController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", authController);
router.route("/profile").get(protect, getUserProfile).put(protect,updateUserProfile);
router.route("/signup").post( registerUser);

module.exports = router;
