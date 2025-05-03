import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI ?? '';

export async function connectToDatabase() {
    try {
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

export async function disconnectFromDatabase() {
    await mongoose.connection.close();
}