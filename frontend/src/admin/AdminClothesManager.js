import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminClothesManager = () => {
  const [clothes, setClothes] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", image: "", category: "" });
  const [editId, setEditId] = useState(null);

  const fetchClothes = async () => {
    const res = await axios.get("http://localhost:8080/api/clothes");
    setClothes(res.data);
  };

  useEffect(() => {
    fetchClothes();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] }); // Handling file input
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("image", form.image); // Add the image file to formData
    formData.append("category", form.category);

    try {
      if (editId) {
        await axios.put(`http://localhost:8080/api/clothes/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("http://localhost:8080/api/clothes", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setForm({ name: "", price: "", image: "", category: "" });
      setEditId(null);
      fetchClothes();
    } catch (error) {
      console.error("Error uploading the clothing item", error);
    }
  };

  const handleEdit = (clothe) => {
    setForm(clothe);
    setEditId(clothe._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/clothes/${id}`);
    fetchClothes();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🛠️ Admin Clothes Manager</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid gap-4 mb-6">
        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="Clothing Name"
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          value={form.price}
          placeholder="Price"
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="category"
          value={form.category}
          placeholder="Category (e.g., Men, Women, Kids)"
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editId ? "Update" : "Add"} Clothing Item
        </button>
      </form>

      {/* List of Clothes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {clothes.map((clothe) => (
          <div key={clothe._id} className="p-4 border rounded shadow">
            <img
              src={`http://localhost:8080/${clothe.image}`}
              alt={clothe.name}
              className="h-40 object-cover w-full rounded"
            />
            <h3 className="text-xl font-semibold mt-2">{clothe.name}</h3>
            <p>${clothe.price}</p>
            <p className="text-sm text-gray-600">{clothe.category}</p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => handleEdit(clothe)} className="bg-yellow-400 px-3 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(clothe._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminClothesManager;
