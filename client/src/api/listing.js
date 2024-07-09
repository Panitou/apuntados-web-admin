// Importa la instancia personalizada de axios que has configurado previamente
import axios from "./axios";

// Define una función asincrónica para obtener todos los listados
export const getListingsRequest = async () =>
  // Hace una solicitud GET a la ruta /listings usando la instancia personalizada de axios
  axios.get(`/listings`);

// Define una función asincrónica para eliminar un listado por su ID
export const deleteListingByIdRequest = async (id) =>
  // Hace una solicitud DELETE a la ruta /listings/{id} usando la instancia personalizada de axios
  axios.delete(`/listings/${id}`);
