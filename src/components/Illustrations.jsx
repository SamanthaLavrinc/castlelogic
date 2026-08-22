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
import ImageGallery from "./ImageGallery";

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

export default function Illustrations() {
  return (
    <ImageGallery
      images={projects}
      className="max-w-[1200px] mx-auto grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 mb-16"
    />
  );
}
