import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const addUser = async (req, res) => {
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

    // Devolver el nuevo usuario creado
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error adding user" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "username email");
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: "Error fetching users" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};
