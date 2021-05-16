import asyncHandler from 'express-async-handler';
import Product from '../models/product.model.js';

/**
 * @desc        Fetch all products
 * @route       GET /api/products
 * @access      Public
 */
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 2;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
        ? {
              name: {
                  $regex: req.query.keyword,
                  $options: 'i',
              },
          }
        : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
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
    const { name, price, image, description, brand, category, countInStock } =
        req.body;

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

/**
 * @desc        Create new review
 * @route       POST /api/products/:id/reviews
 * @access      Private
 */
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);
    if (product) {
        const alreadyReviewed = product.reviews.find(
            (review) => review.user.toString() === req.user._id.toString()
        );
        if (alreadyReviewed) {
            res.status(404);
            throw new Error('Product already reviewed');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment: comment,
            user: req.user._id,
        };

        product.reviews.push(review);

        const numReviews = product.reviews.length;

        product.numReviews = numReviews;

        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            numReviews;

        await product.save();
        res.status(201).json({ message: 'Review added' });
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
    createProductReview,
    updateProduct,
};
