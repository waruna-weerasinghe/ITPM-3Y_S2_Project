import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AllLoyaltyForm() {
  const [loyaltyForms, setLoyaltyForms] = useState([]); // State for storing loyalty forms
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLoyaltyForms() {
      try {
        const res = await axios.get("http://localhost:8080/LoyaltyProgramme/");
        setLoyaltyForms(res.data); // Assuming res.data is an array
      } catch (err) {
        console.error("Error fetching data:", err);
        alert("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLoyaltyForms();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        All Loyalty Forms
      </h2>

      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : loyaltyForms.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="px-4 py-2 text-left">No</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Telephone</th>
                <th className="px-4 py-2 text-left">Address</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loyaltyForms.map((form, index) => (
                <tr key={form._id} className="border-t border-gray-600">
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2">{form.name}</td>
                  <td className="px-4 py-2">{form.email}</td>
                  <td className="px-4 py-2">{form.telephone}</td>
                  <td className="px-4 py-2">{form.address}</td>
                  <td className="px-4 py-2">{form.category}</td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-200"
                      onClick={() => navigate(`/updateLoyalty/${form._id}`)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                      onClick={() => navigate(`/deleteLoyaltyForm/${form._id}`)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No loyalty forms found.</p>
      )}
    </div>
  );
}
