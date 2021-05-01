import express from 'express';

import { authUser } from '../controllers/user.controller.js';

const router = express.Router();

router.route('/login').post(authUser);

export default router;
