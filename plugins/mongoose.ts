// filepath: /plugins/mongoose.ts
import { connectToDatabase } from "~/server/utils/mongoose";

export default defineNuxtPlugin(async () => {
  console.log("Mongoose plugin loaded");
  if (import.meta.server) {
    console.log("Calling connectToDatabase");
    await connectToDatabase();
  }
});
