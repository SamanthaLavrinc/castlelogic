import logo from "../assets/side-logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full bg-black border-b border-castlepink">
      <div className="w-full max-w-[1200px] mx-auto px-5 py-3 lg:px-4 lg:py-4">
        <Link to="/home" className="inline-block">
          <img
            src={logo}
            alt="Castle Logic Logo"
            className="h-8 lg:h-16 w-auto"
          />
        </Link>
      </div>
    </header>
  );
}
