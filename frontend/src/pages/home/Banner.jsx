import React, { useState, useEffect } from 'react';

const Banner = () => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [showLookbook, setShowLookbook] = useState(false);
    const [showRatings, setShowRatings] = useState(false);  // New state to control showing ratings

    const fashionItems = [
        { id: 1, image: "01_story.png", title: "Silk Evening Gown", price: "$4,850", ratings: 4.5 },
        { id: 2, image: "02_story.png", title: "Cashmere Trench", price: "$3,200", ratings: 4.8 },
        { id: 3, image: "06_story.png", title: "Leather Corset", price: "$2,950", ratings: 4.2 },
        { id: 4, image: "08_story.png", title: "Velvet Blazer", price: "$2,600", ratings: 4.6 },
        { id: 5, image: "09_story.png", title: "Chiffon Dress", price: "$3,750", ratings: 4.7 },
        { id: 6, image: "12_story.png", title: "Wool Tailored Suit", price: "$4,200", ratings: 4.4 }
    ];

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setShowLookbook(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <div className="relative w-full min-h-[100vh] flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 py-12 px-6 md:py-24 md:px-16 rounded-[48px] shadow-2xl overflow-hidden max-w-8xl mx-auto border border-gray-700/50">
            
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
                {[...Array(50)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-white rotate-45 animate-pulse"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>

            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400/70 to-transparent animate-runwayLight"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400/70 to-transparent animate-runwayLight animation-delay-1000"></div>

            <div className="relative z-20 w-full max-w-6xl mx-auto text-center">
                <div className="group">
                    <p className="text-xs font-light tracking-[0.5em] text-amber-400/80 mb-6 transition-all duration-500 group-hover:tracking-[0.6em]">
                        AUTUMN/WINTER COLLECTION
                    </p>
                    <h1 className="text-5xl md:text-7xl font-thin text-white tracking-tight mb-6">
                        <span className="font-serif italic group-hover:italic-non group-hover:text-amber-50 transition-all duration-500">L'Élégance</span> 
                        <span className="text-amber-400 mx-2 group-hover:rotate-90 transition-transform duration-500">·</span> 
                        <span className="font-serif group-hover:italic group-hover:text-amber-50 transition-all duration-500">Noir</span>
                    </h1>
                </div>

                <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto my-8 group-hover:w-32 transition-all duration-700"></div>

                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light mb-12 group-hover:text-amber-50/80 transition-all duration-500">
                    The pinnacle of craftsmanship. Limited to <span className="text-amber-300 font-medium">50 pieces worldwide</span>.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-16">
                    {fashionItems.map((item) => (
                        <div 
                            key={item.id}
                            className="relative group overflow-hidden rounded-xl border border-gray-700/50 hover:border-amber-400/30 transition-all duration-500"
                            onMouseEnter={() => setHoveredItem(item.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                {hoveredItem === item.id && (
                                    <div className="absolute bottom-4 left-4 right-4 text-left text-white transform translate-y-0 opacity-100 transition-all duration-500">
                                        <h3 className="font-light text-lg mb-1">{item.title}</h3>
                                        <p className="text-amber-300 text-sm">{item.price}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <button 
                        onClick={() => setShowRatings(true)} // Show ratings when clicked
                        className="relative overflow-hidden py-4 px-12 bg-gradient-to-r from-amber-600 to-amber-800 text-white font-light rounded-full shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-amber-500/40 tracking-wider group"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            SHOP THE COLLECTION
                        </span>
                    </button>

                    <button 
                        onClick={() => setShowLookbook(true)} 
                        className="relative py-4 px-10 border border-gray-600/50 text-gray-300 font-light rounded-full hover:bg-white/5 transition-all duration-500 hover:scale-105 flex items-center gap-3 tracking-wider group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        LOOKBOOK
                    </button>
                </div>
            </div>

            {/* SHOP Ratings */}
            {showRatings && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex flex-col items-center justify-center p-8 overflow-y-auto">
                    <button 
                        onClick={() => setShowRatings(false)} 
                        className="absolute top-6 right-6 text-gray-300 hover:text-amber-400 text-3xl font-light"
                    >
                        &times;
                    </button>
                    <h2 className="text-3xl text-white font-light mb-8 tracking-widest">Item Ratings</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl w-full">
                        {fashionItems.map(item => (
                            <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700/40 p-4 text-white">
                                <h3 className="text-lg font-light">{item.title}</h3>
                                <p className="text-amber-300 text-sm">{item.price}</p>
                                <p className="text-sm text-yellow-400">Ratings: {item.ratings} / 5</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* LOOKBOOK Modal */}
            {showLookbook && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col items-center justify-center p-8 overflow-y-auto">
                    <button 
                        onClick={() => setShowLookbook(false)} 
                        className="absolute top-6 right-6 text-gray-300 hover:text-amber-400 text-3xl font-light"
                    >
                        &times;
                    </button>
                    <h2 className="text-3xl text-white font-light mb-8 tracking-widest">Shop Details</h2>
                    <div className="max-w-6xl w-full text-center text-white">
                        <p className="text-lg mb-4">Welcome to our exclusive shop! We offer luxury collections limited to 50 pieces worldwide. Our focus is on quality craftsmanship and timeless fashion.</p>
                        <p className="text-sm">Follow us on social media for more updates on upcoming collections and special offers.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Banner;
