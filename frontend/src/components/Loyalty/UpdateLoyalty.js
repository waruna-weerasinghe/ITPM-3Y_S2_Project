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
    category: {
      TShirts: 0,
      Denim: 0,
      Frocks: 0,
      Shorts: 0,
      Trousers: 0,
    }
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
          category: JSON.parse(data.category || "{}")
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
        [category]: Math.max(0, prev.category[category] + value)
      }
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/LoyaltyProgramme/update/${id}`, {
        ...formData,
        category: JSON.stringify(formData.category)
      });
      alert("Loyalty form updated successfully");
      navigate("/list");
    } catch (error) {
      console.error("Error updating Loyalty Form:", error);
      alert("Failed to update loyalty form.");
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Update Loyalty Form</h2>
      <form onSubmit={handleUpdate}>
        {["name", "email", "telephone", "address"].map((field) => (
          <div className="mb-3" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input 
              type="text" 
              className="form-control"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        
        <div className="mb-3">
          <label className="form-label">Select Categories</label>
          {Object.keys(formData.category).map((category) => (
            <div key={category} className="d-flex justify-content-between align-items-center p-2 border rounded">
              <span>{category}</span>
              <div>
                <button type="button" className="btn btn-danger mx-1" onClick={() => handleCategoryChange(category, -1)}>-</button>
                <span className="px-3">{formData.category[category]}</span>
                <button type="button" className="btn btn-success mx-1" onClick={() => handleCategoryChange(category, 1)}>+</button>
              </div>
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary w-100">Update</button>
      </form>
    </div>
  );
};

export default UpdateLoyalty;
