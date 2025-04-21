import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";

export const register = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all fields" });
  }
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await mongoose.models.user.create({
      email,
      password: hashPassword,
      name,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to FastFoods",
      text: `Hello ${name},\n\nThank you for registering with us!\n\nBest regards,\nYour Company`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all fields" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 0,
    });
    return res
      .status(200)
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out user:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    if (user.isAccountVerified) {
      return res.status(400).json({
        success: false,
        message: "Your account is already verified",
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.verifyOtp = otp;
    user.verifyOtpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Verify your account",
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all fields" });
  }
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    if (user.verifyOtpExpire < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }
    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpire = 0;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Account verified successfully",
    });
  } catch (error) {}
};
