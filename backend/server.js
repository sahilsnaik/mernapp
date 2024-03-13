import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import employeesRouter from './routes/employees.routes.js';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Employee from './models/Employee.models.js'; // Adjust the path as necessary

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to the database
connectDB();

// Multer configuration for file uploads
const storage = multer.diskStorage({
 destination: function (req, file, cb) {
    cb(null, 'uploads/');
 },
 filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
 }
});

const upload = multer({ storage: storage });

// Use the employees routes
app.use('/api/employees', employeesRouter);

// Example route for file upload
app.post('/upload', upload.single('file'), (req, res) => {
 // req.file contains information about the uploaded file
 // req.body contains the text fields, if there were any
 res.send('File uploaded successfully');
});

// Authentication route
app.post('/api/authenticate', async (req, res) => {
   try {
      const { f_Email, f_Password } = req.body;
      // Use $regex for case-insensitive matching
      const employee = await Employee.findOne({ f_Email: { $regex: new RegExp(`^${f_Email}$`, 'i') } });
  
      if (!employee) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const isPasswordValid = await bcrypt.compare(f_Password, employee.f_Password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // If the password is valid, generate a JWT
      const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ token });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
   }
  });
// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
