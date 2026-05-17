import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TEMPORARY -- replace this with EmailJS / Formspree
    console.log("Form submitted:", form);

    alert("Your message has been sent!");

    // Clear form
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="bg-black text-white px-4 sm:px-10 py-16 font-fredoka flex justify-center">
      <div
        className="
          w-full max-w-[700px] 
          bg-gray-900 p-10 rounded-2xl 
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
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-black border border-castlepink text-white focus:outline-none focus:ring-2 focus:ring-castlepink"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-castlepink font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-black border border-castlepink text-white focus:outline-none focus:ring-2 focus:ring-castlepink"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-1 text-castlepink font-semibold">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="6"
              className="w-full px-4 py-3 rounded-lg bg-black border border-castlepink text-white resize-none focus:outline-none focus:ring-2 focus:ring-castlepink"
              required
            ></textarea>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="mt-4 px-6 py-3 rounded-lg border border-castlepink text-castlepink hover:bg-gray-800 hover:text-castlepurple transition-all hover-glow-small text-lg font-semibold"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}
