import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @desc Register new user
// @route POST /api/auth/signup
export const signup = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = await User.create({ name, email, password, phone });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

// @desc Login user
// @route POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get logged in user profile
// @route GET /api/auth/me
export const getMe = async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
};

// @desc Forgot password (UI-only stub: generates a reset token)
// @route POST /api/auth/forgot-password
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No account with that email" });
    }

    const resetToken = Math.random().toString(36).slice(2);
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 60 * 60 * 1000;
    await user.save();

    res.json({ message: "Password reset instructions generated", resetToken });
  } catch (error) {
    next(error);
  }
};

// @desc Reset password
// @route POST /api/auth/reset-password
export const resetPassword = async (req, res, next) => {
  try {
    const { email, resetToken, newPassword } = req.body;
    const user = await User.findOne({
      email,
      resetPasswordToken: resetToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};