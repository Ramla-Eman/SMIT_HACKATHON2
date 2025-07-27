import mongoose from 'mongoose';
import Admin from './models/admin.js';
import dotenv from 'dotenv'
dotenv.config({ path: './backend/.env' });
import connectDB from './config/database.js';

connectDB();

const createAdmin = async () => {
  try {
    const admin = new Admin({
      username: 'admin',
      password: 'admin123'
    });
    
    await admin.save();
    console.log('Admin user created successfully!');
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createAdmin();