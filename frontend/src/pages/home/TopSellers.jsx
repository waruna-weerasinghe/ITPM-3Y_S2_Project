import React, { useEffect, useState } from 'react';
import ClothesCard from './clothes/ClothesCard';

const categories = ["All Categories", "Men", "Women", "Kids"];

const TopSellers = () => {
    const [clothes, setClothes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All Categories");

    useEffect(() => {
        fetch("clothes.json")
            .then(res => res.json())
            .then((data) => {
                // Ensure each item has a unique ID
                const updatedData = data.map((clothe, index) => ({
                    ...clothe,
                    id: clothe.id || index, // Use existing id or fallback to index
                }));
                setClothes(updatedData);
            });
    }, []);

    const filteredClothes = selectedCategory === "All Categories"
        ? clothes
        : clothes.filter(clothe => clothe.category.toLowerCase() === selectedCategory.toLowerCase());

    return (
        <div className='py-10 px-6 bg-gray-50 rounded-lg shadow-lg'>
            <h2 className='text-4xl font-bold mb-6 text-center text-gray-900'>🔥 Top Sellers</h2>

            {/* Category Dropdown */}
            <div className='flex justify-center mb-6'>
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    name="category"
                    id='category'
                    className='px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all'
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>{category}</option> // Using category name as key
                    ))}
                </select>
            </div>

            {/* Display Filtered Clothes */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {filteredClothes.length > 0 ? (
                    filteredClothes.map((clothe) => (
                        <ClothesCard key={clothe.id} clothe={clothe} />
                    ))
                ) : (
                    <p className='text-gray-500 text-center col-span-full'>No items found for this category.</p>
                )}
            </div>
        </div>
    );
};

export default TopSellers;
