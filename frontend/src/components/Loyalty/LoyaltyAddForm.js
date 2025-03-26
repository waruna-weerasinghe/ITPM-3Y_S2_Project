import React, { useState } from "react";
import axios from "axios";

export default function LoyaltyAddForm() {
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

  // Send data to backend
  function sendData(e) {
    e.preventDefault();

    // Filter out categories with count 0
    const filteredCategories = Object.fromEntries(
      Object.entries(categories).filter(([_, count]) => count > 0)
    );

    const newLoyalty = {
      name,
      email,
      telephone,
      address,
      category: JSON.stringify(filteredCategories), // Store as JSON
    };

    axios
      .post("http://localhost:8080/LoyaltyProgramme/add", newLoyalty)
      .then(() => {
        alert("Loyalty Form Successfully Submitted");

        // Reset form fields
        setName("");
        setEmail("");
        setTelephone("");
        setAddress("");
        setCategories({
          TShirts: 0,
          Denim: 0,
          Frocks: 0,
          Shorts: 0,
          Trousers: 0,
        });
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container">
      <h2 className="my-4">Add Loyalty Programme</h2>
      <form onSubmit={sendData}>
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

        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  );
}
