import { Link } from "react-router-dom";
import Illustrations from "../components/Illustrations";

export default function About() {
  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-10 py-12 font-fredoka">

      {/* TITLE SECTION */}
      <section className="max-w-[1200px] mx-auto mb-12 text-center">
        <h1 className="text-4xl sm:text-3xl font-bold text-castlepink mb-4 tracking-wide">
          WHERE DESIGN MEETS DEV MAGIC
        </h1>
        <p className="text-lg sm:text-xl text-castlepurple max-w-[1200px] mx-auto">
          I'm Sam — a full-stack developer and designer who believes great digital experiences 
          happen when aesthetics, architecture, and usability all work together. 
          Castle Logic is the place where my love for clean code, problem-solving, 
          and vibrant illustrative design all collide.
        </p>
      </section>

      {/* HISTORY / BACKGROUND SECTION */}
      <section className="max-w-[1200px] mx-auto mb-12 space-y-8">
        <h2 className="text-3xl sm:text-2xl font-bold text-castlepink text-center tracking-wider">
          A LITTLE ABOUT MY JOURNEY
        </h2>

        <div className="text-castlepurple text-lg sm:text-xl space-y-6 leading-relaxed">

          <p>
            I started in the world of <span className="text-castlepink">graphic design and illustration</span> — 
            color palettes, shapes, storytelling, the whole deal. Over time I became 
            fascinated by how design interacts with the web, which led me 
            straight into frontend development… and then, inevitably, backend 
            architecture and full-stack systems.
          </p>

          <p>
            I’ve since spent my career in product teams and healthcare tech orgs, pairing visual storytelling with 
            deep technical engineering. Whether building front-end experiences or architecting NLP and ETL logic 
            that turns chaotic clinical text into clean, structured JSON, I’ve learned how to bridge the “looks good” 
            side of software with the “runs flawlessly” side that users never see — but always feel.
          </p>

          <p>
            Today, Castle Logic pulls together everything I love: 
            <span className="text-castlepink"> React, Tailwind/CSS, Java, JavaScript, SQL, and designing data pipelines that 
              turn chaos into structure</span>, 
            along with illustration, design, and creating things that genuinely help people.
          </p>
        </div>
      </section>

      {/* FULL STACK FOCUS */}
      <section className="max-w-[1200px] mx-auto mb-12">
        <h2 className="text-3xl sm:text-2xl font-bold text-castlepink mb-6 text-center tracking-wider">
          WHAT I DO AS A FULL-STACK DEVELOPER
        </h2>

        <div className="grid sm:grid-cols-2 gap-10 text-center text-castlepurple text-lg sm:text-xl">
          <div className="p-6 border border-castlepink rounded-2xl bg-gray-900 hover:scale-[1.02] transition-transform">
            <h3 className="text-castlepink text-xl mb-2 tracking-wider">Frontend Engineering</h3>
            <p>React, Tailwind, performance optimization, UX/UI patterns, animation, accessibility, and clean component architecture.</p>
          </div>
          <div className="p-6 border border-castlepink rounded-2xl bg-gray-900 hover:scale-[1.02] transition-transform">
            <h3 className="text-castlepink text-xl mb-2 tracking-wider">Backend & Systems</h3>
            <p>Java, Typescript, SQL/PostgreSQL, authentication, API design, infrastructure planning, and data-driven logic.</p>
          </div>
          <div className="p-6 border border-castlepink rounded-2xl bg-gray-900 hover:scale-[1.02] transition-transform">
            <h3 className="text-castlepink text-xl mb-2 tracking-wider">Design & Illustration</h3>
            <p>Branding, vector illustration, layouts, print & packaging, and creating visuals that don’t just decorate — they communicate.</p>
          </div>
          <div className="p-6 border border-castlepink rounded-2xl bg-gray-900 hover:scale-[1.02] transition-transform">
            <h3 className="text-castlepink text-xl mb-2 tracking-wider">Bridging Both Worlds</h3>
            <p>Solving problems from both the design and engineering side means faster builds, clearer communication, and polished products.</p>
          </div>
        </div>
      </section>

      {/* GALLERY TITLE */}
      <section className="max-w-[1200px] mx-auto mb-8 text-center">
        <h2 className="text-3xl sm:text-2xl font-bold text-castlepink mb-2 tracking-wider">
          ILLUSTRATION & DESIGN HIGHLIGHTS
        </h2>
        <p className="text-castlepurple text-lg sm:text-xl">
          A small showcase of past work — because creativity is part of the process, not just decoration.
        </p>
      </section>

      {/* Illustration component */}
      <Illustrations />

      {/* CTA */}
      <section className="text-center max-w-[1200px] mx-auto mt-16">
        <p className="text-castlepurple mb-4 text-lg">
          Want to collaborate, build something new, or talk about an idea?
        </p>
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
