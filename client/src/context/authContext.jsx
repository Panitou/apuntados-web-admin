// Importa el hook useEffect de React
import { useEffect } from "react";
// Importa createContext y useContext de React para crear y usar contextos
import { createContext, useContext, useState } from "react";
// Importa las funciones de solicitud de autenticación desde el archivo de la API
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
// Importa el módulo js-cookie para manejar las cookies
import Cookies from "js-cookie";

// Crea un contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  // Obtiene el contexto de autenticación
  const context = useContext(AuthContext);
  // Lanza un error si el hook no se usa dentro de un AuthProvider
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  // Devuelve el contexto de autenticación
  return context;
};

// Componente proveedor de autenticación
export const AuthProvider = ({ children }) => {
  // Define el estado para el usuario, la autenticación, los errores y la carga
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Limpia los errores después de 5 segundos
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      // Limpia el temporizador cuando el componente se desmonte o los errores cambien
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // Función para registrar un nuevo usuario
  const signup = async (user) => {
    try {
      // Realiza una solicitud de registro
      const res = await registerRequest(user);
      // Si la solicitud fue exitosa, establece el usuario y la autenticación
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      // Maneja los errores de la solicitud
      console.log(error.response.data);
      setErrors(error.response.data.message);
    }
  };

  // Función para iniciar sesión
  const signin = async (user) => {
    try {
      // Realiza una solicitud de inicio de sesión
      const res = await loginRequest(user);
      // Establece el usuario y la autenticación
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      // Maneja los errores de la solicitud
      console.log(error);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    // Elimina el token de las cookies
    Cookies.remove("token");
    // Establece el usuario y la autenticación a null y false respectivamente
    setUser(null);
    setIsAuthenticated(false);
  };

  // Efecto para verificar si el usuario está autenticado al montar el componente
  useEffect(() => {
    const checkLogin = async () => {
      // Obtiene las cookies
      const cookies = Cookies.get();
      // Si no hay token en las cookies, establece la autenticación y la carga
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        // Verifica el token
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        // Si la respuesta no contiene datos, establece la autenticación a false
        if (!res.data) return setIsAuthenticated(false);
        // Si la verificación es exitosa, establece el usuario y la autenticación
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        // Maneja los errores de la verificación
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    // Llama a la función de verificación de inicio de sesión
    checkLogin();
  }, []);

  // Retorna el proveedor de contexto de autenticación
  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Exporta el contexto de autenticación por defecto
export default AuthContext;
