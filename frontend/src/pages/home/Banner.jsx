import React, { useState, useEffect } from 'react';

const images = [
    "02_story.png",
    "01_story.png",


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
        <div className='relative flex flex-col items-center text-center bg-gradient-to-r from-[#1E3A8A] via-[#9333EA] to-[#DB2777] py-20 px-12 rounded-3xl shadow-2xl transition-all duration-700 overflow-hidden max-w-7xl mx-auto'>
            <h1 className='text-5xl md:text-6xl font-bold mb-6 text-white tracking-wide drop-shadow-xl'>
                New Release – Limited Edition!
            </h1>

            <div className='relative w-full max-w-4xl mb-8 h-[500px] md:h-[650px] lg:h-[600px] overflow-hidden rounded-2xl shadow-xl'>
                <img
                    src={images[currentImage]}
                    alt="New Release Outfit"
                    className='w-full h-full object-cover rounded-2xl shadow-lg transition-transform duration-700 ease-in-out transform scale-105 hover:scale-110'
                />
            </div>

            <p className='text-lg md:text-xl text-white mb-8 max-w-3xl leading-relaxed font-medium tracking-wide'>
                🚀 Elevate your style with our latest collection. <br />
                🔥 Unique designs. Premium quality. Limited stock. Get yours today!
            </p>

            <button className='py-4 px-12 bg-white text-pink-600 font-bold rounded-full shadow-lg transform hover:scale-105 hover:bg-pink-600 hover:text-white transition-all duration-300 ease-in-out text-lg tracking-wide drop-shadow-lg'>
                🛍️ Shop Now
            </button>
        </div>
    );
};

export default Banner;