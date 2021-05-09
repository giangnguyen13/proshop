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

/**
 * @desc        Create product
 * @route       DELETE /api/products
 * @access      Private/admin
 */
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        user: req.user._id,
        name: 'Lorem ipsum',
        image: '/images/sample.jpg',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam similique amet nihil.',
        brand: 'Sample',
        category: 'Electronics',
        price: 10.99,
        countInStock: 0,
        rating: 2.8,
        numReviews: 4,
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
});

/**
 * @desc        Update product
 * @route       Put /api/products/:id
 * @access      Private/admin
 */
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        image,
        description,
        brand,
        category,
        countInStock,
    } = req.body;

    const product = await Product.findById(req.params.id);
    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } else {
        res.status(404);
        throw new Error('Product not found.!');
    }
});

export {
    getProducts,
    getProductsById,
    deleteProduct,
    createProduct,
    updateProduct,
};
