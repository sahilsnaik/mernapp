import mongoose from 'mongoose';

const connectDB = async () => {
 try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');
 } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
 }
};

export default connectDB;