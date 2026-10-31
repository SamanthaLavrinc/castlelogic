import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Reveal from "../components/Reveal";

const services = [
  {
    title: "Web Apps",
    body: "Custom web applications with React on the front and Java, TypeScript, or SQL behind it. Logins, dashboards, databases, billing, the whole thing.",
  },
  {
    title: "Websites",
    body: "Fast, responsive websites for small businesses and personal brands, built so they load quickly and search engines can actually read them.",
  },
  {
    title: "Backend & Data",
    body: "APIs, databases, and data pipelines, including NLP work that turns messy text into structured data. A lot of my background is in healthcare data.",
  },
  {
    title: "Design & Branding",
    body: "UX/UI design, illustration, logos, and branding. I've been doing design since 2006, so the thing I build is designed by the same person who builds it.",
  },
];

const steps = [
  "We talk through what you actually need, not just what the first idea was.",
  "I put together a scoped plan so you know what's being built before work starts.",
  "We build it in stages, so you see progress the whole way instead of one big reveal at the end.",
  "It launches, and I can keep maintaining it or hand it off cleanly.",
];

const faqs = [
  {
    q: "Do you work with small businesses in Pittsburgh?",
    a: "Yes. Castle Logic is based in Pittsburgh, and I work with local businesses as well as clients outside the city.",
  },
  {
    q: "Can you design it and build it?",
    a: "Yes. I do both, which means there's no handoff between a designer and a developer where details get lost.",
  },
  {
    q: "What does a project cost?",
    a: "It depends on the scope. After we talk, I'll send a scoped plan with a price before any work starts.",
  },
  {
    q: "Are you open to full-time roles?",
    a: "Yes. I'm open to full-time positions as well as contract work. My resume has the details.",
  },
];

export default function Services() {
  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-10 pt-10 sm:pt-16 pb-8 sm:pb-12 font-fredoka">
      <SEO
        title="Pittsburgh Software Developer for Web Apps, Websites & Data"
        description="Castle Logic is a woman-owned software and design studio in Pittsburgh. Samantha Lavrinc designs and builds web apps, websites, backends, and data pipelines for Pittsburgh businesses and teams."
        path="/services"
      />

      <section className="max-w-[800px] mx-auto text-center mb-10 sm:mb-16">
        <h1 className="text-4xl sm:text-3xl font-bold text-castlepink mb-4 tracking-wider">
          SOFTWARE DEVELOPMENT IN PITTSBURGH
        </h1>
        <p className="text-castlepurple text-lg sm:text-xl leading-relaxed">
          I'm Samantha Lavrinc, a full-stack developer and designer in Pittsburgh, and Castle Logic
          is my woman-owned studio. I build web apps, websites, and the backend and data work underneath them.
          I design them too, so you're not handing a mockup to someone else and hoping it survives.
        </p>
      </section>

      <Reveal>
        <section className="max-w-[1200px] mx-auto mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-2xl font-bold text-castlepink mb-6 text-center tracking-wider">
            WHAT I BUILD
          </h2>
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-10 text-center text-castlepurple text-lg sm:text-xl">
            {services.map((service) => (
              <div
                key={service.title}
                className="p-6 border border-castlepink rounded-2xl bg-gray-900 hover:scale-[1.02] transition-transform"
              >
                <h3 className="text-castlepink text-xl mb-2 tracking-wider">{service.title}</h3>
                <p>{service.body}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="max-w-[1200px] mx-auto mb-10 sm:mb-16 space-y-6">
          <h2 className="text-3xl sm:text-2xl font-bold text-castlepink text-center tracking-wider">
            WHO I WORK WITH
          </h2>
          <div className="text-castlepurple text-lg sm:text-xl space-y-6 leading-relaxed">
            <p>
              Pittsburgh small businesses that need a site or an app that works. Startups that need
              one person who can design and build. Teams with a data problem, especially healthcare
              data, where the structure underneath matters as much as the screen on top.
            </p>
            <p>
              I'm also open to full-time and contract roles. If you're hiring, the{" "}
              <Link to="/resume" className="text-castlepink hover:text-castlepurple underline">
                resume
              </Link>{" "}
              is the place to start, and the{" "}
              <Link to="/projects" className="text-castlepink hover:text-castlepurple underline">
                projects
              </Link>{" "}
              show the work.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="max-w-[800px] mx-auto mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-2xl font-bold text-castlepink mb-6 text-center tracking-wider">
            HOW A PROJECT GOES
          </h2>
          <ol className="space-y-4 text-castlepurple text-lg sm:text-xl">
            {steps.map((step, i) => (
              <li key={step} className="flex gap-4 items-start">
                <span className="shrink-0 w-9 h-9 rounded-full border border-castlepink text-castlepink flex items-center justify-center font-bold">
                  {i + 1}
                </span>
                <span className="pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      </Reveal>

      <Reveal>
        <section className="max-w-[800px] mx-auto mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-2xl font-bold text-castlepink mb-6 text-center tracking-wider">
            QUESTIONS
          </h2>
          <div className="space-y-5">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="text-castlepink text-xl mb-1 tracking-wide">{faq.q}</h3>
                <p className="text-castlepurple text-lg">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="text-center max-w-[1200px] mx-auto">
          <p className="text-castlepurple mb-4 text-lg">Have a project in mind, or a role to fill?</p>
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
