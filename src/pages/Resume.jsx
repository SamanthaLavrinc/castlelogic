import {
  Briefcase,
  GraduationCap,
  User,
  Download,
  Star,
  Github,
  Linkedin,
  Zap,
} from "lucide-react";
import Skills from "../components/Skills";
import Timeline from "../components/Timeline";
import SEO from "../components/SEO";
import Reveal from "../components/Reveal";
import resumePDF from "../assets/resume/Lavrinc-resume.pdf";
import pfpResume from "../assets/pfp/pfp-resume.png";

export default function Resume() {

  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-10 py-8 sm:py-12 font-fredoka">
      <SEO
        title="Resume"
        description="Samantha Lavrinc's resume: Pittsburgh-based Software Engineer with backend development experience and a design background dating back to 2006. Java, SQL, React, and TypeScript."
        path="/resume"
      />

      {/* --- Header Banner --- */}
      <section className="max-w-[1200px] mx-auto">
        <div className="max-w-[900px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 text-center sm:text-left">
          <div className="relative shrink-0 w-40 sm:w-48 lg:w-52">
            <div
              className="absolute -inset-5 bg-castlepink/15 rounded-[2rem] blur-2xl -z-10"
              aria-hidden="true"
            />
            <img
              src={pfpResume}
              alt="Samantha Lavrinc"
              className="w-full h-auto object-cover object-top rounded-2xl shadow-[0_0_32px_rgba(203,144,255,0.18)]"
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-wide">SAMANTHA LAVRINC</h1>
            <p className="text-castlepurple text-lg sm:text-xl font-light">
              Founder & Lead Software Engineer – Castle Logic LLC
            </p>
            <div className="w-16 h-[2px] bg-castlepink mx-auto sm:mx-0"></div>

            <div className="flex flex-wrap justify-center sm:justify-start gap-4 pt-1">
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
          </div>
        </div>
      </section>

      {/* --- Divider --- */}
      <div
        className="max-w-[1200px] mx-auto flex items-center gap-4 py-12"
        aria-hidden="true"
      >
        <div className="flex-1 h-px bg-castlepink opacity-40" />
        <Zap
          size={16}
          className="shrink-0 text-castlepink drop-shadow-[0_0_5px_rgba(255,70,162,0.5)]"
        />
        <div className="flex-1 h-px bg-castlepink opacity-40" />
      </div>

      {/* --- Summary Section --- */}
      <Reveal>
        <section className="max-w-[1200px] mx-auto mb-8 sm:mb-12">
          <h2 className="flex items-center gap-3 text-3xl font-bold text-castlepink mb-5 tracking-wider justify-center">
            <User size={28} /> SUMMARY
          </h2>
          <p className="text-castlepurple text-xl leading-relaxed">
            Software engineer with a design background who enjoys building software that's as
            intuitive for users as it is reliable behind the scenes. Based in Pittsburgh, I have
            hands-on experience building backend systems in Java, SQL, and CI/CD pipelines, while
            also designing and developing modern React and TypeScript interfaces. Whether I'm
            working on the frontend or backend, I approach problems the same way: build something
            that's thoughtful, maintainable, and solves the right problem. Formally trained in
            both software engineering and design.
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

      {/* --- Skills Section --- */}
      <Reveal>
        <section className="max-w-[1200px] mx-auto mb-8 sm:mb-12">
          <h2 className="flex items-center gap-3 text-3xl font-bold text-castlepink mb-5 tracking-wider justify-center">
            <Star size={28} /> SKILLS
          </h2>
          <Skills />
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

      {/* --- Download Buttons --- */}
      <Reveal>
        <section className="max-w-[1200px] mx-auto text-center mb-8 sm:mb-12">
          <h2 className="flex items-center gap-3 text-2xl sm:text-3xl font-bold text-castlepink mb-5 tracking-wider justify-center">
            <Download size={26} /> RESUME
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={resumePDF}
              download
              className="px-6 py-3 border border-castlepink hover-glow-small text-castlepink rounded-lg hover:bg-gray-800 hover:text-castlepurple transition-colors"
            >
              Download Resume
            </a>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
