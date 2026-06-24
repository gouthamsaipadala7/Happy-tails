import User from "../models/User.js";
import Pet from "../models/Pet.js";
import AdoptionRequest from "../models/AdoptionRequest.js";

// @desc Get admin dashboard stats
// @route GET /api/admin/stats
export const getDashboardStats = async (req, res, next) => {
  try {
    const [totalPets, availablePets, adoptedPets, totalUsers, totalRequests, pendingRequests] = await Promise.all([
      Pet.countDocuments(),
      Pet.countDocuments({ status: "Available" }),
      Pet.countDocuments({ status: "Adopted" }),
      User.countDocuments({ role: "user" }),
      AdoptionRequest.countDocuments(),
      AdoptionRequest.countDocuments({ status: "Pending" }),
    ]);

    const speciesBreakdown = await Pet.aggregate([
      { $group: { _id: "$species", count: { $sum: 1 } } },
    ]);

    res.json({
      totalPets,
      availablePets,
      adoptedPets,
      totalUsers,
      totalRequests,
      pendingRequests,
      speciesBreakdown,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get all users (admin)
// @route GET /api/admin/users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// @desc Delete a user (admin)
// @route DELETE /api/admin/users/:id
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};

// @desc Update a user's role (admin)
// @route PUT /api/admin/users/:id/role
export const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    next(error);
  }
};