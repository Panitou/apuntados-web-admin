import React, { useState, useEffect } from "react";
import {
  getListingsRequest,
  deleteListingByIdRequest,
} from "../api/listing.js";

function Apuntes() {
  // Estado local para almacenar la lista de apuntes, el estado de carga y errores
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Efecto de efecto secundario para cargar la lista de apuntes cuando el componente se monta
  useEffect(() => {
    fetchListings();
  }, []);

  // Función asincrónica para obtener la lista de apuntes
  const fetchListings = async () => {
    try {
      setLoading(true); // Establece loading a true para indicar que la carga está en curso
      const response = await getListingsRequest(); // Realiza la solicitud para obtener los apuntes
      setListings(response.data); // Actualiza el estado de listings con los datos recibidos
      setLoading(false); // Establece loading a false una vez que la carga ha finalizado
    } catch (error) {
      setError("Error fetching listings"); // Captura y maneja cualquier error que ocurra durante la solicitud
      setLoading(false); // Establece loading a false en caso de error
    }
  };

  // Función asincrónica para manejar la eliminación de un apunte por su ID
  const handleDelete = async (id) => {
    try {
      await deleteListingByIdRequest(id); // Realiza la solicitud para eliminar el apunte por su ID
      // Actualiza listings eliminando el apunte que coincide con el ID eliminado
      setListings(listings.filter((listing) => listing._id !== id));
    } catch (error) {
      setError("Error deleting listing"); // Captura y maneja cualquier error que ocurra durante la eliminación
    }
  };

  // Renderización del componente
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Apuntes
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}{" "}
      {/* Muestra un mensaje de error si hay algún error */}
      {loading ? ( // Condición para mostrar "Loading..." mientras se carga la lista de apuntes
        <p className="text-center">Loading...</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#C0C6FF]">
              <th className="border-b-2 p-2">Título</th>
              <th className="border-b-2 p-2">Curso</th>
              <th className="border-b-2 p-2">Semestre</th>
              <th className="border-b-2 p-2">Precio</th>
              <th className="border-b-2 p-2">Referencia del Usuario</th>
              <th className="border-b-2 p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapea cada apunte en listings y renderiza una fila de tabla para cada uno */}
            {listings.map((listing) => (
              <tr className="bg-[#CACACA]" key={listing._id}>
                <td className="border-b p-2 text-center">{listing.name}</td>
                <td className="border-b p-2 text-center">{listing.course}</td>
                <td className="border-b p-2 text-center">{listing.semester}</td>
                <td className="border-b p-2 text-center">{listing.price}</td>
                <td className="border-b p-2 text-center">{listing.userRef}</td>
                <td className="border-b p-2 text-center">
                  {/* Botón para eliminar el apunte llamando a handleDelete con el ID del apunte */}
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(listing._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Apuntes;
