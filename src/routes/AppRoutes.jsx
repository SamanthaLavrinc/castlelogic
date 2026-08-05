import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
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
      <Route path="/" element={<Landing />} />

      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
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
