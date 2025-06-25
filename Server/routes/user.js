// routes/user.js
const express = require("express");
const {handelUserSignUp, handelUserLogin} = require("../collection/user");
const authenticateUser = require("../middleware/authMiddleware");
const User = require("../models/user");

const router = express.Router();

router.post("/signup", handelUserSignUp);
router.post("/login", handelUserLogin);

// 👇 Auth-protected route
router.post("/get-user-info", authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User info fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user info",
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
