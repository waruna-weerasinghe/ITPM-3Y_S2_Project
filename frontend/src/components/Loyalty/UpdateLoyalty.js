import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";

const UpdateLoyalty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [categories, setCategories] = useState({
    TShirts: 0,
    Denim: 0,
    Frocks: 0,
    Shorts: 0,
    Trousers: 0,
  });

  // Fetch existing data
  useEffect(() => {
    const fetchLoyalty = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/LoyaltyProgramme/get/${id}`);
        const loyaltyData = response.data.LoyaltyProgramme;

        setName(loyaltyData.name || "");
        setEmail(loyaltyData.email || "");
        setTelephone(loyaltyData.telephone || "");
        setAddress(loyaltyData.address || "");

        // Parse category data properly (from stored JSON format)
        if (loyaltyData.category) {
          setCategories(JSON.parse(loyaltyData.category)); // Convert back to object
        }
      } catch (error) {
        console.error("Error fetching loyalty data:", error);
        alert("Failed to fetch loyalty data. Please try again.");
      }
    };
    fetchLoyalty();
  }, [id]);

  // Increment category count
  const increment = (category) => {
    setCategories((prev) => ({
      ...prev,
      [category]: prev[category] + 1,
    }));
  };

  // Decrement category count (ensuring it doesn’t go below 0)
  const decrement = (category) => {
    setCategories((prev) => ({
      ...prev,
      [category]: Math.max(0, prev[category] - 1),
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Convert categories object to JSON for storage
    const updatedLoyalty = {
      name,
      email,
      telephone,
      address,
      category: JSON.stringify(categories), // Store as JSON string
    };

    try {
      await axios.put(`http://localhost:8080/LoyaltyProgramme/update/${id}`, updatedLoyalty);
      alert("Loyalty form updated successfully");
      navigate("/list");
    } catch (error) {
      console.error("Error updating Loyalty Form:", error);
      alert("Failed to update loyalty form. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Update Loyalty Form</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label>Name:</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label>Email:</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label>Telephone:</label>
          <input type="text" className="form-control" value={telephone} onChange={(e) => setTelephone(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label>Address:</label>
          <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Select Categories</label>
          {Object.keys(categories).map((category) => (
            <div key={category} className="d-flex justify-content-between align-items-center p-2 border rounded">
              <span>{category}</span>
              <div>
                <button type="button" className="btn btn-danger mx-1" onClick={() => decrement(category)}>-</button>
                <span className="px-3">{categories[category]}</span>
                <button type="button" className="btn btn-success mx-1" onClick={() => increment(category)}>+</button>
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
