import { Link } from "react-router-dom";
import { LayoutGrid, Sparkles, Zap } from "lucide-react";
import Illustrations from "../components/Illustrations";
import SEO from "../components/SEO";
import Reveal from "../components/Reveal";
import aboutHeroImg from "../assets/hero_img/about_hero.png";

export default function About() {
  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-10 pt-10 sm:pt-16 pb-8 sm:pb-12 font-fredoka">
      <SEO
        title="About"
        description="Meet Samantha Lavrinc, a Pittsburgh-based full-stack developer and designer blending clean code, product engineering, and illustrative design at Castle Logic."
        path="/about"
      />

      {/* TITLE SECTION */}
      <section className="max-w-[1200px] mx-auto mb-16 sm:mb-24">
        {/* Hero image: its own full-width row, centered, above the values block. */}
        <div className="text-center mx-auto mb-0 sm:mb-2">
          <img
            src={aboutHeroImg}
            alt="Where design meets dev magic"
            className="h-auto mx-auto"
            style={{ width: "clamp(240px, 70vw, 750px)" }}
          />
        </div>

        {/* Values + CTA: centered block, replaces the old photo/bio pairing. */}
        <div className="max-w-[800px] mx-auto text-center space-y-10 sm:space-y-12">
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-x-10 gap-y-6">
            <span className="flex flex-col items-center gap-2 text-castlepurple">
              <LayoutGrid size={28} className="text-castlepink" />
              Clean Architecture
            </span>
            <span className="flex flex-col items-center gap-2 text-castlepurple">
              <Zap size={28} className="text-castlepink" />
              Practical Problem Solving
            </span>
            <span className="flex flex-col items-center gap-2 text-castlepurple">
              <Sparkles size={28} className="text-castlepink" />
              Thoughtful Design
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link
              to="/projects"
              className="px-6 py-3 border border-castlepink text-castlepink rounded-lg hover-glow-small hover:bg-gray-900 hover:text-castlepurple transition-colors font-semibold"
            >
              View Projects
            </Link>
            <Link
              to="/resume"
              className="text-castlepink hover:text-castlepurple transition-colors underline"
            >
              View Resume
            </Link>
          </div>
        </div>
      </section>

      {/* HISTORY / BACKGROUND SECTION */}
      <Reveal>
        <section className="max-w-[1200px] mx-auto mb-10 sm:mb-16 space-y-8">
          <h2 className="text-3xl sm:text-2xl font-bold text-castlepink text-center tracking-wider">
            A LITTLE ABOUT MY JOURNEY
          </h2>

          <div className="text-castlepurple text-lg sm:text-xl space-y-6 leading-relaxed">

            <p>
              I started in <span className="text-castlepink">graphic design and illustration</span>:
              color palettes, shapes, storytelling, all of it. Over time I got curious about how
              design actually works on the web, which pulled me into frontend development, and
              then backend architecture, and eventually full-stack systems, because I wanted to
              understand the whole thing, not just the part people see.
            </p>

            <p>
              Since then I've worked on product teams and in healthcare tech, pairing visual
              storytelling with real technical engineering. Whether I'm building a front end or
              architecting NLP and ETL logic that turns messy clinical text into clean, structured
              data, the job is the same: bridge the side that looks good with the side that
              actually works, the part users never see but always feel.
            </p>

            <p>
              Today, Castle Logic is everything I care about in one place:
              <span className="text-castlepink"> React, Java, SQL, and data pipelines that turn
                chaos into structure</span>,
              plus illustration and design and the plain goal of building things that actually
              help people.
            </p>
          </div>
        </section>
      </Reveal>

      {/* HOW I WORK */}
      <Reveal>
        <section className="max-w-[1200px] mx-auto mb-10 sm:mb-16 space-y-6">
          <h2 className="text-3xl sm:text-2xl font-bold text-castlepink text-center tracking-wider">
            HOW I WORK
          </h2>

          <div className="text-castlepurple text-lg sm:text-xl space-y-6 leading-relaxed">
            <p>
              I use AI to direct and orchestrate development work the same way a lead engineer
              directs a team. I set the architecture, hand off focused implementation, and review
              everything before it ships. It's the same structured, detail-driven habit I already
              built doing NLP and clinical data pipelines, just applied to how I run multiple
              projects at once now.
            </p>

            <p>
              What AI still can't do is notice the one small thing that actually matters: the edge
              case a client didn't think to mention, the detail that changes how a feature should
              really work. That's the part that's on me. Years spent building tools for
              healthcare, and more recently a therapy insight platform, taught me how to listen
              for what people actually need underneath what they say they want, and turn that into
              something that runs reliably and feels right to use.
            </p>
          </div>
        </section>
      </Reveal>

      {/* FULL STACK FOCUS */}
      <Reveal>
        <section className="max-w-[1200px] mx-auto mb-10 sm:mb-16">
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
              <p>Branding, vector illustration, layouts, print & packaging, and creating visuals that don’t just decorate, they communicate.</p>
            </div>
            <div className="p-6 border border-castlepink rounded-2xl bg-gray-900 hover:scale-[1.02] transition-transform">
              <h3 className="text-castlepink text-xl mb-2 tracking-wider">Bridging Both Worlds</h3>
              <p>Solving problems from both the design and engineering side means faster builds, clearer communication, and polished products.</p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* GALLERY TITLE + Illustrations */}
      <Reveal>
        <section className="max-w-[1200px] mx-auto mb-6 sm:mb-8 text-center">
          <h2 className="text-3xl sm:text-2xl font-bold text-castlepink mb-2 tracking-wider">
            ILLUSTRATION & DESIGN HIGHLIGHTS
          </h2>
          <p className="text-castlepurple text-lg sm:text-xl">
            A small showcase of past work, because creativity is part of the process, not just decoration.
          </p>
        </section>
        <Illustrations />
      </Reveal>

      {/* CTA */}
      <Reveal>
        <section className="text-center max-w-[1200px] mx-auto mt-10 sm:mt-16">
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
      </Reveal>

    </main>
  );
}
