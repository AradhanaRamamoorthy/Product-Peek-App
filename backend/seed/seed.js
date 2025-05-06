import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/productSchema.js';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/productSearchDB';

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const dataPath = path.join(__dirname, 'products.json');
    const products = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    await Product.deleteMany({});
    console.log('Existing products removed');

    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
}

seedDatabase();

