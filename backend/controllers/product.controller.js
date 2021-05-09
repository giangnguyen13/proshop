import asyncHandler from 'express-async-handler';
import Product from '../models/product.model.js';

/**
 * @desc        Fetch all products
 * @route       GET /api/products
 * @access      Public
 */
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

/**
 * @desc        Fetch specific product by id
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

/**
 * @desc        Delete product by id
 * @route       DELETE /api/products/:id
 * @access      Private/admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove();
        res.status(200).json({ message: 'Deleted product' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export { getProducts, getProductsById, deleteProduct };
