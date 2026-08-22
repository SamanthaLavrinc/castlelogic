// Eagerly resolves every image under src/assets/** to its built URL, keyed by
// the path relative to src/assets/ (matching how heroImage/gallery.folder are
// authored in the case-study JSON, e.g. "projects/myorbit_e2e/figma/foo.png").
// Dropping a new image into an already-referenced folder is picked up
// automatically on next build/HMR — no manual import list to maintain.
const assetModules = import.meta.glob("../../assets/**/*.{png,jpg,jpeg,webp,svg,gif}", {
  eager: true,
  import: "default",
});

const assetsByPath = {};
for (const [filePath, url] of Object.entries(assetModules)) {
  const relative = filePath.replace(/^\.\.\/\.\.\/assets\//, "");
  assetsByPath[relative] = url;
}

/** Resolve a single "relative/to/assets.png" path to its built URL, or undefined if missing. */
export function resolveImage(relativePath) {
  if (!relativePath) return undefined;
  return assetsByPath[relativePath];
}

function titleFromFilename(file) {
  const name = file.replace(/\.[^./]+$/, "");
  return name.replace(/[_-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Resolve every image directly inside a folder (relative to src/assets/), sorted by filename. */
function resolveFolder(folderPath) {
  const prefix = folderPath.endsWith("/") ? folderPath : `${folderPath}/`;
  return Object.keys(assetsByPath)
    .filter((p) => p.startsWith(prefix) && !p.slice(prefix.length).includes("/"))
    .sort()
    .map((p) => p.slice(prefix.length));
}

/** Resolve an explicit list of filenames inside a folder, preserving the given order. */
function resolveFiles(folderPath, files) {
  const prefix = folderPath.endsWith("/") ? folderPath : `${folderPath}/`;
  return files.filter((file) => assetsByPath[`${prefix}${file}`] !== undefined);
}

/**
 * Turn a case study's `gallery` array (each entry `{ label?, folder, files? }`)
 * into resolved groups of `{ id, title, img }` items ready for ImageGallery.
 * Missing folders/files are silently skipped so authors can reference a
 * not-yet-populated folder without breaking the page.
 */
export function buildGalleryGroups(gallery, slug) {
  if (!Array.isArray(gallery)) return [];

  return gallery
    .map((group, groupIndex) => {
      const { label, folder, files } = group;
      if (!folder) return { label, images: [] };

      const prefix = folder.endsWith("/") ? folder : `${folder}/`;
      const filenames = Array.isArray(files) ? resolveFiles(folder, files) : resolveFolder(folder);

      const images = filenames.map((file) => ({
        id: `${slug}-${groupIndex}-${file}`,
        title: label ? `${label}: ${titleFromFilename(file)}` : titleFromFilename(file),
        img: assetsByPath[`${prefix}${file}`],
      }));

      return { label, images };
    })
    .filter((group) => group.images.length > 0);
}
