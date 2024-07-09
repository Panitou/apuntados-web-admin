// Importa la instancia personalizada de axios que has configurado previamente
import axios from "./axios";

// Define una función asincrónica para registrar un nuevo usuario
export const registerRequest = async (user) =>
  // Hace una solicitud POST a la ruta /auth/register usando la instancia personalizada de axios
  // Envía el objeto `user` en el cuerpo de la solicitud
  axios.post(`/auth/register`, user);

// Define una función asincrónica para iniciar sesión de un usuario
export const loginRequest = async (user) =>
  // Hace una solicitud POST a la ruta /auth/login usando la instancia personalizada de axios
  // Envía el objeto `user` en el cuerpo de la solicitud
  axios.post(`/auth/login`, user);

// Define una función asincrónica para verificar el token de autenticación
export const verifyTokenRequest = async () =>
  // Hace una solicitud GET a la ruta /auth/verify usando la instancia personalizada de axios
  axios.get(`/auth/verify`);

// Define una función asincrónica para obtener el perfil del usuario autenticado
export const getProfileRequest = async () =>
  // Hace una solicitud GET a la ruta /auth/profile usando la instancia personalizada de axios
  axios.get(`/auth/profile`);
