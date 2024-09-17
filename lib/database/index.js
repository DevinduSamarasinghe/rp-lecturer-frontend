// lib/database.js
import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
    throw new Error('Please define the MONGODB_URL environment variable in .env.local');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectToDatabase = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URL, {
            bufferCommands: false,
            dbName: 'rp-lecturer'
        }).then((mongoose) => mongoose);
    }

    try {
        cached.conn = await cached.promise;
        console.log('MongoDB connection successful.');
        return cached.conn;
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        throw new Error('Failed to connect to MongoDB');
    }
};

export default connectToDatabase;
