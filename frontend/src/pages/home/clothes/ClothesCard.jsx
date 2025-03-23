import React from 'react';

const ClothesCard = ({ clothe }) => {
    return (
        <div className='bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200'>
            <img
                src={clothe.image}
                alt={clothe.name}
                className='w-full h-52 object-cover rounded-md'
            />
            <div className='mt-4 text-center'>
                <h3 className='text-lg font-semibold text-gray-800'>{clothe.name}</h3>
                <p className='text-gray-500'>{clothe.category}</p>
                <p className='text-indigo-600 font-bold mt-2'>${clothe.price}</p>
                <button className='mt-3 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition'>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ClothesCard;