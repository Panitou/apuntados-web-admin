import express from "express"; // Importa el framework Express para construir la aplicación web
import cors from "cors"; // Importa el middleware CORS para configurar el intercambio de recursos entre diferentes dominios
import morgan from "morgan"; // Importa el middleware Morgan para el registro de solicitudes HTTP
import cookieParser from "cookie-parser"; // Importa el middleware Cookie Parser para analizar cookies en las solicitudes HTTP

import authRoutes from "./routes/auth.routes.js"; // Importa las rutas relacionadas con la autenticación de usuarios
import userRoutes from "./routes/user.route.js"; // Importa las rutas relacionadas con los usuarios
import listingRoutes from "./routes/listing.route.js"; // Importa las rutas relacionadas con los apuntes

import dotenv from "dotenv"; // Importa dotenv para cargar variables de entorno desde un archivo .env

dotenv.config(); // Carga las variables de entorno definidas en el archivo .env

const app = express(); // Crea una instancia de la aplicación Express

// Configuración de CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Permite solicitudes solo desde este origen específico
    credentials: true, // Permite el envío de cookies y credenciales en las solicitudes
  })
);

app.use(express.json()); // Permite el análisis del cuerpo de la solicitud en formato JSON
app.use(morgan("dev")); // Habilita el middleware Morgan en modo "dev" para el registro de solicitudes HTTP en la consola
app.use(cookieParser()); // Analiza las cookies adjuntas en las solicitudes HTTP

// Configuración de las rutas de la aplicación
app.use("/api/auth", authRoutes); // Define las rutas para la autenticación bajo la ruta base "/api/auth"
app.use("/api", userRoutes); // Define las rutas para los usuarios bajo la ruta base "/api"
app.use("/api", listingRoutes); // Define las rutas para los apuntes bajo la ruta base "/api"

// Configuración adicional para producción
if (process.env.NODE_ENV === "production") {
  const path = await import("path"); // Importa la biblioteca "path" para manejar rutas de archivos

  app.use(express.static("client/dist")); // Configura Express para servir archivos estáticos desde la carpeta "client/dist"

  // Ruta para manejar todas las demás solicitudes y servir el archivo index.html
  app.get("*", (req, res) => {
    console.log(path.resolve("client", "dist", "index.html")); // Imprime la ruta del archivo index.html en la consola
    res.sendFile(path.resolve("client", "dist", "index.html")); // Envía el archivo index.html como respuesta a cualquier solicitud GET
  });
}

export default app; // Exporta la aplicación Express como módulo para ser utilizada en otros archivos
