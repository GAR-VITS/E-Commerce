const User = require("../model/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token.js");
const { sendMail } = require("../utils/mailService.js");
const { generateOTP } = require("../utils/otpGeneration.js");

async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    const userData = await User.findOne({ email }).select("-password");
    if (userData)
      return res.status(400).json({ message: "Email Already In Use" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const otp = await generateOTP(newUser);
      return res.status(201).json({
        email: newUser.email,
      });
    } else {
      return res.status(400).json({ error: `Invalid Error` });
    }
  } catch (error) {
    console.log("User Registration Error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });
    if (!userData)
      return res.status(400).json({ message: "Invalid Email or Password" });
    const isPasswordMatch = await bcrypt.compare(password, userData.password);
    if (!isPasswordMatch)
      return res.status(400).json({ message: "Invalid Email or Password" });
    if (userData.isVerified === false) {
      return res.status(403).json({
        message: "Please verify your email to access your account.",
        isVerified: false,
        email: userData.email,
      });
    }
    const token = await generateToken(userData);
    res.cookie("user", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      id: userData._id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
    });
  } catch (error) {
    console.log("User Login Error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find({}).select("-password");
    return res.status(200).json(users);
  } catch (error) {
    console.log("Get All Users Error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function logout(req, res) {
  try {
    res.clearCookie("user");
    return res
      .status(200)
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.log("Logout Error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { registerUser, loginUser, getAllUsers, logout };
