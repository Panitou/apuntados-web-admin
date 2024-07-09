// Importa el módulo axios para hacer solicitudes HTTP
import axios from "axios";

// Crea una instancia de axios con una configuración personalizada
const instance = axios.create({
  // Establece la URL base para las solicitudes
  baseURL: "http://localhost:4000/api",
  // Incluye las credenciales (cookies) en cada solicitud
  withCredentials: true,
});

// Exporta la instancia personalizada de axios para ser usada en otros módulos
export default instance;
