import express from 'express';

import {
    createProduct,
    deleteProduct,
    getProducts,
    getProductsById,
    updateProduct,
} from '../controllers/product.controller.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router
    .route('/:id')
    .get(getProductsById)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);

export default router;
