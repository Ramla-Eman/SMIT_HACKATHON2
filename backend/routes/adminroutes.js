import express from 'express';
const router = express.Router();
import { authAdmin } from '../controllers/adminController.js';

router.route('/login').post(authAdmin);

const adminRoutes = router;

export default adminRoutes;