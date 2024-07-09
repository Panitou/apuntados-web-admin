// Importa la instancia personalizada de axios que has configurado previamente
import axios from "./axios";

// Define una función asincrónica para agregar un nuevo usuario
export const addUserRequest = async (user) =>
  // Hace una solicitud POST a la ruta /users usando la instancia personalizada de axios
  // Envía el objeto `user` en el cuerpo de la solicitud
  axios.post("/users", user);

// Define una función asincrónica para obtener todos los usuarios
export const getUsersRequest = async () =>
  // Hace una solicitud GET a la ruta /users usando la instancia personalizada de axios
  axios.get("/users");

// Define una función asincrónica para eliminar un usuario por su ID
export const deleteUserRequest = async (id) =>
  // Hace una solicitud DELETE a la ruta /users/:id usando la instancia personalizada de axios
  axios.delete(`/users/${id}`);
