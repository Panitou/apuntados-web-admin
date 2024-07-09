import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Carga las variables de entorno desde el archivo .env

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://panito:DmuKprbrH7Hb2YFn@apuntados-web.omormql.mongodb.net/mi-base-de-datos?retryWrites=true&w=majority&appName=apuntados-web"
    );
    console.log("MongoDB is connected");
  } catch (error) {
    console.error(error);
  }
};
