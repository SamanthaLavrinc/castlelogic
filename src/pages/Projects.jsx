import { useState } from "react";
import { Link } from "react-router-dom";

export default function Projects() {
  const categories = ["All", "Full-Stack", "Design", "UI Experiments"];
  const [activeCategory, setActiveCategory] = useState("All");

  const allProjects = [
    {
      title: "CastleDocs",
      category: "Full-Stack",
      desc: "AI-assisted documentation engine mapping components, architecture, and relationships.",
    },
    {
      title: "Clinical ETL Pipeline",
      category: "Full-Stack",
      desc: "Transforms unstructured clinical records into structured JSON for downstream analytics.",
    },
    {
      title: "UX Lab",
      category: "UI Experiments",
      desc: "Collection of UI/interaction experiments exploring layout, hierarchy, and motion.",
    },
    {
      title: "Illustration Showcase",
      category: "Design",
      desc: "Graphic and illustration work demonstrating composition, color theory, and personality.",
    },
  ];

  const projects = activeCategory === "All"
    ? allProjects
    : allProjects.filter((p) => p.category === activeCategory);

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
        {projects.map((proj) => (
          <div
            key={proj.title}
            className="bg-gray-900 border border-castlepink rounded-lg p-6 hover:scale-[1.03] transform transition-transform duration-300"
          >
            <h2 className="text-xl font-bold text-castlepink mb-2">{proj.title}</h2>
            <p className="text-castlepurple">{proj.desc}</p>
            <Link
              to="#"
              className="inline-block mt-4 px-4 py-2 border border-castlepink text-castlepink rounded-lg hover-glow-small hover:bg-gray-900 hover:text-castlepurple transition-colors"
            >
              Details coming soon
            </Link>
          </div>
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
