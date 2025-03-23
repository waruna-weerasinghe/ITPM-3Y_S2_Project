import React from 'react';

const ClothesCard = ({ clothe }) => {
    return (
        <div className='bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-100 transform hover:scale-105 duration-300 ease-in-out'>
            <img
                src={clothe.image}
                alt={clothe.name}
                className='w-full h-60 object-cover rounded-xl'
            />
            <div className='mt-5 text-center'>
                <h3 className='text-xl font-bold text-gray-800'>{clothe.name}</h3>
                <p className='text-gray-500 text-sm uppercase tracking-wide'>{clothe.category}</p>
                <p className='text-indigo-600 font-bold text-lg mt-3'>${clothe.price}</p>
                <button className='mt-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 ease-in-out'>
                    🛒 Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ClothesCard;