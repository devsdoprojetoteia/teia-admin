// filepath: /plugins/mongoose.ts
import { connectToDatabase } from "~/server/utils/mongoose";

export default defineNuxtPlugin(async (nuxtApp) => {
  if (import.meta.server) {
    try {
      console.log("Initializing MongoDB connection...");
      await connectToDatabase();
      console.log("MongoDB connection initialized successfully");
    } catch (error) {
      console.error("Failed to initialize MongoDB connection:", error);
      throw error; // This will prevent the app from starting if DB connection fails
    }
  }
});
