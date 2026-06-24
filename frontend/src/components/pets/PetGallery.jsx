import { useState } from "react";

const PetGallery = ({ images = [] }) => {
  const [active, setActive] = useState(0);
  const fallback = ["https://images.unsplash.com/photo-1558788353-f76d92427f16"];
  const imgs = images.length ? images : fallback;

  return (
    <div>
      <div className="rounded-xl2 overflow-hidden h-96 mb-4 shadow-soft">
        <img src={imgs[active]} alt="Pet" className="w-full h-full object-cover" />
      </div>
      {imgs.length > 1 && (
        <div className="flex gap-3">
          {imgs.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-20 h-20 rounded-xl overflow-hidden border-2 ${
                active === i ? "border-primary" : "border-transparent"
              }`}
            >
              <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PetGallery;