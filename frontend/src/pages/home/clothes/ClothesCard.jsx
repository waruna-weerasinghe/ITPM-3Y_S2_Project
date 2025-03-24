import React from 'react';

const ClothesCard = ({ clothe }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 duration-300 ease-in-out border border-gray-300 overflow-hidden hover:border-indigo-500">
            <img
                src={clothe.coverImage}
                alt={clothe.name}
                className="w-full h-60 object-cover rounded-lg transition-transform duration-300 hover:scale-110"
            />
            <div className="p-5 space-y-3">
                <h3 className="text-2xl font-semibold text-gray-900 truncate hover:text-indigo-600 transition-colors duration-200">{clothe.title}</h3>
                <p className="text-gray-500 text-sm">{clothe.category}</p>
                <p className="text-gray-900 font-bold text-xl">${clothe.price}</p>
                <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-xl transition-all duration-200 ease-in-out flex items-center justify-center gap-2 transform hover:scale-105">
                    <span>Add to Cart</span> <span className="text-lg">🛒</span>
                </button>
            </div>
        </div>
    );
};

export default ClothesCard;
