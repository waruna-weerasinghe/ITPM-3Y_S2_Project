import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteLoyaltyForm = () => {
  const { id } = useParams(); // Get LoyaltyId from URL
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Loyalty Form?");
    
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/LoyaltyProgramme/delete/${id}`);
        alert("Loyalty Form deleted successfully!"); //  Success message
        navigate('/list'); //  Redirect after deletion
      } catch (error) {
        console.error("Error deleting Loyalty Form:", error);
        alert("Error deleting Loyalty Form!"); //  Error message
      }
    } else {
      alert("Deletion canceled!"); //  Message if user clicks "No"
    }
  };

  return (
    <div>
      <h2>Delete Loyalty Form</h2>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete Loyalty Form
      </button>
    </div>
  );
};

export default DeleteLoyaltyForm;
