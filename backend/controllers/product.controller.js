import asyncHandler from 'express-async-handler';
import Product from '../models/product.model.js';

/**
 * @description Fetch all products
 * @route       GET /api/products
 * @access      Public
 */
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

/**
 * @description Fetch specific product by id
 * @route       GET /api/products/:id
 * @param       productId
 * @access      Public
 */
const getProductsById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export { getProducts, getProductsById };
