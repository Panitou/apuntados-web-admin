import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user);

  return (
    <nav className="bg-white my-3 flex justify-between py-5 px-10 rounded-lg">
      <h1 className="text-2xl font-bold text-black">
        <Link to={isAuthenticated ? "/tasks" : "/"}>ApuntaDos</Link>
      </h1>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li className="font-bold">Bienvenido {user.username}</li>
            <li>
              <Link
                to="/usuarios"
                className="bg-red-600 px-4 py-1 rounded-md text-white"
              >
                Usuarios
              </Link>
            </li>
            <li>
              <Link
                to="/apuntes"
                className="bg-red-600 px-4 py-1 rounded-md text-white"
              >
                Apuntes
              </Link>
            </li>
            <li>
              <Link className=" " to="/" onClick={() => logout()}>
                <ButtonLink>Cerrar sesión</ButtonLink>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <ButtonLink to="/login">Login</ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
