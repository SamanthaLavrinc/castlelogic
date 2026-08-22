import { resolveImage, buildGalleryGroups } from "./resolveAssets";

const modules = import.meta.glob(["./*.json", "!./_template.json"], {
  eager: true,
});

export const caseStudies = Object.values(modules)
  .map((mod) => mod.default ?? mod)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  .map((study) => ({
    ...study,
    heroImageUrl: resolveImage(study.heroImage),
    galleryGroups: buildGalleryGroups(study.gallery, study.slug),
  }));

export function getCaseStudy(slug) {
  return caseStudies.find((study) => study.slug === slug);
}
