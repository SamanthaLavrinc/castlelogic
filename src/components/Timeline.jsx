import { useState } from "react";
import { ChevronRight, ChevronDown, Briefcase } from "lucide-react";

export default function Timeline() {
  // Array of open card indexes
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggle = (i) => {
    if (openIndexes.includes(i)) {
      // Remove the index to collapse
      setOpenIndexes(openIndexes.filter((idx) => idx !== i));
    } else {
      // Add the index to expand
      setOpenIndexes([...openIndexes, i]);
    }
  };

  const timeline = [
    {
      title: "Founder & Software Engineer",
      company: "Castle Logic LLC",
      date: "Oct 2025 – Present",
      bullets: [
        "Architected and developed a relationship mapping platform for therapists, translating client requirements into a scalable graph-based web application.",
        "Designed the system architecture, relational database schema, and graph data model to represent and visualize complex interpersonal relationships.",
        "Implemented application architecture, graph data layer, and database operations using React, PostgreSQL, and Supabase.",
        "Partnered directly with clients to define requirements, prioritize features, and deliver iterative software solutions aligned with business objectives.",
        "Led end-to-end software development from architecture through deployment."
      ],
    },
    {
      title: "Software Engineer – NLP & Clinical Informatics",
      company: "Realyze Intelligence - Carta Healthcare",
      date: "Oct 2022 – Oct 2025",
      bullets: [
"Developed and maintained multi-layer NLP pipelines leveraging Apache cTAKES, Java, and PostgreSQL to transform unstructured clinical text into FHIR-compliant structured data, supporting scalable healthcare applications.",
        "Enhanced finite-state machines and regex-based detection systems to improve extraction of clinical dates, measurements, and terminology, boosting accuracy and efficiency across pipelines.",
        "Designed extensible NLP components and backend logic enabling rule-based inference, cross-entity coordination, and robust data validation.",
        "Implemented comprehensive JUnit testing and CI/CD workflows to ensure consistency, maintainability, and regression prevention across large production datasets.",
        "Collaborated with clinical leadership to translate complex oncology trial protocols into precise technical logic, data models, and reusable value sets.",
        "Assumed ownership of pipeline stability and accuracy during team transitions, ensuring uninterrupted delivery of high-quality clinical outputs.",
        "Partnered with product and UX teams to refine frontend workflows, enhance UI clarity, and iterate on prototypes using Figma, improving usability and end-user satisfaction.",
        "Integrated front-end visualization and reporting components with backend data pipelines to provide intuitive, actionable insights for clinical and research stakeholders."
      ],
    },
    {
      title: "Software Engineer Intern – Information Services",
      company: "UPMC",
      date: "Jun 2021 – Aug 2021",
      bullets: [
        "Redesigned Azure DevOps CI/CD pipelines to support separated review and production lifecycles, improving deployment reliability and workflow clarity.",
        "Converted legacy Classic pipelines to YAML for cleaner version control, enhanced automation, and alignment with Agile workflows.",
        "Gained hands-on experience with C#, HIPAA security requirements, and Azure deployment practices, ensuring compliant and scalable solutions."
      ],
    },
    {
      title: "Freelance Illustrator & Graphic Designer",
      company: "Self-Employed",
      date: "2011 – 2015",
      bullets: [
        "Produced digital and traditional commissioned artworks for commercial and individual clients, managing projects end-to-end from initial consultations through final delivery.",
        "Designed logos, branding systems, and layout assets with a strong emphasis on composition, balance, and typography, ensuring visual consistency across mediums.",
        "Served as the primary creative lead and project owner, coordinating client requirements, developing mockups, iterating on feedback, and delivering polished final designs.",
        "Created structured SOWs outlining deliverables, timelines, revisions, and project scope to ensure alignment and clear expectations.",
        "Managed all aspects of freelance operations including client communication, creative direction, revisions, and final asset handoff."
      ],
    },
  ];

  return (
      <div className="space-y-6">
        {timeline.map((job, index) => (
          <div
            key={index}
            className="group bg-gray-900 rounded-lg p-4 shadow-md transition-all cursor-pointer"
            onClick={() => toggle(index)}
          >
            {/* Top row: collapse icon, title, and date */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-1">
              <div className="flex items-center gap-2">
                {/* Chevron */}
                {openIndexes.includes(index) ? (
                  <ChevronDown className="text-castlepink transition-all shrink-0" size={24} />
                ) : (
                  <ChevronRight className="text-castlepink transition-all shrink-0" size={24} />
                )}
                <h3 className="text-xl font-semibold text-white">{job.title}</h3>
              </div>
              <p className="text-lg font-semibold text-white sm:shrink-0">{job.date}</p>
            </div>

            {/* Company */}
            <p className="text-lg ml-8 text-castlepurple mb-2">{job.company}</p>

            {/* Collapsible bullets */}
            <div
              className={`transition-all overflow-hidden relative pl-6 ${
                openIndexes.includes(index) ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {/* Vertical timeline line */}
              <div className="absolute left-2 top-3 bottom-0 w-[2px] bg-castlepink"></div>

              <ul className="text-md list-disc pl-6 text-castlepurple space-y-2 pt-2 relative z-10">
                {job.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
  );
}
