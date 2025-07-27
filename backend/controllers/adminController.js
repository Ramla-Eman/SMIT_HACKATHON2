import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.js';``

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const authAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });

  if (admin && (await admin.comparePassword(password))) {
    res.json({
      success: true,
      token: generateToken(admin._id),
      message: 'Login successful'
    });
  } else {
    res.status(401);
    throw new Error('Invalid username or password');
  }
});

export {
  authAdmin
};