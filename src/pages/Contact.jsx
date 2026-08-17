import { useForm, ValidationError } from "@formspree/react";
import { Zap } from "lucide-react";
import SEO from "../components/SEO";

export default function Contact() {
  const [state, handleSubmit] = useForm("xaewweej", {
    data: { _subject: "[Castle Logic Contact] New website message" },
  });

  return (
    <main className="bg-black text-white px-4 sm:px-10 py-10 sm:py-16 font-fredoka flex flex-col items-center">
      <SEO
        title="Contact"
        description="Have a project in mind? Get in touch with Samantha Lavrinc at Castle Logic."
        path="/contact"
      />

      {/* Intro / pitch */}
      <div className="w-full max-w-[700px] text-center mb-10 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-castlepink mb-4 tracking-wider">
          LET'S BUILD SOMETHING TOGETHER
        </h2>
        <p className="text-castlepurple text-lg">
          I'm open to full-time roles and contract work alike. If you're hiring, I'd love to
          hear about the role. If you've got a project in mind, here's roughly how it goes: we
          talk through what you actually need, I put together a scoped plan, and we build it
          iteratively, so you're never waiting for one big reveal at the end.
        </p>
      </div>

      {/* --- Divider --- */}
      <div
        className="w-full max-w-[700px] flex items-center gap-4 mb-10 sm:mb-10"
        aria-hidden="true"
      >
        <div className="flex-1 h-px bg-castlepink opacity-40" />
        <Zap
          size={16}
          className="shrink-0 text-castlepink spark-ignite"
        />
        <div className="flex-1 h-px bg-castlepink opacity-40" />
      </div>

      <div
        className="
          w-full max-w-[700px]
          bg-gray-900 p-6 sm:p-10 rounded-2xl
          border border-castlepink shadow-xl

          /* FIX: boxed container height behavior */
          max-h-[900px]
          overflow-auto
        "
      >
        {/* Title */}
        <h1 className="text-4xl font-bold text-castlepink text-center mb-6 tracking-wider">
          CONTACT ME
        </h1>

        {state.succeeded ? (
          <p className="text-center text-castlepurple text-lg py-10">
            Thanks, your message is on its way. I'll get back to you soon!
          </p>
        ) : (
          <>
            <p className="text-center text-castlepurple mb-10 text-lg">
              Have a project in mind or just want to say hello?
              Send me a message below!
            </p>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name */}
              <div>
                <label className="block mb-1 text-castlepink font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-castlepink text-white focus:outline-none focus:ring-2 focus:ring-castlepink"
                  required
                />
                <ValidationError
                  prefix="Name"
                  field="name"
                  errors={state.errors}
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 text-castlepink font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-castlepink text-white focus:outline-none focus:ring-2 focus:ring-castlepink"
                  required
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block mb-1 text-castlepink font-semibold">Message</label>
                <textarea
                  name="message"
                  rows="6"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-castlepink text-white resize-none focus:outline-none focus:ring-2 focus:ring-castlepink"
                  required
                ></textarea>
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={state.submitting}
                className="mt-4 px-6 py-3 rounded-lg border border-castlepink text-castlepink hover:bg-gray-800 hover:text-castlepurple transition-all hover-glow-small text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state.submitting ? "Sending..." : "Send Message"}
              </button>

              <ValidationError errors={state.errors} className="text-red-400 text-sm text-center" />
            </form>
          </>
        )}
      </div>
    </main>
  );
}
