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
        title="About Samantha Lavrinc, Pittsburgh Full-Stack Developer"
        description="Samantha Lavrinc is a Pittsburgh full-stack developer and designer and the founder of Castle Logic, a woman-owned software studio. From illustration to React, Java, SQL, and NLP pipelines."
        path="/about"
      />

      {/* TITLE SECTION */}
      <section className="max-w-[1200px] mx-auto mb-16 sm:mb-16">
        {/* The hero image carries the visible headline, so the h1 is for
            search engines and screen readers only. */}
        <h1 className="sr-only">About Samantha Lavrinc, Pittsburgh full-stack developer and designer</h1>
        {/* Hero image: its own full-width row, centered, above the values block. */}
        <div className="text-center mx-auto mb-0 sm:mb-2">
          <img
            src={aboutHeroImg}
            alt="Where design meets dev magic"
            className="h-auto mx-auto"
            style={{ width: "clamp(350px, 70vw, 750px)" }}
          />
        </div>

        {/* Values + CTA: centered block, replaces the old photo/bio pairing. */}
        <div className="max-w-[800px] mx-auto text-center space-y-5 sm:space-y-6 pt-3 sm:pt-0">
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-x-10 gap-y-3 sm:gap-y-6">
            <span className="flex flex-row sm:flex-col items-center gap-2 text-castlepurple">
              <LayoutGrid size={28} className="text-castlepink" />
              Clean Architecture
            </span>
            <span className="flex flex-row sm:flex-col items-center gap-2 text-castlepurple">
              <Zap size={28} className="text-castlepink" />
              Practical Problem Solving
            </span>
            <span className="flex flex-row sm:flex-col items-center gap-2 text-castlepurple">
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
        <section className="max-w-[1200px] mx-auto mb-10 sm:mb-16 space-y-6 sm:space-y-8">
          <h2 className="text-3xl sm:text-2xl font-bold text-castlepink text-center tracking-wider">
            A LITTLE ABOUT MY JOURNEY
          </h2>

          <div className="text-castlepurple text-lg sm:text-xl space-y-6 leading-relaxed">
            <p>
              Many moons ago (well, relatively speaking), I started my adult life intending to be a graphic designer and illustrator. That didn't exactly work out, which, personally, I think was probably the universe doing me a favor and redirecting me toward something I'd end up enjoying more.
            </p>

            <p>
              While I was doing graphic design, people were constantly asking me for things outside the scope of making pretty pictures. Websites, functionality, things that required me to apparently moonlight as a webmaster. It became a bit of a low-key annoyance that I could see what people wanted to build but didn't have the skills to build it for them. I wanted to do more than just the visual part.
            </p>

            <p>
              Some of that probably goes back to the era I grew up in. I was part of the first wave of kids with access to Angelfire, GeoCities, and eventually MySpace. The early internet was the wild west. If you had a technical problem, you weren't asking an AI. You were digging through some highly specialized message board you found on page four of a Yahoo search, hoping someone with a username like xXx_DarkWizard92_xXx had encountered the same problem.
            </p>

            <p>
              It was frustrating, but it taught you how to troubleshoot. You learned to follow a problem down whatever rabbit hole it took you into, because somewhere, no matter how obscure the issue, there was probably an answer. I developed some pretty strong problem-solving skills that way.
            </p>

            <p>
              Eventually, the writing was on the wall for illustration as a career. The market was changing, work was becoming increasingly globalized, and a lot of what I did could be done by someone else for considerably less. I needed to figure out what I wanted to do next.
            </p>

            <p>
              My first thought was architecture. Actual buildings, not software architecture. I've always been fascinated by the intersection of design, function, form, materials, and all the systems that have to come together to make something work. Some of that might also be attributable to the unreasonable amount of time I spent building castles in modded Minecraft. When your inventory fills up and you have to run halfway across your base to put things away, suddenly you're thinking about layout and workflow efficiency. Maybe I was just trying to optimize my Minecraft commute.
            </p>

            <p>
              There was just one problem with the architecture idea. I'd already spent enough money figuring out what I didn't want to do. Student loans have a way of making you reconsider things.
            </p>

            <p>
              Fortunately, computers were already pretty familiar territory. My first computer was a Commodore, and I've been around them longer than I've been able to read. I grew up through the Oregon Trail era, typing class in middle school, Microsoft Office introductions in high school, the evolution of the internet and social media, and the transition from 32-bit to 64-bit operating systems (which, if I remember correctly, mostly involved breaking my computer).
            </p>

            <p>
              I'd spent my whole life tinkering with computers and figuring out how things worked. I'd just never considered making a career out of it. So I went back to school for computer science.
            </p>

            <p>
              Since then, I've worked across frontend development, backend architecture, and full-stack engineering, including three years in healthcare technology building clinical NLP pipelines in Java and PostgreSQL. I've worked with hundreds of thousands of patient records, dealt with the joys of messy clinical data, and spent plenty of time figuring out why something that should have worked absolutely did not. More recently, I've been building products from concept through production, including a relationship-mapping app that brought together a lot of my interests in design, engineering, and understanding how people actually use software.
            </p>

            <p>
              Today, Castle Logic is basically all of those things in one place. React, Java, SQL, data pipelines, illustration, design, and whatever else happens to catch my interest. I still care about the visual side of what I build, but I also want to understand everything underneath it. Turns out I just wanted to build the whole thing all along.
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
              I'm a big believer in the 80/20 rule. Not everything needs to be perfect, and not every edge case deserves the same amount of attention. I tend to look at things in terms of effort versus value. A lot of the time, 80% of the value comes from 20% of the work. I've seen people spend days chasing the last 20% of use cases while the other 80% is already working just fine. Sometimes that extra effort is necessary, but knowing where to spend your time is a big part of getting things done.
            </p>

            <h3 className="text-2xl sm:text-xl font-bold text-castlepink text-center tracking-wider pt-4">
              WORKING WITH AI
            </h3>

            <p>
              I've spent the last year building software with AI agents pretty much every day. I don't really subscribe to the idea that AI-generated code is inherently worse than human-written code. Both make mistakes. Humans have limited working memory, forget established patterns, and overlook edge cases. AI has its own problems, but it also has access to a pretty enormous body of programming knowledge. It also helps that AI isn't stuck in the same habits I might have picked up years ago in college from a book on Java 7.
            </p>

            <p>
              My background in healthcare NLP made the transition to working with agents feel pretty natural. A lot of my work at Realyze involved taking things that already existed elsewhere in the codebase and adapting them to new requirements. We'd have an established process for searching a document, identifying concepts within a particular section or sentence, filtering those concepts against some criteria, and doing something slightly different with the results. The underlying logic was already there. The work was understanding it well enough to reuse it.
            </p>

            <p>
              That's not all that different from how I work with AI agents now. I can give an agent an existing implementation, explain what needs to change, and have it adapt the logic to a new requirement. The important part is giving it enough context to understand what it's working with and what the end result should be.
            </p>

            <p>
              Development is iterative regardless. Especially in NLP, you're never going to anticipate every possible input. Somewhere there's a rando describing something in the most Shakespearean way imaginable, and your carefully constructed logic has no idea what to do with it. You make adjustments, encounter new edge cases, and keep improving. I like that AI has been trained on an enormous amount of material that I might not remember in the moment. It can bring established patterns and approaches into the conversation that I might personally overlook.
            </p>

            <p>
              There's an old comic about the difference between what a customer asks for, what sales promises, what engineering builds, and what the customer actually wanted. It's illustrated with a tire swing, and every version looks completely different. I think AI-assisted development is a lot like that. You can have a capable implementation agent and still end up with something completely different from what you intended if the instructions and context aren't there.
            </p>

            <p>
              A big part of my job is closing those gaps. I establish the architecture, break work into manageable pieces, keep project context organized, and give agents enough information to work within the existing system instead of making up their own interpretation. Then I review what comes back, identify what needs fixing, and iterate. Database, unit, and browser tests are as integral a part of that process as they would be for human-engineered code.
            </p>

            <p>
              I don't know exactly where software engineering is headed, but I think there's going to be plenty of work in taking AI-generated software and turning it into something reliable, maintainable, and usable. Writing code is becoming less of a bottleneck. Knowing what needs to be built, recognizing when something is wrong, and knowing how to communicate that to an agent is becoming its own engineering skill.
            </p>

            <p>
              That's the work I enjoy. The tools are different, but I'm still solving problems, figuring out how things fit together, and making sure the end result actually works.
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

          <div className="grid sm:grid-cols-2 gap-5 sm:gap-10 text-center text-castlepurple text-lg sm:text-xl">
            <div className="p-6 border border-castlepink rounded-2xl bg-gray-900 hover:scale-[1.02] transition-transform">
              <h3 className="text-castlepink text-xl mb-2 tracking-wider">Frontend Engineering</h3>
              <p>React, Tailwind, performance optimization, UX/UI patterns, animation, accessibility, and clean component architecture.</p>
            </div>
            <div className="p-6 border border-castlepink rounded-2xl bg-gray-900 hover:scale-[1.02] transition-transform">
              <h3 className="text-castlepink text-xl mb-2 tracking-wider">Backend & Systems</h3>
              <p>Java, TypeScript, SQL/PostgreSQL, authentication, API design, infrastructure planning, and data-driven logic.</p>
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
