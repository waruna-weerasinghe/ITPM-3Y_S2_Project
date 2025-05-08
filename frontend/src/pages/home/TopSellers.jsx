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
                const updatedData = data.map((clothe, index) => ({
                    ...clothe,
                    id: clothe.id || index,
                }));
                setClothes(updatedData);
            });
    }, []);

    const filteredClothes = selectedCategory === "All Categories"
        ? clothes
        : clothes.filter(clothe =>
            clothe.category.toLowerCase() === selectedCategory.toLowerCase()
        );

    return (
        <div className="py-14 px-6 md:px-12 bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl border border-gray-200">
            {/* Heading */}
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10 tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">🔥 Our Top Stocks</span>
            </h2>

            {/* Category Dropdown */}
            <div className="flex justify-center mb-10">
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    name="category"
                    id="category"
                    className="px-5 py-3 bg-white text-gray-800 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm font-medium"
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {/* Grid of Clothes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredClothes.length > 0 ? (
                    filteredClothes.map((clothe) => (
                        <ClothesCard key={clothe.id} clothe={clothe} />
                    ))
                ) : (
                    <p className="text-gray-500 text-center col-span-full text-lg font-medium">
                        No items found for this category.
                    </p>
                )}
            </div>
        </div>
    );
};

export default TopSellers;
