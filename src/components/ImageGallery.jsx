import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import StatusBadge from "./StatusBadge";

// `img` is just a resolved asset URL (see resolveAssets.js, which globs both
// image and .mp4 files under the same case-study-authoring convention), so
// "is this a video" is decided by the extension on that URL, not by a
// separate field the JSON would otherwise have to carry per item.
const isVideoSrc = (src) => /\.mp4($|\?)/i.test(src ?? "");

// Muted looping clip that only plays while it's near the viewport. A plain
// `autoPlay` makes the browser download every clip on the page at load, even
// ones far below the fold; `preload="metadata"` fetches just enough to size
// the element (so nothing shifts when it starts), and the observer starts
// playback (which streams the rest) within 200px of the screen and pauses it
// once it scrolls away.
function LazyVideo(props) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: "200px 0px" }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return <video ref={ref} muted loop playsInline preload="metadata" {...props} />;
}

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
//
// `blurred`, driven by `study.status === "in-progress"` in CaseStudyDetail,
// blurs every image this component renders and swaps in an "Under
// Construction" StatusBadge, including inside the lightbox modal — opening
// an image full-size can't be used to see past the blur, since a pre-launch
// product's real screenshots aren't meant to be publicly legible yet.
export default function ImageGallery({ images, groupLabel, className, layout = "grid", blurred = false }) {
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
        isVideoSrc(images[0].img) ? (
          // Short looping demo clips play inline rather than opening the
          // lightbox: the clip is already autoplaying at full size.
          //
          // Inline media (video and image alike) is capped at 75vh tall and
          // centered instead of always stretched to the card's width: a
          // portrait phone capture stretched to full width renders taller
          // than the screen and blurry from upscaling. Landscape media still
          // fills the width, since its height never reaches the cap.
          <div className="relative w-fit max-w-full mx-auto">
            <LazyVideo
              src={images[0].img}
              aria-label={images[0].title}
              className={`block max-w-full max-h-[75vh] w-auto h-auto rounded-lg border border-castlepink ${blurred ? "blur-md scale-105" : ""}`}
            />
            {blurred && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
                <StatusBadge text="Under Construction" />
              </div>
            )}
          </div>
        ) : (
          <div
            role="button"
            tabIndex={0}
            aria-label={`View ${images[0].title} full size`}
            className="relative w-fit max-w-full mx-auto cursor-zoom-in"
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
              className={`block max-w-full max-h-[75vh] w-auto h-auto rounded-lg border border-castlepink transition-opacity hover:opacity-90 ${
                blurred ? "blur-md scale-105" : ""
              }`}
            />
            {blurred && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
                <StatusBadge text="Under Construction" />
              </div>
            )}
          </div>
        )
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
                {isVideoSrc(item.img) ? (
                  <LazyVideo
                    src={item.img}
                    aria-label={item.title}
                    className={`max-w-full max-h-full object-contain ${blurred ? "blur-md scale-110" : ""}`}
                  />
                ) : (
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className={`max-w-full max-h-full object-contain ${blurred ? "blur-md scale-110" : ""}`}
                  />
                )}
              </div>

              {/* Blurred thumbnails get a permanent badge instead of the
                  hover-only title reveal below — the point is to keep the
                  screenshot illegible at all times, not just until hover. */}
              {blurred ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 px-2">
                  <StatusBadge text="Under Construction" size="sm" />
                </div>
              ) : (
                <div className="absolute inset-0 bg-black bg-opacity-90 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-castlepink font-bold text-lg text-center px-2">
                    {item.title}
                  </span>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* ---- MODAL WITH ARROWS ---- */}
      {/* Portaled to document.body rather than rendered in place: this
          component gets used deep inside page trees that create their own
          stacking contexts (e.g. CaseStudyDetail.jsx wraps its content in a
          `relative z-10` div so it paints above the page's ambient
          background). A `position: fixed, z-50` element nested inside a
          stacking context like that is still capped by it — z-index only
          competes against siblings within the same context, so the modal
          was rendering *underneath* the sticky nav (its own, separate,
          higher-level stacking context) no matter how high its z-index
          went. Escaping to `document.body` puts it in the root stacking
          context, where its z-50 actually means "on top of everything." */}
      {selected && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 p-6 sm:p-16"
          onClick={() => setSelected(null)}
        >
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

          {/* Framed image + caption + close button, grouped in one relative
              wrapper. The site's canvas is pure black and so is this modal's
              own backdrop, so a bare image with no chrome around it doesn't
              read as "a gallery view opened" at all — it just looks like
              the image sitting on the page. The border+glow, the visible
              title caption, and a close button anchored to the image's own
              corner (rather than floating alone in the far viewport corner)
              are what actually signal "this is a lightbox," independent of
              backdrop contrast. */}
          <div
            className="relative flex flex-col items-center max-w-[min(1200px,100%)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute -top-3 -right-3 z-10 rounded-full bg-black border border-castlepink/60 p-1.5 text-castlepink hover:text-castlepurple hover:border-castlepurple transition-colors"
            >
              <X size={18} />
            </button>

            <div className="relative">
              {isVideoSrc(selected.img) ? (
                <video
                  key={selected.id}
                  src={selected.img}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  aria-label={selected.title}
                  className={`max-w-full max-h-[70vh] sm:max-h-[75vh] rounded-lg border border-castlepink/40 ${
                    blurred ? "blur-md scale-105" : ""
                  }`}
                  style={{ boxShadow: "0 0 50px rgba(203,144,255,0.25), 0 0 25px rgba(0,0,0,0.6)" }}
                />
              ) : (
                <img
                  src={selected.img}
                  alt={selected.title}
                  className={`max-w-full max-h-[70vh] sm:max-h-[75vh] rounded-lg border border-castlepink/40 ${
                    blurred ? "blur-md scale-105" : ""
                  }`}
                  style={{ boxShadow: "0 0 50px rgba(203,144,255,0.25), 0 0 25px rgba(0,0,0,0.6)" }}
                />
              )}
              {blurred && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 pointer-events-none">
                  <StatusBadge text="Under Construction" />
                </div>
              )}
            </div>

            {selected.title && (
              <p className="mt-4 max-w-full truncate text-sm uppercase tracking-wide text-castlepurple">
                {selected.title}
              </p>
            )}
          </div>

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
        </div>,
        document.body
      )}
    </>
  );
}
