import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/user.model.js';
import Product from './models/product.model.js';
import Order from './models/order.model.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany({});
        await Product.deleteMany({});
        await User.deleteMany({});

        const createdUser = await User.insertMany(users);

        const admin = createdUser.filter((user) => user.isAdmin === true)[0]
            ._id; //createdUser[0]._id;//

        const sampleProducts = products.map((product) => {
            return { ...product, user: admin };
        });

        await Product.insertMany(sampleProducts);

        console.log('Data imported');
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany({});
        await Product.deleteMany({});
        await User.deleteMany({});

        console.log('Data destroyed');
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

if (process.argv[2] === '--d') {
    destroyData();
} else {
    importData();
}
