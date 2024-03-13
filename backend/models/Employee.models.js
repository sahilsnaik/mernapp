import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const EmployeeSchema = new mongoose.Schema({
 f_Id: {
    type: Number,
    required: true,
    unique: true,
 },
 f_Image: {
    type: String,
    required: true,
 },
 f_Name: {
    type: String,
    required: true,
 },
 f_Email: {
    type: String,
    required: true,
    unique: true,
 },
 f_Mobile: {
    type: String,
    required: true,
 },
 f_Designation: {
    type: String,
    required: true,
 },
 f_gender: {
    type: String,
    required: true,
 },
 f_Course: {
    type: String,
    required: true,
 },
 f_Createdate: {
    type: Date,
    default: Date.now,
 },
 f_Password: { // This field will store the hashed password
    type: String,
    required: true,
 },
});

// Hash the password before saving the employee
EmployeeSchema.pre('save', async function(next) {
 if (this.isModified('f_Password')) {
    const saltRounds = 10;
    this.f_Password = await bcrypt.hash(this.f_Password, saltRounds);
 }
 next();
});

export default mongoose.model('Employee', EmployeeSchema);
