import { useNavigate } from "react-router-dom";
import logo from "../assets/castlelogic.png";

export default function Landing() {
  const navigate = useNavigate();

  function handleEnter() {
    navigate("/home");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      {/* Entire box is clickable */}
      <div
        onClick={handleEnter}
        className="border-2 border-castlepink rounded-[10px] p-10 text-center hover-glow max-w-full"
      >
        <img
          src={logo}
          alt="Castle Logic Logo"
          className="mx-auto my-2 w-full max-w-[400px]"
          style={{ margin: '10px' }}
        />
      </div>
    </div>
  );
}
