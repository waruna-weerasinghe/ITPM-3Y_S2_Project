import React, { useState } from 'react';

const ClothesCard = ({ clothe }) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showQuickView, setShowQuickView] = useState(false);

    const categoryLabel =
        clothe.category === 'men'
            ? "Men's Luxury"
            : clothe.category === 'women'
            ? "Women's Couture"
            : "Junior Elite";

    const handleAddToCart = (e) => {
        e.stopPropagation();
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2500);
        // dispatch(addToCart(clothe)); // optional
    };

    const handleQuickView = (e) => {
        e.stopPropagation();
        setShowQuickView(true);
    };

    const closeQuickView = (e) => {
        e.stopPropagation();
        setShowQuickView(false);
    };

    return (
        <>
            {/* Quick View Modal */}
            {showQuickView && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
                    onClick={closeQuickView}
                >
                    <div 
                        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative">
                            <button 
                                onClick={closeQuickView}
                                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                                <div className="h-[70vh] bg-gray-100 flex items-center justify-center p-8">
                                    <img
                                        src={clothe.coverImage}
                                        alt={clothe.name}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </div>
                                
                                <div className="p-8 overflow-y-auto h-[70vh]">
                                    <div className="space-y-6">
                                        <div>
                                            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                                                {categoryLabel}
                                            </span>
                                            <h2 className="text-3xl font-bold mt-1">{clothe.title}</h2>
                                            <p className="text-lg text-gray-600 mt-2">{clothe.brand}</p>
                                        </div>
                                        
                                        <div className="flex items-center gap-4">
                                            <span className="text-3xl font-bold">${clothe.newPrice}</span>
                                            {clothe.oldPrice && (
                                                <span className="line-through text-gray-400">${clothe.oldPrice}</span>
                                            )}
                                        </div>
                                        
                                        <div className="flex gap-2 flex-wrap">
                                            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm border border-gray-200">
                                                {clothe.sizes}
                                            </span>
                                            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm border border-gray-200">
                                                {clothe.colors}
                                            </span>
                                            {clothe.material && (
                                                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm border border-gray-200">
                                                    {clothe.material}
                                                </span>
                                            )}
                                        </div>
                                        
                                        <p className="text-gray-700">{clothe.description || "Premium quality product with exquisite craftsmanship."}</p>
                                        
                                        <button
                                            onClick={handleAddToCart}
                                            className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                                        >
                                            <span>Add to Cart</span>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Product Card */}
            <div 
                className="relative bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col h-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Premium Ribbon */}
                {clothe.premium && (
                    <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-8 bg-gold-500 transform rotate-45 translate-x-8 -translate-y-2 flex items-center justify-center shadow-md">
                            <span className="text-xs font-bold text-black uppercase tracking-wider">Premium</span>
                        </div>
                    </div>
                )}

                {/* Category Label */}
                <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider shadow-sm">
                    {categoryLabel}
                </span>

                {/* Success Message */}
                {showSuccess && (
                    <div className="absolute top-3 right-3 bg-black text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg animate-bounce flex items-center">
                        <svg className="w-3 h-3 mr-1 fill-current" viewBox="0 0 20 20">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                        </svg>
                        Added to Cart
                    </div>
                )}

                {/* Image with Luxury Frame */}
                <div className="w-full h-72 overflow-hidden relative flex-shrink-0">
                    <div className="absolute inset-0 border-8 border-white opacity-20 pointer-events-none"></div>
                    <img
                        src={clothe.coverImage}
                        alt={clothe.name}
                        className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
                    />
                    {/* Overlay on hover */}
                    {isHovered && (
                        <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center transition-opacity duration-300">
                            <button 
                                onClick={handleQuickView}
                                className="bg-white bg-opacity-90 text-black px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center hover:bg-opacity-100 transition-all"
                            >
                                Quick View
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                    <div className="space-y-4 flex-grow">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 hover:text-black transition-colors duration-200">
                                {clothe.title}
                            </h3>
                            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{clothe.brand}</p>
                        </div>

                        <div className="flex items-center gap-3 text-xs font-medium text-gray-700">
                            <span className="bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200">{clothe.sizes}</span>
                            <span className="bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200">{clothe.colors}</span>
                            {clothe.material && (
                                <span className="bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200">{clothe.material}</span>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            {clothe.oldPrice && (
                                <span className="line-through text-gray-400 text-sm">${clothe.oldPrice}</span>
                            )}
                            <span className="text-xl font-bold text-black">${clothe.newPrice}</span>
                            {clothe.oldPrice && (
                                <span className="ml-auto text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                                    SAVE {Math.round((1 - clothe.newPrice / clothe.oldPrice) * 100)}%
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Button Container */}
                    <div className="mt-auto pt-4">
                        <div className="flex gap-2 h-12">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-black hover:bg-gray-800 text-white py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 h-full"
                            >
                                <span>Add to Cart</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </button>
                            <button className="w-12 h-12 flex items-center justify-center border border-gray-300 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClothesCard;
