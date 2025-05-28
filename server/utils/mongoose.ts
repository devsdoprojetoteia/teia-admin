import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/teia";

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(MONGO_URI, {
        serverSelectionTimeoutMS: 30000, // Timeout for server selection
        socketTimeoutMS: 45000, // Timeout for socket operations
        connectTimeoutMS: 30000, // Timeout for initial connection
        maxPoolSize: 10, // Maximum number of connections in the pool
        minPoolSize: 5, // Minimum number of connections in the pool
        retryWrites: true,
        retryReads: true,
      });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }
};
