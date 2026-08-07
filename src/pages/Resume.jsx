import {
  Briefcase,
  GraduationCap,
  User,
  Download,
  Star,
  Github,
  Linkedin,
} from "lucide-react";
import Skills from "../components/Skills";
import Timeline from "../components/Timeline";
import SEO from "../components/SEO";
import Reveal from "../components/Reveal";
import frontendPDF from "../assets/resume/Lavrinc-frontend.pdf";
import backendPDF from "../assets/resume/Lavrinc-backend.pdf";

export default function Resume() {

  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-10 py-8 sm:py-12 font-fredoka">
      <SEO
        title="Resume"
        description="Samantha Lavrinc's resume: Pittsburgh-based Software Engineer with backend development experience and a design background dating back to 2006. Java, SQL, React, and TypeScript."
        path="/resume"
      />

      {/* --- Header Banner --- */}
      <section className="max-w-[1200px] mx-auto text-center mb-8 sm:mb-12">
        <h1 className="text-4xl font-bold mb-1 tracking-wide">SAMANTHA LAVRINC</h1>
        <p className="text-castlepurple text-base font-light mb-4">
          Founder & Lead Software Engineer – Castle Logic LLC
        </p>
        <div className="w-12 h-[1px] bg-castlepink mx-auto mb-4"></div>

        <div className="flex justify-center gap-4">
          <a
            href="https://www.linkedin.com/in/slavrinc/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 rounded-xl border border-castlepink hover-glow-small text-castlepink hover:bg-gray-800 hover:text-castlepurple transition-all"
          >
            <Linkedin size={18} />
            LinkedIn
          </a>

          <a
            href="https://github.com/SamanthaLavrinc"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 rounded-xl border border-castlepink hover-glow-small text-castlepink hover:bg-gray-800 hover:text-castlepurple transition-all"
          >
            <Github size={18} />
            GitHub
          </a>
        </div>
      </section>

      {/* --- Summary Section --- */}
      <Reveal>
        <section className="max-w-[1200px] mx-auto mb-8 sm:mb-12">
          <h2 className="flex items-center gap-3 text-3xl font-bold text-castlepink mb-5 tracking-wider justify-center">
            <User size={28} /> SUMMARY
          </h2>
          <p className="text-castlepurple text-xl leading-relaxed">
            Pittsburgh-based Software Engineer with hands-on backend development experience and a
            design background that goes back to 2006. I work in Java, SQL, and CI/CD pipelines,
            and I'm equally comfortable in React, TypeScript, and component-driven front-end
            development. I care about the same thing on both sides: interfaces that are intuitive
            and backend systems that actually hold up. Formally trained in both software
            engineering and design.
          </p>
        </section>
      </Reveal>

      {/* --- Experience Timeline --- */}
      <Reveal>
        <section className="max-w-[1200px] mx-auto mb-8 sm:mb-12">
          <h2 className="flex items-center gap-3 text-3xl font-bold text-castlepink mb-5 tracking-wider justify-center">
            <Briefcase size={28} /> EXPERIENCE
          </h2>
          <Timeline />
        </section>
      </Reveal>

      {/* --- Education --- */}
      <Reveal>
        <section className="max-w-[1200px] mx-auto mb-8 sm:mb-12">
          <h2 className="flex items-center gap-3 text-3xl font-bold text-castlepink mb-5 tracking-wider justify-center">
            <GraduationCap size={28} /> EDUCATION
          </h2>
          <div className="space-y-6 text-castlepurple">
            <div>
              <h3 className="text-xl font-semibold text-white">
                Bachelor of Science – Computer Science
              </h3>
              <p>University of Pittsburgh</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                Associate of Science – Computer Information Systems
              </h3>
              <p>Community College of Allegheny County</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                Advanced Certificate – Commercial Art
              </h3>
              <p>A.W. Beattie Career Center</p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* --- Skills Section --- */}
      <Reveal>
        <section className="max-w-[1200px] mx-auto mb-8 sm:mb-12">
          <h2 className="flex items-center gap-3 text-3xl font-bold text-castlepink mb-5 tracking-wider justify-center">
            <Star size={28} /> SKILLS
          </h2>
          <Skills />
        </section>
      </Reveal>

      {/* --- Download Buttons --- */}
      <Reveal>
        <section className="max-w-[1200px] mx-auto text-center mb-8 sm:mb-12">
          <h2 className="flex items-center gap-3 text-2xl sm:text-3xl font-bold text-castlepink mb-5 tracking-wider justify-center">
            <Download size={26} /> RESUME
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={frontendPDF}
              download
              className="px-6 py-3 border border-castlepink hover-glow-small text-castlepink rounded-lg hover:bg-gray-800 hover:text-castlepurple transition-colors"
            >
              Front-End & UX
            </a>
            <a
              href={backendPDF}
              download
              className="px-6 py-3 border border-castlepink hover-glow-small text-castlepink rounded-lg hover:bg-gray-800 hover:text-castlepurple transition-colors"
            >
              Backend Engineering
            </a>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
