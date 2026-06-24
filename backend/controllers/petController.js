import Pet from "../models/Pet.js";

// @desc Get all pets with search/filter
// @route GET /api/pets
export const getPets = async (req, res, next) => {
  try {
    const { search, species, status, gender, minAge, maxAge, page = 1, limit = 12 } = req.query;

    const query = {};
    if (search) query.$text = { $search: search };
    if (species) query.species = species;
    if (status) query.status = status;
    if (gender) query.gender = gender;
    if (minAge || maxAge) {
      query.age = {};
      if (minAge) query.age.$gte = Number(minAge);
      if (maxAge) query.age.$lte = Number(maxAge);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [pets, total] = await Promise.all([
      Pet.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Pet.countDocuments(query),
    ]);

    res.json({
      pets,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get single pet
// @route GET /api/pets/:id
export const getPetById = async (req, res, next) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });

    const relatedPets = await Pet.find({
      species: pet.species,
      _id: { $ne: pet._id },
    }).limit(4);

    res.json({ pet, relatedPets });
  } catch (error) {
    next(error);
  }
};

// @desc Create pet (admin)
// @route POST /api/pets
export const createPet = async (req, res, next) => {
  try {
    const pet = await Pet.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(pet);
  } catch (error) {
    next(error);
  }
};

// @desc Update pet (admin)
// @route PUT /api/pets/:id
export const updatePet = async (req, res, next) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json(pet);
  } catch (error) {
    next(error);
  }
};

// @desc Delete pet (admin)
// @route DELETE /api/pets/:id
export const deletePet = async (req, res, next) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json({ message: "Pet deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc Get featured pets for homepage
// @route GET /api/pets/featured
export const getFeaturedPets = async (req, res, next) => {
  try {
    const pets = await Pet.find({ status: "Available" }).sort({ createdAt: -1 }).limit(6);
    res.json(pets);
  } catch (error) {
    next(error);
  }
};