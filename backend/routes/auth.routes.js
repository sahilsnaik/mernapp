import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/employee'; // Assuming your User model is named employee.js

const router = express.Router();

// Authentication endpoint
router.post('/authenticate', async (req, res) => {
 try {
    const user = await User.findOne({ f_Email: req.body.email }); // Corrected field name
    if (user) {
       const isPasswordValid = await bcrypt.compare(req.body.password, user.f_Password); // Corrected field name
       if (isPasswordValid) {
          const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          res.json({ token });
       } else {
          res.status(401).json({ message: 'Invalid email or password' });
       }
    } else {
       res.status(401).json({ message: 'Invalid email or password' });
    }
 } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
 }
});

export default router;
