import mongoose from 'mongoose';

const mongoURI = 'mongodb://127.0.0.1:27017/rpgLicence'; // Your database name
mongoose.connect(mongoURI)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));
