import { Link } from "react-router-dom";

export const ButtonLink = ({ to, children }) => (
  <Link to={to} className="bg-black px-4 py-1 rounded-md text-white">
    {children}
  </Link>
);
