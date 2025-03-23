import React, { useState, useEffect } from 'react';

const images = [
    "03_story.png",
    "02_story.png",
    "01_story.png",
    "00_story.png"
];

const Banner = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='flex flex-col items-center text-center bg-gradient-to-r from-teal-400 via-indigo-500 to-pink-600 py-12 px-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-700'>
            <h1 className='text-5xl font-extrabold mb-6 text-white tracking-wide drop-shadow-2xl'>
                New Release – Limited Edition!
            </h1>

            <div className='w-full max-w-4xl mb-8'>
                <img
                    src={images[currentImage]}
                    alt="New Release Suit"
                    className='w-full h-[500px] md:h-[700px] lg:h-[600px] object-cover rounded-lg shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-110 hover:rotate-3'
                />
            </div>

            <p className='text-lg text-white mb-6 max-w-xl'>
                Don’t miss out! Get your hands on the latest collection before it’s sold out. Only a few left!
            </p>

            <button className='py-3 px-8 bg-white text-teal-600 font-semibold rounded-xl shadow-xl transform hover:scale-105 hover:bg-teal-600 hover:text-white transition-all duration-300 ease-in-out'>
                Shop Now
            </button>
        </div>
    );
};

export default Banner;
