import React from 'react';

const ClothesCard = ({ clothe }) => {
    // Category label based on clothe.category value
    const categoryLabel = clothe.category === 'men' ? 'Men' : clothe.category === 'women' ? 'Women' : 'Kids';

    return (
        <div className="relative bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 duration-300 ease-in-out border border-gray-300 overflow-hidden hover:border-indigo-500">
            {/* Category label */}
            <div className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold uppercase">
                {categoryLabel}
            </div>

            {/* Image */}
            <img
                src={clothe.coverImage}
                alt={clothe.name}
                className="w-full h-40 object-cover rounded-lg transition-transform duration-300 hover:scale-110"
            />

            <div className="p-5 space-y-4">
                {/* Product Title */}
                <h3 className="text-2xl font-semibold text-gray-900 truncate hover:text-indigo-600 transition-colors duration-200">{clothe.title}</h3>

                {/* Product Details */}
                <div className="text-sm space-y-2">
                    {/* Brand Section with colorful text */}
                    <h2 className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-300">{clothe.brand}</h2>

                    {/* Sizes and Colors Section (Stacked vertically) */}
                    <div className="flex flex-col gap-3">
                        {/* Sizes Section with background color and hover effect */}
                        <h2 className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full inline-block font-semibold hover:bg-yellow-300 transition-all duration-300">{clothe.sizes}</h2>

                        {/* Colors Section with colorful background and text */}
                        <h2 className="px-3 py-1 bg-green-200 text-green-800 rounded-full inline-block font-semibold hover:bg-green-300 transition-all duration-300">{clothe.colors}</h2>
                    </div>
                </div>

                {/* Price Section */}
                <div className="flex flex-col gap-2">
                    {/* Old Price */}
                    {clothe.oldPrice && (
                        <p className="line-through text-gray-500 text-sm">{clothe.oldPrice}</p>
                    )}

                    {/* New Price */}
                    <p className="text-gray-900 font-bold text-xl">{`$${clothe.newPrice}`}</p>
                </div>

                {/* Add to Cart Button */}
                <button className="mt-5 w-full bg-red-500 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold shadow-md hover:shadow-xl transition-all duration-200 ease-in-out flex items-center justify-center gap-2 transform hover:scale-105">
                    <span>Add to Cart</span> <span className="text-lg">🛒</span>
                </button>
            </div>
        </div>
    );
};

export default ClothesCard;
