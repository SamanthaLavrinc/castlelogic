import { useState } from "react";
import { Link } from "react-router-dom";
import { caseStudies } from "../content/case-studies";
import CaseStudyCard from "../components/CaseStudyCard";

export default function Projects() {
  const categories = ["All", ...new Set(caseStudies.map((s) => s.category))];
  const [activeCategory, setActiveCategory] = useState("All");

  const projects = activeCategory === "All"
    ? caseStudies
    : caseStudies.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-10 py-12 font-fredoka">

      {/* Hero / Intro */}
      <section className="max-w-[1200px] mx-auto mb-16 text-center">
        <h1 className="text-4xl sm:text-3xl font-bold text-castlepink mb-4 tracking-wider">
          EXPLORING FULL-STACK, DESIGN, AND UX PROJECTS
        </h1>
        <p className="text-lg sm:text-xl text-castlepurple">
          Here’s a growing collection of experiments, prototypes, and full-stack builds. Each project blends creativity, design, and solid engineering — with a touch of fun and personality.
        </p>
      </section>

      {/* Category Tabs */}
      <section className="max-w-[1200px] mx-auto mb-12 flex justify-center gap-4 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-lg font-semibold transition-all border ${
              activeCategory === cat
                ? "border-castlepink text-castlepink bg-gray-900"
                : "border-gray-700 text-gray-400 hover:border-castlepink hover:text-castlepink"
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Project Cards */}
      <section className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {projects.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </section>

      {/* Call to Action */}
      <section className="text-center max-w-[1200px] mx-auto">
        <p className="text-castlepurple mb-4">Excited to collaborate or see more?</p>
        <Link
          to="/contact"
          className="inline-block px-6 py-3 border border-castlepink text-castlepink rounded-lg hover-glow-small hover:bg-gray-900 hover:text-castlepurple transition-colors"
        >
          Get in Touch
        </Link>
      </section>
    </main>
  );
}
