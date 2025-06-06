import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/teia";

export const connectToDatabase = async () => {
  console.log("Connecting to MongoDB");
  console.log("mongoose.connection.readyState", mongoose.connection.readyState );
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(MONGO_URI);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }
};
