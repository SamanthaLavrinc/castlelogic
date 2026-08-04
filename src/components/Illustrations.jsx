import { useState } from "react";
import amyHurst from "../assets/design/amy_hurst.webp";
import bird from "../assets/design/bird.webp";
import deer from "../assets/design/deer.webp";
import ettalong from "../assets/design/ettalong.webp";
import gnome from "../assets/design/gnome.webp";
import greaseDucks from "../assets/design/greaseducks.webp";
import hairext from "../assets/design/hair_extensions.webp";
import invitation from "../assets/design/invitation.webp";
import kawaii from "../assets/design/kawaii.webp";
import tattersails from "../assets/design/tattersails.webp";
import teaching from "../assets/design/teaching_stuff.webp";
import header1 from "../assets/design/header_right.webp";

export default function Illustrations() {

    const projects = [
        { id: 1, title: "Logo Design", img: amyHurst },
        { id: 2, title: "Bird Illustration", img: bird },
        { id: 3, title: "Landscape Illustration", img: deer },
        { id: 4, title: "Gnome Illustration", img: gnome },
        { id: 5, title: "Brochure Design", img: greaseDucks },
        { id: 6, title: "Package Design", img: hairext },
        { id: 7, title: "Invitation Design", img: invitation },
        { id: 8, title: "Picnic Illustration", img: kawaii },
        { id: 9, title: "Booklet Design", img: tattersails },
        { id: 10, title: "Brochure Design", img: teaching },
        { id: 11, title: "Header Illustration", img: header1 },
        { id: 12, title: "Brochure Design", img: ettalong },
    ];
    
    const [selected, setSelected] = useState(null);
    
    // ---- IMAGE NAVIGATION LOGIC ----
    const selectedIndex = selected
        ? projects.findIndex((p) => p.id === selected.id)
        : -1;
    
    const showNext = (e) => {
        e.stopPropagation();
        const nextIndex = (selectedIndex + 1) % projects.length;
        setSelected(projects[nextIndex]);
    };
    
    const showPrev = (e) => {
        e.stopPropagation();
        const prevIndex = (selectedIndex - 1 + projects.length) % projects.length;
        setSelected(projects[prevIndex]);
    };

    return (      
        <>
        {/* Project / Illustration Cards */}
        <section className="max-w-[1200px] mx-auto grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 mb-16">
            {projects.map((proj) => (
            <div
                key={proj.id}
                className="relative bg-gray-900 border border-castlepink rounded-lg aspect-square cursor-pointer overflow-hidden group transform transition-transform duration-300 hover:scale-[1.03]"
                onClick={() => setSelected(proj)}
            >
                <div className="w-full h-full bg-white flex items-center justify-center">
                <img
                    src={proj.img}
                    alt={proj.title}
                    loading="lazy"
                    className="max-w-full max-h-full object-contain"
                />
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-90 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-castlepink font-bold text-lg text-center px-2">
                    {proj.title}
                </span>
                </div>
            </div>
            ))}
        </section>

        {/* ---- MODAL WITH ARROWS ---- */}
        {selected && (
            <div
            className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 p-4"
            onClick={() => setSelected(null)}
            >
            {/* LEFT ARROW */}
            <button
                onClick={showPrev}
                className="absolute left-8 text-castlepink text-4xl font-bold opacity-70 hover:text-castlepurple select-none"
            >
                ‹
            </button>

            {/* IMAGE */}
            <img
                src={selected.img}
                alt={selected.title}
                className="max-w-full max-h-full rounded-lg"
                onClick={(e) => e.stopPropagation()}
            />

            {/* RIGHT ARROW */}
            <button
                onClick={showNext}
                className="absolute right-8 text-castlepink text-4xl font-bold opacity-70 hover:text-castlepurple select-none"
            >
                ›
            </button>
            </div>
        )}
        </>
    );
}