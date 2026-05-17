import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-4 py-12 font-fredoka relative z-0">
      {/* Hero Section */}
      <section className="text-center max-w-[1200px] mx-auto mb-16 relative z-10">
        <h1 className="text-4xl sm:text-2xl font-bold text-castlepink mb-4 tracking-wider">
          BUILDING BEAUTIFUL EXPERIENCES ON POWERFUL FOUNDATIONS
        </h1>
        <p className="text-lg sm:text-xl text-castlepurple">
          At Castle Logic, design meets engineering. With a background in UX/UI, Java backend systems, NLP pipelines, and structured data transformation, I build experiences that look great and run on clean, scalable logic.
        </p>
        <br />
        <p className="mt-4 text-castlepurple">
          Explore the portfolio below and see how design and technology intersect to solve real challenges.
        </p>
      </section>

      {/* Placeholder Project Cards */}
      <section className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 relative z-10 px-4">
        {["Project 1", "Project 2", "Project 3"].map((proj) => (
          <div 
            key={proj} 
            className="w-full max-w-[calc(99%-1rem)] bg-gray-900 border border-castlepink rounded-lg p-6 hover:scale-105 transform transition-transform duration-300 mx-auto"
          >
            <h2 className="text-xl font-bold text-castlepink mb-2">{proj}</h2>
            <p className="text-castlepurple">
              Placeholder description for {proj}. This will eventually showcase UX/UI and graphic design work.
            </p>
            <Link 
              to="/projects" 
              className="inline-block mt-4 text-castlepink hover:text-white transition-colors"
            >
              See more
            </Link>
          </div>
        ))}
      </section>

      {/* About / Expertise Section */}
      <section className="max-w-[1200px] mx-auto text-center mb-16 relative z-10">
        <h2 className="text-2xl font-bold text-castlepink mb-4 tracking-wider">WHAT CASTLE LOGIC CAN DO</h2>
        <p className="text-castlepurple text-lg sm:text-xl">
          Castle Logic delivers full-stack, end-to-end solutions — from intuitive interfaces to the backend logic, data workflows, and system architecture that power them. Whether it’s React on the surface or Java, SQL, and NLP pipelines under the hood, every project blends creativity with solid engineering.
        </p>
      </section>

      {/* Call to Action */}
      <section className="text-center max-w-[1200px] mx-auto relative z-10">
        <p className="text-castlepurple mb-4">Interested in collaborating?</p>
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
