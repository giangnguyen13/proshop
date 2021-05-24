import express from 'express';

import {
    authUser,
    deleteUser,
    getUserProfile,
    getUsers,
    registerUser,
    updateUserProfile,
    getUserById,
    updateUser,
} from '../controllers/user.controller.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.route('/login').post(authUser);
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router
    .route('/:id')
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)
    .delete(protect, admin, deleteUser);

export default router;
