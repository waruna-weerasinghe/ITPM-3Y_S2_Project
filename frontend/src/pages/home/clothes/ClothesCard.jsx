import React from 'react';


const ClothesCard = ({ clothe }) => {
    return (
        <div className='bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 duration-300 ease-in-out border border-gray-300 overflow-hidden'>
            <img
                src={clothe.coverImage}
                alt={clothe.name}
                className='w-full h-50 object-cover rounded-t-2xl transition-transform duration-300 hover:scale-105'
            />
            <div className='p-4 text-center'>
                <h3 className='text-2xl font-bold text-gray-800'>{clothe.name}</h3>
                <p className='text-gray-500 text-sm mt-1'>{clothe.category}</p>
                <p className='text-gray-900 font-semibold text-lg mt-3'>${clothe.price}</p>
                <button className='mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center gap-2'>
                    <span>Add to Cart</span> <span className='text-lg'>🛒</span>
                </button>
            </div>
        </div>
    );
};

export default ClothesCard;
