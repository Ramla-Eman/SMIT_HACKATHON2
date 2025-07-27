import express from 'express';
const router = express.Router();
import {submitFeedback, getFeedbacks, deleteFeedback} from '../controllers/feddbackController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/', submitFeedback);
router.get('/', protect, getFeedbacks);
router.delete('/:id', protect, deleteFeedback);

const feedbackRoutes = router;
export default feedbackRoutes;