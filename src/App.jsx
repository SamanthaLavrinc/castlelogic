import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
import AppRoutes from "./routes/AppRoutes";
import "./styles/global.css";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Analytics />
    </HelmetProvider>
  );
}