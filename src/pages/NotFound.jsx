import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-10 py-10 sm:py-16 font-fredoka text-center flex flex-col items-center justify-center">
      <SEO
        title="Page Not Found"
        description="That page doesn't exist on Castle Logic."
        path="/404"
      />
      <h1 className="text-5xl font-bold text-castlepink mb-4 tracking-wider">404</h1>
      <p className="text-xl text-castlepurple mb-2">This page doesn't exist.</p>
      <p className="text-castlepurple mb-10">
        The link might be broken, or the page may have moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/home"
          className="px-6 py-3 border border-castlepink text-castlepink rounded-lg hover-glow-small hover:bg-gray-900 hover:text-castlepurple transition-colors"
        >
          Back to Home
        </Link>
        <Link
          to="/contact"
          className="px-6 py-3 border border-castlepink text-castlepink rounded-lg hover-glow-small hover:bg-gray-900 hover:text-castlepurple transition-colors"
        >
          Contact Me
        </Link>
      </div>
    </main>
  );
}
