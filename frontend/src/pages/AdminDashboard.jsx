import React, { useState } from "react";
import { FaBox, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const AdminDashboard = () => {
    const [products, setProducts] = useState([
        { id: 1, name: "Sample Product 1", price: 10.00, stock: 5 },
        { id: 2, name: "Sample Product 2", price: 20.00, stock: 10 }
    ]);
    const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "" });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let errors = {};
        if (!newProduct.name.trim()) errors.name = "Product name is required";
        if (!newProduct.price || isNaN(newProduct.price) || newProduct.price <= 0) errors.price = "Valid price is required";
        if (!newProduct.stock || isNaN(newProduct.stock) || newProduct.stock < 0) errors.stock = "Valid stock quantity is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddProduct = () => {
        if (!validateForm()) return;

        const newId = products.length ? products[products.length - 1].id + 1 : 1;
        setProducts([...products, { id: newId, ...newProduct, price: parseFloat(newProduct.price), stock: parseInt(newProduct.stock) }]);
        setNewProduct({ name: "", price: "", stock: "" });
        setErrors({});
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-1/5 bg-gray-900 text-white p-6 flex flex-col space-y-6">
                <h2 className="text-2xl font-bold">Admin Panel</h2>
                <nav>
                    <ul className="space-y-2">
                        <li className="hover:bg-gray-700 p-3 rounded cursor-pointer">Dashboard</li>
                        <li className="hover:bg-gray-700 p-3 rounded cursor-pointer">Orders</li>
                        <li className="hover:bg-gray-700 p-3 rounded font-bold bg-blue-600">Products</li>
                        <li className="hover:bg-gray-700 p-3 rounded cursor-pointer">Users</li>
                        <li className="hover:bg-gray-700 p-3 rounded cursor-pointer">Settings</li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                {/* Header */}
                <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6">
                    <h1 className="text-2xl font-bold text-gray-700">Product Management</h1>
                    <button
                        onClick={handleAddProduct}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center shadow-md transition">
                        <FaPlus className="mr-2" /> Add Product
                    </button>
                </div>

                {/* Add New Product Form */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="number"
                            placeholder="Stock"
                            value={newProduct.stock}
                            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                            className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    {Object.keys(errors).map((key) => (
                        <p key={key} className="text-red-500 text-sm mt-2">{errors[key]}</p>
                    ))}
                </div>

                {/* Product List */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Product List</h2>
                    <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="border p-3">ID</th>
                                <th className="border p-3">Product Name</th>
                                <th className="border p-3">Price</th>
                                <th className="border p-3">Stock</th>
                                <th className="border p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product.id} className={`text-center ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
                                    <td className="border p-3">{product.id}</td>
                                    <td className="border p-3">{product.name}</td>
                                    <td className="border p-3">${product.price.toFixed(2)}</td>
                                    <td className="border p-3">{product.stock}</td>
                                    <td className="border p-3 flex justify-center space-x-2">
                                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition">
                                            <FaEdit />
                                        </button>
                                        <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
