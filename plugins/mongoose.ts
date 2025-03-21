// filepath: /plugins/mongoose.ts
import { connectToDatabase } from "~/server/utils/mongoose";

export default defineNuxtPlugin(async () => {
  if (import.meta.server) {
    await connectToDatabase();
  }
});
