import { useState, useEffect } from "react";
import { X } from "lucide-react";

// Shared image grid + lightbox modal (arrow nav, Escape-to-close, keyboard-
// operable thumbnails). Originally built for the About page's Illustrations
// grid; reused here so every image gallery on the site, illustrations or
// case-study screenshots, shares one accessible implementation.
//
// `layout="grid"` (default) renders the thumbnail grid used for gallery
// groups. `layout="inline"` renders a single full-width clickable image
// (used for case-study section images) instead of a thumbnail square, but
// opens the same modal. Either way, prev/next arrows only render when
// there's more than one image to navigate to.
export default function ImageGallery({ images, groupLabel, className, layout = "grid" }) {
  const [selected, setSelected] = useState(null);

  const selectedIndex = selected ? images.findIndex((img) => img.id === selected.id) : -1;
  const showArrows = images?.length > 1;

  const showNext = (e) => {
    e.stopPropagation();
    const nextIndex = (selectedIndex + 1) % images.length;
    setSelected(images[nextIndex]);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    const prevIndex = (selectedIndex - 1 + images.length) % images.length;
    setSelected(images[prevIndex]);
  };

  // Escape closes the modal, since it's the standard keyboard-only way in
  // and there's otherwise no way out once focus is inside it.
  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  if (!images?.length) return null;

  return (
    <>
      {groupLabel && (
        <h3 className="text-sm uppercase tracking-wide text-castlepink mb-3">{groupLabel}</h3>
      )}

      {layout === "inline" ? (
        <div
          role="button"
          tabIndex={0}
          aria-label={`View ${images[0].title} full size`}
          className="cursor-zoom-in"
          onClick={() => setSelected(images[0])}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setSelected(images[0]);
            }
          }}
        >
          <img
            src={images[0].img}
            alt={images[0].title}
            loading="lazy"
            className="w-full rounded-lg border border-castlepink transition-opacity hover:opacity-90"
          />
        </div>
      ) : (
        /* Gallery Grid */
        <section
          className={
            className ??
            "grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4"
          }
        >
          {images.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.title} full size`}
              className="relative bg-gray-900 border border-castlepink rounded-lg aspect-square cursor-pointer overflow-hidden group transform transition-transform duration-300 hover:scale-[1.03]"
              onClick={() => setSelected(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelected(item);
                }
              }}
            >
              <div className="w-full h-full bg-white flex items-center justify-center">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-90 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-castlepink font-bold text-lg text-center px-2">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* ---- MODAL WITH ARROWS ---- */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 p-4"
          onClick={() => setSelected(null)}
        >
          {/* CLOSE */}
          <button
            onClick={() => setSelected(null)}
            aria-label="Close"
            className="absolute top-6 right-6 text-castlepink hover:text-castlepurple"
          >
            <X size={28} />
          </button>

          {/* LEFT ARROW (only when there's something to navigate to) */}
          {showArrows && (
            <button
              onClick={showPrev}
              aria-label="Previous image"
              className="absolute left-8 text-castlepink text-4xl font-bold opacity-70 hover:text-castlepurple select-none"
            >
              ‹
            </button>
          )}

          {/* IMAGE */}
          <img
            src={selected.img}
            alt={selected.title}
            className="max-w-full max-h-full rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {/* RIGHT ARROW (only when there's something to navigate to) */}
          {showArrows && (
            <button
              onClick={showNext}
              aria-label="Next image"
              className="absolute right-8 text-castlepink text-4xl font-bold opacity-70 hover:text-castlepurple select-none"
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
}
