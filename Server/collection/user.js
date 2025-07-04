const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// This module handles user signup, login, and fetching user info.
async function handelUserSignUp(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const existingUserName = await User.findOne({ name });
    if (existingUserName) {
      return res.status(409).json({ message: "User Name already Taken" });
    }
    if( !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format" }); 
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await User.create({ name, email, password: hashedPassword });

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}


// This module handles user login and returns a JWT token.
async function handelUserLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) { 
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({  userId: user._id, name: user.name, role: user.role  }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "Login successful",
      success: true,
      token,
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// This module fetches user information I have Not used that WE Can Use That when we use Reduz  .
async function getUserInfo(req, res) {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.status(200).json(user);
  } catch (err) {
    console.error("Fetch User Info Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}



module.exports = {
  handelUserSignUp,
  handelUserLogin,
  getUserInfo
  };
