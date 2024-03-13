import express from 'express';
import Employee from '../models/Employee.models.js';
import upload from '../config/upload.js';
import verifyToken from '../middleware/verifyToken.middleware.js'; // Import the verifyToken middleware

const router = express.Router();

// Create a new employee with file upload
router.post('/', verifyToken, upload.single('f_Image'), async (req, res) => {
 const employee = new Employee({
    ...req.body,
    f_Image: req.file.path // Use the path of the uploaded file
 });

 try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
 } catch (err) {
    res.status(400).json({ message: err.message });
 }
});

// Get all employees
// You might want to protect this route as well, depending on your requirements
router.get('/', verifyToken, async (req, res) => {
 try {
    const employees = await Employee.find({});
    res.json(employees);
 } catch (err) {
    res.status(500).json({ message: err.message });
 }
});

// Get a single employee by ID
router.get('/:id', verifyToken, async (req, res) => {
   try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      // Construct the full URL to the image
      const imageUrl = `http://localhost:5000/${employee.f_Image}`;
  
      // Include the imageUrl in the response
      res.json({
        ...employee._doc, // Spread the rest of the employee document
        f_Image: imageUrl, // Override the f_Image field with the full URL
      });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
});

// Update an employee by ID
router.put('/:id', verifyToken, async (req, res) => {
   console.log(req.body);
    
   try {
      const employee = await Employee.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      }, {
        new: true,
        runValidators: true, // Run validations
      });
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.json(employee);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
});

// Delete an employee by ID
router.delete('/:id', verifyToken, async (req, res) => {
 try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
 } catch (err) {
    res.status(500).json({ message: err.message });
 }
});

export default router;
