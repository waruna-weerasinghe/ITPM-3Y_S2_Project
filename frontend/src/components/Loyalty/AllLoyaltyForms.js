import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AllLoyaltyForm() {
  const [LoyaltyForms, setLoyaltyForms] = useState([]); // ✅ State for storing loyalty forms
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const navigate = useNavigate();

  useEffect(() => {
    async function getLoyaltyForms() {
      try {
        const res = await axios.get("http://localhost:8080/LoyaltyProgramme/");
        console.log("API Response:", res.data); // ✅ Debugging log
        setLoyaltyForms(res.data.LoyaltyForms || res.data); // ✅ Ensure correct key
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        alert("Error fetching data: " + err.message);
        setLoading(false);
      }
    }
    getLoyaltyForms();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">All Loyalty Forms</h1>

      {loading ? (
        <p>Loading...</p>
      ) : LoyaltyForms.length > 0 ? (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Telephone</th>
              <th>Address</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {LoyaltyForms.map((form, index) => (
              <tr key={form._id}>
                <td>{index + 1}</td>
                <td>{form.name}</td>
                <td>{form.email}</td>
                <td>{form.telephone}</td>
                <td>{form.address}</td>
                <td>{form.category}</td>
                <td>
                  <button 
                    className="btn btn-warning"
                    onClick={() => navigate(`/updateLoyalty/${form._id}`)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No loyalty forms found.</p>
      )}
    </div>
  );
}
