import SuccessStory from "../models/SuccessStory.js";

// @desc Get all success stories
// @route GET /api/success-stories
export const getSuccessStories = async (req, res, next) => {
  try {
    const stories = await SuccessStory.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    next(error);
  }
};

// @desc Create success story (admin)
// @route POST /api/success-stories
export const createSuccessStory = async (req, res, next) => {
  try {
    const story = await SuccessStory.create(req.body);
    res.status(201).json(story);
  } catch (error) {
    next(error);
  }
};

// @desc Update success story (admin)
// @route PUT /api/success-stories/:id
export const updateSuccessStory = async (req, res, next) => {
  try {
    const story = await SuccessStory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.json(story);
  } catch (error) {
    next(error);
  }
};

// @desc Delete success story (admin)
// @route DELETE /api/success-stories/:id
export const deleteSuccessStory = async (req, res, next) => {
  try {
    const story = await SuccessStory.findByIdAndDelete(req.params.id);
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.json({ message: "Story deleted" });
  } catch (error) {
    next(error);
  }
};