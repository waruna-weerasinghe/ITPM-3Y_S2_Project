import React from "react";
import { FaBox, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const AdminDashboard = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
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

            {/* Main Content */}
            <main className="flex-1 p-6 bg-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Product Management</h1>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
                        <FaPlus className="mr-2" /> Add Product
                    </button>
                </div>

                {/* Product Table */}
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
                            {[1, 2, 3].map((id) => (
                                <tr key={id} className="text-center">
                                    <td className="border p-2">{id}</td>
                                    <td className="border p-2">Sample Product {id}</td>
                                    <td className="border p-2">${(id * 10).toFixed(2)}</td>
                                    <td className="border p-2">{id * 5}</td>
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
