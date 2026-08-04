import logo from "../assets/side-logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full px-5 py-3 lg:hidden">
      <Link to="/home" className="inline-block">
        <img
          src={logo}
          alt="Castle Logic Logo"
          className="h-8 w-auto"
        />
      </Link>
    </header>
  );
}
