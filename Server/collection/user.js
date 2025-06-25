const User = require("../models/user");
const jwt = require("jsonwebtoken");

async function handelUserSignUp(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    await User.create({ name, email, password });

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function handelUserLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log("Generated Token:", token); // <== ADD THIS


    return res.status(200).json({
      message: "Login successful",
      success: true,
      token,
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}


module.exports = {
  handelUserSignUp,
  handelUserLogin,
};
