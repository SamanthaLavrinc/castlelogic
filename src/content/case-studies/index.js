const modules = import.meta.glob(["./*.json", "!./_template.json"], {
  eager: true,
});

export const caseStudies = Object.values(modules)
  .map((mod) => mod.default ?? mod)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

export function getCaseStudy(slug) {
  return caseStudies.find((study) => study.slug === slug);
}
