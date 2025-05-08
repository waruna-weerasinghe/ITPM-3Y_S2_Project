import React, { useState } from 'react';

const ClothesCard = ({ clothe }) => {
    const [showSuccess, setShowSuccess] = useState(false);

    const categoryLabel =
        clothe.category === 'men'
            ? 'Men'
            : clothe.category === 'women'
            ? 'Women'
            : 'Kids';

    const handleAddToCart = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2500);
        // dispatch(addToCart(clothe)); // optional
    };

    return (
        <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.03] duration-300 border border-gray-100 overflow-hidden">
            {/* Category Label */}
            <span className="absolute top-3 left-3 bg-gradient-to-r from-green-600 to-indigo-600 text-white text-xs px-4 py-1.5 rounded-full font-semibold uppercase tracking-wide shadow-md">
                {categoryLabel}
            </span>

            {/* Success Message */}
            {showSuccess && (
                <div className="absolute top-3 right-3 bg-green-600 text-white text-xs px-4 py-1.5 rounded-full font-medium shadow-lg animate-bounce">
                    Added to Cart
                </div>
            )}

            {/* Image */}
            <div className="w-full h-56 rounded-xl overflow-hidden">
                <img
                    src={clothe.coverImage}
                    alt={clothe.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 truncate hover:text-indigo-600 transition-colors duration-200">
                    {clothe.title}
                </h3>
                <p className="text-sm text-gray-500 font-medium">{clothe.brand}</p>

                <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <span className="bg-gray-50 border px-3 py-1 rounded-lg">{clothe.sizes}</span>
                    <span className="bg-gray-50 border px-3 py-1 rounded-lg">{clothe.colors}</span>
                </div>

                <div className="flex items-center gap-2">
                    {clothe.oldPrice && (
                        <span className="line-through text-gray-400 text-sm">${clothe.oldPrice}</span>
                    )}
                    <span className="text-xl font-bold text-indigo-700">${clothe.newPrice}</span>
                </div>

                <button
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-sky-600 hover:to-indigo-700 text-white py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                    <span>Add to Cart</span>
                    <span className="text-lg">🛒</span>
                </button>
            </div>
        </div>
    );
};

export default ClothesCard;
