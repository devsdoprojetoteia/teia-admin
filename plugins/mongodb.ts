import mongoose from "mongoose";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const uri = config.MONGO_URI as string;

  mongoose
    .connect(uri, { })
    .then(() => console.log("MongoDB conectado"))
    .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));
});
