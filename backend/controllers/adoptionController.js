import AdoptionRequest from "../models/AdoptionRequest.js";
import Pet from "../models/Pet.js";

// @desc Submit adoption request
// @route POST /api/adoptions
export const createAdoptionRequest = async (req, res, next) => {
  try {
    const { pet: petId } = req.body;

    const pet = await Pet.findById(petId);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    if (pet.status === "Adopted") {
      return res.status(400).json({ message: "This pet has already been adopted" });
    }

    const request = await AdoptionRequest.create({ ...req.body, user: req.user._id });

    pet.status = "Pending";
    await pet.save();

    res.status(201).json(request);
  } catch (error) {
    next(error);
  }
};

// @desc Get logged-in user's adoption requests
// @route GET /api/adoptions/my
export const getMyAdoptionRequests = async (req, res, next) => {
  try {
    const requests = await AdoptionRequest.find({ user: req.user._id })
      .populate("pet", "name species breed images status")
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    next(error);
  }
};

// @desc Get single adoption request
// @route GET /api/adoptions/:id
export const getAdoptionRequestById = async (req, res, next) => {
  try {
    const request = await AdoptionRequest.findById(req.params.id).populate("pet").populate("user", "name email");
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to view this request" });
    }

    res.json(request);
  } catch (error) {
    next(error);
  }
};

// @desc Get all adoption requests (admin)
// @route GET /api/adoptions
export const getAllAdoptionRequests = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    const requests = await AdoptionRequest.find(query)
      .populate("pet", "name species breed images")
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    next(error);
  }
};

// @desc Update adoption request status (admin)
// @route PUT /api/adoptions/:id/status
export const updateAdoptionStatus = async (req, res, next) => {
  try {
    const { status, adminNotes } = req.body;
    const request = await AdoptionRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = status;
    if (adminNotes !== undefined) request.adminNotes = adminNotes;
    await request.save();

    const pet = await Pet.findById(request.pet);
    if (pet) {
      if (status === "Approved") pet.status = "Adopted";
      if (status === "Rejected") pet.status = "Available";
      await pet.save();
    }

    res.json(request);
  } catch (error) {
    next(error);
  }
};