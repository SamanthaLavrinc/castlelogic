import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars -- `motion` is used as the `motion.div` JSX tag below
import { AnimatePresence, motion } from "framer-motion";

export default function Layout() {
  const location = useLocation();

  // React Router doesn't reset scroll position on navigation by default —
  // without this, landing on a new page keeps whatever scroll depth the
  // previous page was at.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />

      {/* Main content grows to push footer down */}
      <main className="flex-grow flex justify-center p-[10px] lg:p-0 py-4 sm:py-8">
        <div className="w-full max-w-[1200px]">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
