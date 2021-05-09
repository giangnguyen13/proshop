import express from 'express';

import {
    authUser,
    getUserProfile,
    getUsers,
    registerUser,
    updateUserProfile,
} from '../controllers/user.controller.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.route('/login').post(authUser);
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

export default router;
