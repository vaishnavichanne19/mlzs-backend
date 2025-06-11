import { Authentication } from "../../Module/AuthModule/AuthModule.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import AuthMiddleware from "./AuthMiddleware.js";
import sendEmail from "./SendEmail.js";
import dotenv from "dotenv";
import IsAuthenticated from "./IsAuthenticated.js";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

// REGISTER
export const Registration = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    await Authentication.create({ username, email, password: hashed });
    res.json({ message: "Registered" });
  } catch {
    res.status(400).json({ error: "User exists or invalid input" });
  }
};

// LOGIN
export const Login = async (req, res) => {
 const { email, password } = req.body;
  const user = await Authentication.findOne({ email });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
  res.cookie("token", token, { httpOnly: true, maxAge: 86400000, sameSite: "Lax", secure: false});
   // Set user ID in session
    req.session.userId = user._id;

  res.json({ success: true, message: "Logged in", token, user: { id: user._id, email: user.email } });
};

//Login Status
export const LoginStatus = [AuthMiddleware, async(req, res) => {
    const user = await Authentication.findById(req.userId).select("-password");
  res.json({user, message: "Welcome to Admin Panel"});
}];

//Protected Login
export const ProtectedLogin = [IsAuthenticated, (req, res) => {
  res.json({ success: true, message: "You are logged in", userId: req.session.userId });
}];

// LOGOUT
export const LogOut = async (req, res) => {
   req.session.destroy((err) => {
    if (err) return res.status(500).json({ success: false, message: "Logout failed" });
    res.clearCookie("connect.sid");
    res.clearCookie("token"); 
    res.json({ success: true, message: "Logged out" });
  });
};


// Forgot password
export const Forgot = async (req, res) => {
  const { email } = req.body;
  const user = await Authentication.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const token = crypto.randomBytes(32).toString("hex");
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
  await user.save();

  const link = "https://mlzsvaishnavi.cyberathon.com/reset-password/${token}";
  await sendEmail(user.email, "Password Reset", `<p>Click <a href="${link}">here</a> to reset password</p>`);
  res.json({ message: "Reset link sent" });
};

// Reset password
export const ResetPassword = async (req, res) => {
  const { password } = req.body;
  const user = await Authentication.findOne({
    resetToken: req.params.token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ error: "Invalid or expired token" });

  user.password = await bcrypt.hash(password, 10);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  res.json({ message: "Password reset successful" });
};
