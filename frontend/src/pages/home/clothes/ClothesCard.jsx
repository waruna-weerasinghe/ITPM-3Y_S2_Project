import React, { useState } from 'react';

const ClothesCard = ({ clothe }) => {
    const [showSuccess, setShowSuccess] = useState(false);

    const categoryLabel = clothe.category === 'men' ? 'Men' : clothe.category === 'women' ? 'Women' : 'Kids';

    const handleAddToCart = () => {
        // Show success message
        setShowSuccess(true);

        // Hide after 2.5 seconds
        setTimeout(() => {
            setShowSuccess(false);
        }, 2500);

        // You can also trigger actual cart logic here
        // e.g., dispatch(addToCart(clothe));
    };

    return (
        <div className="relative bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105 duration-300 border border-gray-200 overflow-hidden">
            {/* Category label */}
            <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-medium uppercase">
                {categoryLabel}
            </span>

            {/* Success message */}
            {showSuccess && (
                <div className="absolute top-3 right-3 bg-blue-600 text-white text-sm px-4 py-1 rounded-full shadow-md animate-bounce">
                    Added Successfully!
                </div>
            )}

            {/* Image */}
            <div className="w-full h-48 overflow-hidden rounded-lg">
                <img
                    src={clothe.coverImage}
                    alt={clothe.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 truncate hover:text-blue-600 transition-colors duration-200">
                    {clothe.title}
                </h3>
                <p className="text-sm text-gray-600 font-medium">{clothe.brand}</p>

                <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <span className="bg-gray-100 px-3 py-1 rounded-lg">{clothe.sizes}</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-lg">{clothe.colors}</span>
                </div>

                <div className="flex items-center gap-2">
                    {clothe.oldPrice && (
                        <span className="line-through text-gray-400 text-sm">${clothe.oldPrice}</span>
                    )}
                    <span className="text-lg font-bold text-gray-900">${clothe.newPrice}</span>
                </div>

                <button
                    onClick={handleAddToCart}
                    className="w-full bg-red-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105"
                >
                    <span>Add to Cart</span>
                    <span className="text-lg">🛒</span>
                </button>
            </div>
        </div>
    );
};

export default ClothesCard;
