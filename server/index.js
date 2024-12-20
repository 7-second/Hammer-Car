import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import authRouter from './router/auth.router.js';
import userRouter from './router/user.router.js';
import rentRouter from './router/rent.router.js';
import sellRouter from './router/sell.router.js';
import carRouter from './router/car.router.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Init server
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer storage configuration
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'car-rental', // The folder in your Cloudinary account where the images will be stored
        resource_type: 'auto',
        allowed_formats: ['jpg', 'png', 'gif', 'bmp', 'webp', 'svg', 'tiff', 'ico', 'jpeg', 'jfif'], // Add common image formats
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    },
});

const upload = multer({ storage: storage });

app.get('/', (_, res) => {
    res.send('Hello, World! this is from Hammer cars...');
});

// Routes
app.use('/auth', authRouter);
app.use('/user', upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'coverPicture', maxCount: 1 }
]), userRouter);
app.use('/rent', rentRouter);
app.use('/sell', sellRouter);
app.use('/car', upload.array('images', 5), carRouter);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(5001, () => {
            console.log('Server is running on http://localhost:5001');
        });
    })
    .catch((err) => {
        console.log("DB connection Error: ", err)
    });