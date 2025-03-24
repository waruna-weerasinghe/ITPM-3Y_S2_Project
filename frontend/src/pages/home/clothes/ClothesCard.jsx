import React from 'react';

const ClothesCard = ({ clothe }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 ease-in-out border border-gray-200 overflow-hidden">
            <img
                src={clothe.coverImage}
                alt={clothe.name}
                className="w-full h-60 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
            />
            <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 truncate">{clothe.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{clothe.category}</p>
                <p className="text-gray-900 font-bold text-lg mt-3">${clothe.price}</p>
                <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-xl transition-all duration-300 ease-in-out flex items-center justify-center gap-2">
                    <span>Add to Cart</span> <span className="text-lg">🛒</span>
                </button>
            </div>
        </div>
    );
};

export default ClothesCard;
