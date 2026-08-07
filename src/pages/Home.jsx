import { Link } from "react-router-dom";
import { caseStudies } from "../content/case-studies";
import CaseStudyCard from "../components/CaseStudyCard";
import SEO from "../components/SEO";
import Reveal from "../components/Reveal";

export default function Home() {
  const featured = caseStudies.slice(0, 3);

  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-4 py-8 sm:py-12 font-fredoka relative z-0">
      <SEO
        title="Home"
        description="Pittsburgh-based full-stack software engineer and designer building beautiful experiences on powerful foundations. React, Java, SQL, and NLP data pipelines."
        path="/home"
      />
      {/* Hero Section */}
      <section className="text-center max-w-[1200px] mx-auto mb-10 sm:mb-16 relative z-10">
        <h1 className="text-4xl sm:text-2xl font-bold text-castlepink mb-4 tracking-wider">
          BUILDING BEAUTIFUL EXPERIENCES ON POWERFUL FOUNDATIONS
        </h1>
        <p className="text-lg sm:text-xl text-castlepurple">
          At Castle Logic, design and engineering are the same job to me. I'm a Pittsburgh-based full-stack developer with a background in UX/UI, Java backend systems, NLP pipelines, and structured data. I build things that look good and actually hold up.
        </p>
        <br />
        <p className="mt-4 text-castlepurple">
          Explore the portfolio below and see how design and technology intersect to solve real challenges.
        </p>
      </section>

      {/* Featured Project Cards */}
      <Reveal>
        <section className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 relative z-10 px-4">
          {featured.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </section>

        <div className="text-center mb-10 sm:mb-16 relative z-10">
          <Link to="/projects" className="text-castlepink hover:text-castlepurple transition-colors">
            See all projects →
          </Link>
        </div>
      </Reveal>

      {/* About / Expertise Section */}
      <Reveal>
        <section className="max-w-[1200px] mx-auto text-center mb-10 sm:mb-16 relative z-10">
          <h2 className="text-2xl font-bold text-castlepink mb-4 tracking-wider">WHAT CASTLE LOGIC CAN DO</h2>
          <p className="text-castlepurple text-lg sm:text-xl">
            Castle Logic builds full-stack, end-to-end solutions: intuitive interfaces backed by real backend logic, data workflows, and system architecture. Whether it’s React on the surface or Java, SQL, and NLP pipelines underneath, every project blends creativity with solid engineering.
          </p>
        </section>
      </Reveal>

      {/* Call to Action */}
      <Reveal>
        <section className="text-center max-w-[1200px] mx-auto relative z-10">
          <p className="text-castlepurple mb-4">Interested in collaborating?</p>
          <Link
            to="/contact"
            className="inline-block px-6 py-3 border border-castlepink text-castlepink rounded-lg hover-glow-small hover:bg-gray-900 hover:text-castlepurple transition-colors"
          >
            Get in Touch
          </Link>
        </section>
      </Reveal>
    </main>
  );
}
