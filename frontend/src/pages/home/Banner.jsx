import React, { useState, useEffect } from 'react';

const images = [
    "02_story.png",
    "01_story.png",
    "12_story.png",
    "06_story.png",
    "08_story.png",
    "09_story.png",
    "10_story.png",
    "11_story.png",








];

const Banner = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className=" h-25  relative flex flex-col items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 py-24 px-8 rounded-3xl shadow-xl overflow-hidden max-w-7xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-wide mb-6 text-center drop-shadow-lg">
                New Release – Limited Edition!
            </h1>

            <div className="relative w-full max-w-3xl h-[300px] sm:h-[400px] lg:h-[300px] mb-8 overflow-hidden rounded-2xl shadow-2xl">
                <img
                    src={images[currentImage]}
                    alt="New Release Outfit"
                    className="w-full h-full object-cover rounded-2xl transition-transform duration-700 ease-in-out transform hover:scale-105"
                />
            </div>

            <p className="text-xl sm:text-2xl text-white mb-8 text-center font-medium leading-relaxed tracking-wide max-w-3xl">
                🔥 Upgrade your style with our exclusive, limited-edition collection. Get yours before it's gone!
            </p>

            <button className="py-3 px-8 bg-white text-pink-600 font-semibold rounded-full shadow-lg transform hover:scale-110 hover:bg-pink-600 hover:text-white transition-all duration-300 ease-in-out text-lg tracking-wide">
                🛍️ Shop Now
            </button>
        </div>
    );
};

export default Banner;
