// Importar el modelo UserAdmin de los modelos de la aplicación
import UserAdmin from "../models/userAdmin.model.js";
// Importar el paquete jwt para manejar los tokens JSON Web Token
import jwt from "jsonwebtoken";
// Importar el paquete bcryptjs para manejar el hashing de contraseñas
import bcrypt from "bcryptjs";
// Importar la función createAccessToken desde la librería de JWT de la aplicación
import { createAccessToken } from "../libs/jwt.js";

// Exportar la función de registro de usuarios como una función asíncrona
export const register = async (req, res) => {
  try {
    // Extraer el nombre de usuario, email y contraseña del cuerpo de la solicitud
    const { username, email, password } = req.body;

    // Buscar un usuario existente con el mismo email
    const userFound = await UserAdmin.findOne({ email });

    // Si el usuario ya existe, devolver un mensaje de error
    if (userFound)
      return res.status(400).json({
        message: ["The email is already in use"],
      });

    // Hashear la contraseña proporcionada
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario con el nombre de usuario, email y la contraseña hasheada
    const newUser = new UserAdmin({
      username,
      email,
      password: passwordHash,
    });

    // Guardar el nuevo usuario en la base de datos
    const userSaved = await newUser.save();

    // Crear un token de acceso para el nuevo usuario
    const token = await createAccessToken({
      id: userSaved._id,
    });

    // Configurar la cookie con el token de acceso
    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    // Devolver la información del usuario guardado (sin la contraseña)
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    // Manejar errores y devolver un mensaje de error al cliente
    res.status(500).json({ message: error.message });
  }
};

// Exportar la función de inicio de sesión como una función asíncrona
export const login = async (req, res) => {
  try {
    // Extraer el email y la contraseña del cuerpo de la solicitud
    const { email, password } = req.body;
    // Buscar un usuario con el email proporcionado
    const userFound = await UserAdmin.findOne({ email });

    // Si no se encuentra el usuario, devolver un mensaje de error
    if (!userFound)
      return res.status(400).json({
        message: ["The email does not exist"],
      });

    // Comparar la contraseña proporcionada con la contraseña hasheada almacenada
    const isMatch = await bcrypt.compare(password, userFound.password);
    // Si la contraseña no coincide, devolver un mensaje de error
    if (!isMatch) {
      return res.status(400).json({
        message: ["The password is incorrect"],
      });
    }

    // Crear un token de acceso para el usuario
    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username,
    });

    // Configurar la cookie con el token de acceso
    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    // Devolver la información del usuario (sin la contraseña)
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    // Manejar errores y devolver un mensaje de error al cliente
    return res.status(500).json({ message: error.message });
  }
};

// Exportar la función para verificar el token como una función asíncrona
export const verifyToken = async (req, res) => {
  // Extraer el token de las cookies de la solicitud
  const { token } = req.cookies;
  // Si no hay token, devolver false
  if (!token) return res.send(false);

  // Verificar el token utilizando la clave secreta
  jwt.verify(token, "secret", async (error, user) => {
    // Si hay un error en la verificación, devolver un estado 401 (no autorizado)
    if (error) return res.sendStatus(401);

    // Buscar el usuario en la base de datos por su ID
    const userFound = await UserAdmin.findById(user.id);
    // Si no se encuentra el usuario, devolver un estado 401 (no autorizado)
    if (!userFound) return res.sendStatus(401);

    // Devolver la información del usuario (sin la contraseña)
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};

// Exportar la función de cierre de sesión como una función asíncrona
export const logout = async (req, res) => {
  // Configurar la cookie con un token vacío y una fecha de expiración pasada
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  // Devolver un estado 200 (OK)
  return res.sendStatus(200);
};

// Exportar la función para obtener el perfil del usuario como una función asíncrona
export const getProfile = async (req, res) => {
  try {
    // Buscar el usuario en la base de datos por su ID, excluyendo el campo de la contraseña
    const user = await UserAdmin.findById(req.user.id).select("-password");
    // Si no se encuentra el usuario, devolver un estado 404 (no encontrado) y un mensaje de error
    if (!user) return res.status(404).json({ message: "User not found" });

    // Devolver la información del usuario
    res.json(user);
  } catch (error) {
    // Manejar errores y devolver un mensaje de error al cliente
    res.status(500).json({ message: error.message });
  }
};
