// Importar el módulo bcryptjs para encriptar contraseñas
import bcrypt from "bcryptjs";
// Importar el modelo User desde los modelos de la aplicación
import User from "../models/user.model.js";

// Exportar la función para agregar un usuario como una función asíncrona
export const addUser = async (req, res) => {
  // Extraer el username, email y password del cuerpo de la solicitud
  const { username, email, password } = req.body;

  try {
    // Generar el hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10); // 10 es el número de rondas de hashing

    // Crear un nuevo usuario con la contraseña encriptada
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Guardar la contraseña encriptada
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    // Devolver el nuevo usuario creado con un estado 201 (creado)
    res.status(201).json(newUser);
  } catch (error) {
    // Manejar errores y devolver un mensaje de error al cliente con un estado 500 (error interno del servidor)
    res.status(500).json({ message: "Error adding user" });
  }
};

// Exportar la función para obtener todos los usuarios como una función asíncrona
export const getUsers = async (req, res) => {
  try {
    // Buscar todos los usuarios en la base de datos y seleccionar solo los campos username y email
    const users = await User.find({}, "username email");
    // Devolver los usuarios obtenidos con un estado 200 (OK)
    res.status(200).json(users);
  } catch (error) {
    // Manejar errores y devolver un mensaje de error al cliente con un estado 400 (solicitud incorrecta)
    res.status(400).json({ message: "Error fetching users" });
  }
};

// Exportar la función para eliminar un usuario como una función asíncrona
export const deleteUser = async (req, res) => {
  try {
    // Extraer el ID del usuario de los parámetros de la solicitud
    const { id } = req.params;
    // Buscar y eliminar el usuario con el ID proporcionado
    await User.findByIdAndDelete(id);
    // Devolver un mensaje de éxito con un estado 200 (OK) si el usuario fue eliminado correctamente
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    // Manejar errores y devolver un mensaje de error al cliente con un estado 500 (error interno del servidor)
    res.status(500).json({ message: "Error deleting user" });
  }
};
