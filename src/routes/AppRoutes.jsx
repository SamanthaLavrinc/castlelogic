import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Projects from "../pages/Projects";
import CaseStudyDetail from "../pages/CaseStudyDetail";
import About from "../pages/About";
import Resume from "../pages/Resume";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<CaseStudyDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>

    </Routes>
  );
}
