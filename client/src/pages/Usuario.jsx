import React, { useState, useEffect } from "react";
import {
  addUserRequest,
  getUsersRequest,
  deleteUserRequest,
} from "../api/user.js";

function Usuario() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsersRequest();
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching users");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addUserRequest(newUser);
      setUsers([...users, response.data]);
      setNewUser({ username: "", email: "", password: "" });
    } catch (error) {
      setError("Error adding user");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUserRequest(id);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      setError("Error deleting user");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Usuarios
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form
        className="flex items-center justify-center mb-6"
        onSubmit={handleSubmit}
      >
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
            {users.map((user) => (
              <tr className="bg-[#CACACA]" key={user._id}>
                <td className="border-b p-2 text-center">{user.username}</td>
                <td className="border-b p-2 text-center">{user.email}</td>
                <td className="border-b p-2 text-center">
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
