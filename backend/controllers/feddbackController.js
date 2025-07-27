import asyncHandler from 'express-async-handler';
import Feedback from '../models/feedback.js';

const submitFeedback = asyncHandler(async (req, res) => {
  const { name, email, course, rating, comments } = req.body;

  const feedback = new Feedback({
    name,
    email,
    course,
    rating,
    comments
  });

  const createdFeedback = await feedback.save();
  
  res.status(201).json({
    success: true,
    message: 'Feedback submitted successfully',
    data: createdFeedback
  });
});

const getFeedbacks = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const total = await Feedback.countDocuments();
  const feedbacks = await Feedback.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json({
    success: true,
    data: {
      feedbacks,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalFeedbacks: total,
        limit
      }
    }
  });
});

// @desc    Delete feedback
// @route   DELETE /api/feedback/:id
// @access  Private/Admin
const deleteFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    res.status(404);
    throw new Error('Feedback not found');
  }

  await Feedback.deleteOne({ _id: req.params.id });

  res.json({
    success: true,
    message: 'Feedback removed'
  });
});

export {
  submitFeedback,
  getFeedbacks,
  deleteFeedback
};