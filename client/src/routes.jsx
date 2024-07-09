import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";

export const ProtectedRoute = () => {
  // Extrae el estado de autenticación y carga del contexto de autenticación
  const { isAuthenticated, loading } = useAuth();

  // Muestra un mensaje de carga si la autenticación todavía está en proceso
  if (loading) return <h1>Loading...</h1>;

  // Redirige al usuario a la página de inicio de sesión si no está autenticado y la carga ha terminado
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;

  // Renderiza el componente Outlet para mostrar el contenido protegido cuando el usuario está autenticado
  return <Outlet />;
};
