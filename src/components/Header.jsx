import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow-md p-4 flex gap-4">
      <Link to="/">Home</Link>
      <Link to="/search">Search</Link>
      <Link to="/favorites">Favorites</Link>
    </header>
  );
}
