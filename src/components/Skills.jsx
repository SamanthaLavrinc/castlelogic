import { useState } from "react";

export default function Skills() {
  const skills = [
    // --- FRONTEND ---
    { name: "React", level: 4, category: "frontend" },
    { name: "Tailwind", level: 4, category: "frontend" },
    { name: "HTML5", level: 5, category: "frontend" },
    { name: "CSS3", level: 5, category: "frontend" },
    { name: "JavaScript", level: 4, category: "frontend" },
    { name: "TypeScript", level: 4, category: "frontend" },
    { name: "Angular", level: 3, category: "frontend" },
    { name: "NodeJS", level: 3, category: "frontend" },
    { name: "Responsive Web Design", level: 4, category: "frontend" },
    { name: "Vite", level: 3, category: "frontend" },

    // --- BACKEND ---
    { name: "Java", level: 5, category: "backend" },
    { name: "SQL", level: 5, category: "backend" },
    { name: "PostgreSQL", level: 5, category: "backend" },
    { name: "Supabase", level: 4, category: "backend" },
    { name: "Python", level: 3, category: "backend" },
    { name: "Software Architecture", level: 5, category: "backend" },
    { name: "REST APIs", level: 4, category: "backend" },
    { name: "Database Administration", level: 4, category: "backend" },
    { name: "ETL/Data Integration", level: 3, category: "backend" },
    { name: "JSON/Serialization", level: 3, category: "backend" },

    // --- WORKFLOW ---
    { name: "Agile/Scrum", level: 4, category: "workflow" },
    { name: "Jira", level: 4, category: "workflow" },
    { name: "Confluence", level: 4, category: "workflow" },
    { name: "CI/CD Pipelines", level: 3, category: "workflow" },
    { name: "Azure DevOps", level: 3, category: "workflow" },

    // --- TOOLS ---
    { name: "Git", level: 4, category: "tools" },
    { name: "GitHub", level: 4, category: "tools" },
    { name: "AWS", level: 4, category: "tools" },
    { name: "Vercel", level: 4, category: "tools" },
    { name: "VS Code", level: 4, category: "tools" },
    { name: "Intellij", level: 4, category: "tools" },
    { name: "Linux", level: 3, category: "tools" },
    { name: "Postman", level: 3, category: "tools" },
    { name: "Apache cTAKES", level: 4, category: "tools" },
    { name: "RegEx", level: 4, category: "tools" },
    { name: "FHIR/HL7", level: 4, category: "tools" },
    { name: "SNOMED", level: 4, category: "tools" },
    { name: "LOINC", level: 4, category: "tools" },
    { name: "RxNorm", level: 4, category: "tools" },
    { name: "ICD-O/ICD-10", level: 4, category: "tools" },
    { name: "Docker", level: 3, category: "tools" },
    { name: "JUnit", level: 3, category: "tools" },
    { name: "Groovy", level: 3, category: "tools" },
    { name: "Cucumber", level: 3, category: "tools" },

    // --- DESIGN ---
    { name: "Figma", level: 3, category: "design" },
    { name: "Adobe Illustrator", level: 5, category: "design" },
    { name: "Adobe Photoshop", level: 5, category: "design" },
    { name: "Adobe InDesign", level: 3, category: "design" },
    { name: "Design Principals", level: 4, category: "design" },
    { name: "UX Wireframing", level: 3, category: "design" },
    { name: "Typography", level: 4, category: "design" },
    { name: "Design Elements", level: 4, category: "design" },
    { name: "Color Theory", level: 3, category: "design" },
    { name: "Branding", level: 4, category: "design" },
    { name: "Layout/Composition", level: 4, category: "design" },

    // --- SOFT SKILLS ---
    { name: "Communication", level: 5, category: "soft skills" },
    { name: "Leadership", level: 4, category: "soft skills" },
    { name: "Team Collaboration", level: 5, category: "soft skills" },
    { name: "Self-Management", level: 5, category: "soft skills" },
    { name: "Client Interaction", level: 4, category: "soft skills" },
  ];

  const categoryColors = {
    frontend: "text-sky-400",
    backend: "text-emerald-400",
    design: "text-pink-400",
    workflow: "text-amber-400",
    tools: "text-violet-400",
    "soft skills": "text-teal-400",
  };

  const categoryOrder = [
    "frontend",
    "backend",
    "design",
    "workflow",
    "tools",
    "soft skills",
  ];

  const [openTabs, setOpenTabs] = useState({});

  const toggleTab = (category) => {
    setOpenTabs((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const grouped = categoryOrder.map((category) => ({
    category,
    skills: skills
      .filter((s) => s.category === category)
      .sort((a, b) => b.level - a.level),
  }));

  const anyTabOpen = Object.values(openTabs).some(Boolean);

  return (
    <div className="border border-castlepink rounded-xl bg-black overflow-hidden">
      {/* Tabs */}
      <div
        className={`flex flex-wrap justify-between border-b-2 ${
          anyTabOpen ? "border-grey-400" : "border-castlepink"
        }`}
      >
        {grouped.map(({ category }) => (
          <button
            key={category}
            onClick={() => toggleTab(category)}
            className={`
              py-3 px-5 font-semibold uppercase flex-1 min-w-[120px] text-center
              ${openTabs[category] ? categoryColors[category] : "text-gray-400"}
            `}
          >
            <span className="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-current after:w-0 hover:after:w-full after:transition-all after:duration-300">
              {category}
            </span>
          </button>
        ))}
      </div>

      {/* Skills Content */}
      {anyTabOpen && (
        <div className="px-5 pb-5 pt-3 flex flex-col gap-0 bg-black">
          {grouped.map(
            ({ category, skills }) =>
              openTabs[category] && (
                <div key={category} className="flex flex-col gap-0">
                  {skills.map((skill, index) => (
                    <div
                      key={skill.name}
                      className={`flex items-center justify-between px-2 py-1 ${
                        index % 2 === 0 ? "bg-black" : "bg-gray-900"
                      }`}
                    >
                      <span className="text-white">{skill.name}</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((lvl) => (
                          <div
                            key={lvl}
                            className={`w-4 h-4 rounded-sm ${
                              lvl <= skill.level
                                ? categoryColors[skill.category].replace(
                                    "text",
                                    "bg"
                                  )
                                : "bg-gray-700"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}