const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// @desc    Register users
// @route   POST /api/auth/register
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("Email already in use");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password:hashedPassword });
    res.status(201).json({
        success: true,
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
        message:"User created successfully!"
    });
});

// @desc    Login user
// @route   POST /api/auth/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }


  // Generate JWT
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || "secret123",
    { expiresIn: process.env.JWT_EXPIRE || "1d" }
  );

  // Send response
  res.status(200).json({
    success: true,
    token,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    message:"User Logged In"
  });
});

module.exports = {
    registerUser,
    loginUser,
};
