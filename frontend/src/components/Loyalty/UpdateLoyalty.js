import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";

const UpdateLoyalty = () => {
  const { id } = useParams(); // Get Loyalty ID from URL
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchLoyalty = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/LoyaltyProgramme/get/${id}`);
        const loyaltyData = response.data.LoyaltyProgramme; // Ensure correct response handling
        setName(loyaltyData.name || "");
        setEmail(loyaltyData.email || "");
        setTelephone(loyaltyData.telephone || "");
        setAddress(loyaltyData.address || "");
        setCategory(loyaltyData.category || "");
      } catch (error) {
        console.error("Error fetching loyalty data:", error);
        alert("Failed to fetch loyalty data. Please try again.");
      }
    };
    fetchLoyalty();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const updatedLoyalty = { name, email, telephone, address, category };

    try {
      await axios.put(`http://localhost:8080/LoyaltyProgramme/update/${id}`, updatedLoyalty);
      alert("Loyalty form updated successfully");
      navigate("/list"); // Redirect to loyalty list page
    } catch (error) {
      console.error("Error updating Loyalty Form:", error);
      alert("Failed to update loyalty form. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Update Loyalty Form</h2>
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
          <label>Category:</label>
          <input type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>

        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default UpdateLoyalty;
