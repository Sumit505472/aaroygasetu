import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const specialities = [
  {name:"General Physician",img:"/images/general-physician.png"}, 
  {name:"Dentist",img:"/images/dentist.png"},
  {name:"neurologist",img:"/images/neurologist.png"},
  { name: "Anesthesiologist", img: "/images/anesthesiologist.png" },
  { name: "Psychitrist", img: "/images/ent.png" },
  { name: "Diabetologist", img: "/images/diabetologist.png" },
  { name: "Ophthalmologist", img: "/images/eye.png" },
  { name: "Dermatologist", img: "/images/skin.png" },
  // Add more as needed
];

const SpecialitiesSection = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-[#F8FAFC] py-10 px-4 md:px-12 relative">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-blue-900">Specialities</h2>
          <p className="text-gray-500">Consult Right Expert Specialist Doctor For Your Health Issues</p>
        </div>
        <button
          className="text-blue-900 font-semibold flex items-center gap-1 hover:underline"
          onClick={() => navigate("/specialities")}
        >
          View All <FaArrowRight />
        </button>
      </div>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 w-10 h-10 rounded-full shadow"
        >
          <FaArrowLeft />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth px-6"
        >
          {specialities.slice(0, 5).map((item, i) => (
            <div
              key={i}
              className="min-w-[180px] bg-white rounded-2xl shadow-md pb-2 transition hover:scale-105"
            >
              <div className="p-4 flex justify-center items-center h-40">
                <img src={item.img} alt={item.name} className="max-h-32 object-contain" />
              </div>
              <div className="bg-[#035F9C] text-white text-center py-2 font-bold rounded-b-2xl">
                {item.name}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 w-10 h-10 rounded-full shadow"
        >
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default SpecialitiesSection;
