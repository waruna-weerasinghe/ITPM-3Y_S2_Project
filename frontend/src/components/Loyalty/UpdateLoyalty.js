import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateLoyalty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telephone: "",
    address: "",
    image: "",
    category: {
      TShirts: 0,
      Denim: 0,
      Frocks: 0,
      Shorts: 0,
      Trousers: 0,
    },
  });

  useEffect(() => {
    async function fetchLoyalty() {
      try {
        const response = await axios.get(`http://localhost:8080/LoyaltyProgramme/get/${id}`);
        const data = response.data.LoyaltyProgramme;

        setFormData({
          name: data.name || "",
          email: data.email || "",
          telephone: data.telephone || "",
          address: data.address || "",
          category: typeof data.category === "string" ? JSON.parse(data.category) : data.category || {},
          image: data.image || "",
        });
      } catch (error) {
        console.error("Error fetching loyalty data:", error);
        alert("Failed to fetch loyalty data.");
      }
    }
    fetchLoyalty();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (category, value) => {
    setFormData((prev) => ({
      ...prev,
      category: {
        ...prev.category,
        [category]: Math.max(0, prev.category[category] + value),
      },
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result, // Base64 preview
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/LoyaltyProgramme/update/${id}`, {
        ...formData,
        category: JSON.stringify(formData.category),
      });

      alert("Loyalty form updated successfully!");
      navigate("/list");
    } catch (error) {
      console.error("Error updating Loyalty Form:", error);
      alert("Failed to update loyalty form.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Update Loyalty Form</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          {["name", "email", "telephone", "address"].map((field) => (
            <div key={field}>
              <label className="block text-gray-600 mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div>
            <label className="block text-gray-600 mb-1">Select Categories:</label>
            <div className="space-y-2">
              {Object.keys(formData.category).map((category) => (
                <div key={category} className="flex justify-between items-center p-3 border rounded-lg bg-gray-50">
                  <span className="text-gray-700 font-medium">{category}</span>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                      onClick={() => handleCategoryChange(category, -1)}
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">{formData.category[category]}</span>
                    <button
                      type="button"
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                      onClick={() => handleCategoryChange(category, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Upload Image:</label>
            <input
              type="file"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {formData.image && (
              <div className="mt-3 flex justify-center">
                <img src={formData.image} alt="Uploaded" className="max-w-xs rounded-lg shadow-lg" />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white font-medium bg-indigo-600 hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateLoyalty;
