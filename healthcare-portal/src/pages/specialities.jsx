import React from "react";

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

const SpecialitiesPage = () => {
  return (
    <div className="bg-[#F8FAFC] py-10 px-4 md:px-12">
      <h2 className="text-3xl font-bold text-blue-900 mb-6">All Specialities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {specialities.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md transition hover:scale-105"
          >
            <div className="p-4 flex justify-center items-center h-40 ">
              <img src={item.img} alt={item.name} className="max-h-32 object-contain" />
            </div>
            <div className="bg-[#035F9C] text-white text-center py-2 font-bold rounded-b-2xl">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialitiesPage;
