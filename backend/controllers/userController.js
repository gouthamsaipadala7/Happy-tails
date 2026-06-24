import User from "../models/User.js";

// @desc Update own profile
// @route PUT /api/users/profile
export const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, address, avatar } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name ?? user.name;
    user.phone = phone ?? user.phone;
    user.address = address ?? user.address;
    user.avatar = avatar ?? user.avatar;

    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// @desc Change password
// @route PUT /api/users/password
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (!(await user.matchPassword(currentPassword))) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};