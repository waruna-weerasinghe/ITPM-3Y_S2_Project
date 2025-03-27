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
        <div className="flex h-screen">
            <aside className="w-1/5 bg-gray-900 text-white p-4 space-y-4">
                <h2 className="text-xl font-bold">Admin Panel</h2>
                <nav>
                    <ul className="space-y-2">
                        <li className="hover:bg-gray-700 p-2 rounded">Dashboard</li>
                        <li className="hover:bg-gray-700 p-2 rounded">Orders</li>
                        <li className="hover:bg-gray-700 p-2 rounded font-bold">Products</li>
                        <li className="hover:bg-gray-700 p-2 rounded">Users</li>
                        <li className="hover:bg-gray-700 p-2 rounded">Settings</li>
                    </ul>
                </nav>
            </aside>

            <main className="flex-1 p-6 bg-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Product Management</h1>
                    <button onClick={handleAddProduct} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
                        <FaPlus className="mr-2" /> Add Product
                    </button>
                </div>

                <div className="mb-4 bg-white p-4 rounded shadow-md">
                    <h2 className="text-lg font-semibold">Add New Product</h2>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                        <input type="text" placeholder="Product Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="border p-2 rounded w-full" />
                        <input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="border p-2 rounded w-full" />
                        <input type="number" placeholder="Stock" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} className="border p-2 rounded w-full" />
                    </div>
                    {Object.keys(errors).map((key) => (
                        <p key={key} className="text-red-500 text-sm mt-1">{errors[key]}</p>
                    ))}
                </div>

                <div className="bg-white p-4 rounded shadow-md">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">ID</th>
                                <th className="border p-2">Product Name</th>
                                <th className="border p-2">Price</th>
                                <th className="border p-2">Stock</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="text-center">
                                    <td className="border p-2">{product.id}</td>
                                    <td className="border p-2">{product.name}</td>
                                    <td className="border p-2">${product.price.toFixed(2)}</td>
                                    <td className="border p-2">{product.stock}</td>
                                    <td className="border p-2 flex justify-center space-x-2">
                                        <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                                            <FaEdit />
                                        </button>
                                        <button className="bg-red-500 text-white px-3 py-1 rounded">
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