import React, { useState, useEffect } from "react";
import {
  addUserRequest,
  getUsersRequest,
  deleteUserRequest,
} from "../api/user.js";

function Usuario() {
  // Estado local para almacenar la lista de usuarios, el nuevo usuario, estado de carga y errores
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Efecto de efecto secundario para cargar la lista de usuarios cuando el componente se monta
  useEffect(() => {
    fetchUsers();
  }, []);

  // Función asincrónica para obtener la lista de usuarios
  const fetchUsers = async () => {
    try {
      setLoading(true); // Establece loading a true para indicar que la carga está en curso
      const response = await getUsersRequest(); // Realiza la solicitud para obtener los usuarios
      setUsers(response.data); // Actualiza el estado de users con los datos recibidos
      setLoading(false); // Establece loading a false una vez que la carga ha finalizado
    } catch (error) {
      setError("Error fetching users"); // Captura y maneja cualquier error que ocurra durante la solicitud
      setLoading(false); // Establece loading a false en caso de error
    }
  };

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Función asincrónica para manejar el envío del formulario de añadir usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addUserRequest(newUser); // Realiza la solicitud para añadir un nuevo usuario
      setUsers([...users, response.data]); // Actualiza users con el nuevo usuario añadido
      setNewUser({ username: "", email: "", password: "" }); // Reinicia los campos del formulario
    } catch (error) {
      setError("Error adding user"); // Captura y maneja cualquier error que ocurra durante la adición de usuario
    }
  };

  // Función asincrónica para manejar la eliminación de un usuario por su ID
  const handleDelete = async (id) => {
    try {
      await deleteUserRequest(id); // Realiza la solicitud para eliminar el usuario por su ID
      // Actualiza users eliminando el usuario que coincide con el ID eliminado
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      setError("Error deleting user"); // Captura y maneja cualquier error que ocurra durante la eliminación de usuario
    }
  };

  // Renderización del componente
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Usuarios
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}{" "}
      {/* Muestra un mensaje de error si hay algún error */}
      <form
        className="flex items-center justify-center mb-6"
        onSubmit={handleSubmit}
      >
        {/* Campos de entrada para username, email y password del nuevo usuario */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newUser.username}
          onChange={handleChange}
          required
          className="p-2 mb-4 w-80 border border-gray-300 rounded-md"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleChange}
          required
          className="p-2 mb-4 w-80 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleChange}
          required
          className="p-2 mb-4 w-80 border border-gray-300 rounded-md"
        />
        {/* Botón para enviar el formulario de añadir usuario */}
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Añadir usuario
        </button>
      </form>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <table className="w-full border-collapse rounded-lg">
          <thead>
            <tr className="bg-[#C0C6FF]">
              <th className="border-b-2 p-2">Username</th>
              <th className="border-b-2 p-2">Email</th>
              <th className="border-b-2 p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapea cada usuario en users y renderiza una fila de tabla para cada uno */}
            {users.map((user) => (
              <tr className="bg-[#CACACA]" key={user._id}>
                <td className="border-b p-2 text-center">{user.username}</td>
                <td className="border-b p-2 text-center">{user.email}</td>
                <td className="border-b p-2 text-center">
                  {/* Botón para eliminar el usuario llamando a handleDelete con el ID del usuario */}
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(user._id)}
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

export default Usuario;
