import Header from "./Header";
import Footer from "./Footer";
import NavRail from "./NavRail";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white lg:pr-16">
      <Header />
      <NavRail />

      {/* Main content grows to push footer down */}
      <main className="flex-grow flex justify-center p-[10px] lg:p-0 py-8">
        <div className="w-full max-w-[1200px]">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
