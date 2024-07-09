import jwt from "jsonwebtoken"; // Importa el módulo 'jsonwebtoken' para trabajar con tokens JWT
import { TOKEN_SECRET } from "../config.js"; // Importa la constante TOKEN_SECRET desde el archivo de configuración

// Middleware de autenticación
export const auth = (req, res, next) => {
  try {
    const { token } = req.cookies; // Extrae el token de las cookies de la solicitud

    // Verifica si no hay token en las cookies
    if (!token)
      return res
        .status(401)
        .json({ message: "No token, authorization denied" }); // Retorna un error 401 si no hay token

    // Verifica la validez del token usando jwt.verify
    jwt.verify(token, TOKEN_SECRET, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Token is not valid" }); // Retorna un error 401 si el token no es válido
      }
      req.user = user; // Si el token es válido, establece req.user con los datos decodificados del token
      next(); // Llama a la siguiente función en la cadena de middleware
    });
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Captura y maneja cualquier error que ocurra
  }
};
