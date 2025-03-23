import React from 'react';

const ClothesCard = ({ clothe }) => {
    return (
        <div className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 duration-300 ease-in-out border-2 border-gray-200'>
            <img
                src={clothe.image}
                alt={clothe.name}
                className='w-full h-80 object-cover rounded-xl shadow-md hover:shadow-lg transition-all duration-300'
            />
            <div className='mt-6'>
                <h3 className='text-3xl font-semibold text-gray-800'>{clothe.name}</h3>
                <p className='text-gray-500 text-sm mt-2'>{clothe.category}</p>
                <p className='text-gray-900 font-bold text-xl mt-4'>${clothe.price}</p>
                <button className='mt-5 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-xl transition-all duration-300 ease-in-out'>
                    Add to Cart 🛒
                </button>
            </div>
        </div>
    );
};

export default ClothesCard;
