import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';

const images = [
  "02_story.png", "01_story.png", "12_story.png", "16_story.png",
  "06_story.png", "08_story.png", "09_story.png", "10_story.png", "11_story.png",
];

const Banner = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden shadow-2xl max-w-7xl mx-auto bg-gradient-to-br from-[#121212] via-[#1F1F1F] to-[#282828] px-10 py-20 sm:px-14 sm:py-24 mt-8 rounded-3xl">
      {/* Background image with blur */}
      <div className="absolute inset-0 z-0 bg-cover bg-center blur-md opacity-30" style={{ backgroundImage: `url(${images[currentImage]})` }} />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-14 lg:gap-32 text-center lg:text-left">
        {/* Text */}
        <div className="flex-1 text-white space-y-5 text-center lg:text-left">
          <h2 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F7B8B8] to-[#F7E6A2] tracking-tight leading-tight">
            Luxe Limited Edition Collection
          </h2>
          <p className="text-xl sm:text-2xl font-light text-white/90 max-w-2xl">
            Immerse yourself in the exclusive, high-end fashion experience. Perfected for the discerning few who value unparalleled luxury.
          </p>
          <button className="mt-6 inline-flex items-center gap-3 bg-gradient-to-r from-[#F7B8B8] to-[#F7E6A2] text-[#121212] hover:bg-[#F7E6A2] text-lg sm:text-xl font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl">
            <ShoppingCart size={20} />
            Shop the Drop
          </button>
        </div>

        {/* Image */}
        <div className="flex-shrink-0 w-full max-w-lg h-[28rem] sm:h-[30rem] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20">
          <img
            src={images[currentImage]}
            alt="Limited Edition Drop"
            className="w-full h-full object-cover transition duration-700 ease-in-out transform hover:scale-105 hover:shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
