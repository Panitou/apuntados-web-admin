// Importar el modelo Listing desde los modelos de la aplicación
import Listing from "../models/listing.model.js";

// Exportar la función para obtener todos los apuntes como una función asíncrona
export const getListings = async (req, res) => {
  try {
    // Obtener todos los documentos de la colección de listados en la base de datos
    const listings = await Listing.find();
    // Devolver los listados obtenidos con un estado 200 (OK)
    res.status(200).json(listings);
  } catch (error) {
    // Manejar errores y devolver un mensaje de error al cliente con un estado 500 (error interno del servidor)
    res.status(500).json({ message: "Error fetching listings" });
  }
};

// Exportar la función para eliminar un apunte por ID como una función asíncrona
export const deleteListingById = async (req, res) => {
  // Extraer el ID de los parámetros de la solicitud
  const { id } = req.params;

  try {
    // Buscar y eliminar el documento con el ID proporcionado
    const deletedListing = await Listing.findByIdAndDelete(id);
    // Si no se encuentra el listado, devolver un mensaje de error con un estado 404 (no encontrado)
    if (!deletedListing)
      return res.status(404).json({ message: "Listing not found" });
    // Devolver un mensaje de éxito con un estado 200 (OK) si el listado fue eliminado correctamente
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    // Manejar errores y devolver un mensaje de error al cliente con un estado 500 (error interno del servidor)
    res.status(500).json({ message: "Error deleting listing" });
  }
};
