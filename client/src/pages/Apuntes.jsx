import React, { useState, useEffect } from "react";
import {
  getListingsRequest,
  deleteListingByIdRequest,
} from "../api/listing.js";

function Apuntes() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await getListingsRequest();
      setListings(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching listings");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteListingByIdRequest(id);
      setListings(listings.filter((listing) => listing._id !== id));
    } catch (error) {
      setError("Error deleting listing");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Apuntes
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading ? (
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
            {listings.map((listing) => (
              <tr className="bg-[#CACACA]" key={listing._id}>
                <td className="border-b p-2 text-center">{listing.name}</td>
                <td className="border-b p-2 text-center">{listing.course}</td>
                <td className="border-b p-2 text-center">{listing.semester}</td>
                <td className="border-b p-2 text-center">{listing.price}</td>
                <td className="border-b p-2 text-center">{listing.userRef}</td>
                <td className="border-b p-2 text-center">
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
