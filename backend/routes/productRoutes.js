import express from 'express';

import {
    deleteProduct,
    getProducts,
    getProductsById,
} from '../controllers/product.controller.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductsById).delete(protect, admin, deleteProduct);

export default router;
