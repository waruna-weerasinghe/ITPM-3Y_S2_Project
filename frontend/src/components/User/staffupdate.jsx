import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import './CreateUsers.css';
import { BsPersonFill } from 'react-icons/bs'; 
import Swal from 'sweetalert2';

function UpdateStaff() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reenterPassword, setReenterPassword] = useState("");
    const [number, setNumber] = useState("");
    const [image, setImage] = useState("");
    const [role, setRole] = useState(""); // State for role
    const navigate = useNavigate();
    const [file, setFile] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8080/user/getUser/${id}`)
            .then(result => {
                setName(result.data.name);
                setEmail(result.data.email);
                setReenterPassword(result.data.reenterPassword);
                setNumber(result.data.number);
                setImage(result.data.image);
                setRole(result.data.role); // Set role from the data
            })
            .catch(err => console.log(err));
    }, [id]);

    const Update = (e) => {
        e.preventDefault();

        // Validation checks
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!name.match(nameRegex)) {
          
            Swal.fire({
                icon: "error",
                title: "Error...",
                text: "Name should only contain letters.",
              });
            return;
        }

        const validNumberLength = 10;
        if (number.length !== validNumberLength) {
           
            Swal.fire({
                icon: "error",
                title: "Error...",
                text: "Mobile number should be 10 digits.",
              });
            
            return;
        }
        const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!email.match(gmailPattern)) {
            Swal.fire({
                icon: "error",
                title: "Error...",
                text: "Please enter a valid Gmail address.",
              });
          
            return;
        }

        // If all validations pass, proceed with the update request
        axios.put(`http://localhost:8080/user/staffupdate/${id}`, {
            name,
            email,
            password,
            reenterPassword,
            number,
            role, // Include role in the update request
        })
        .then((result) => {
            console.log(result);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Update successful",
                showConfirmButton: false,
                timer: 1500
            });
            // Assuming you're using a navigation library like react-router-dom
            navigate('/staffdetails');
        })
        .catch((err) => {
            if (
                err.response &&
                err.response.data.error === 'Email is already in use'
            ) {
                alert('Email is already in use. Please use a different email.');
            } else {
                console.log(err);
            }
        });
    };

    const handleUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        axios.post(`http://localhost:8080/user/userimageupdate/${id}`, formData)
            .then(res => {
                console.log(res);
                
                window.location.reload();
            })
            .catch(err => console.log(err));
    };
    
    const handleRemovePhoto = () => {
        axios.post(`http://localhost:8080/user/userremove-image/${id}`) // Include the user's ID in the URL
            .then(res => {
                console.log(res);
                setImage(null);
            })
            .catch(err => console.log(err));
    };
    
    return (
        <div className="container">
            <div className="image-container">
                {image ? (
                    <img src={`http://localhost:3000/image/${image}`} alt="Profile" style={{ borderRadius: '50%' }} />
                ) : (
                    <BsPersonFill size={100} color="#adb5bd" />
                )}
                <div className="upload-remove-buttons">
                    <input type="file" onChange={e => setFile(e.target.files[0])}/> 
                    <button className="btn btn-primary mt-2 upload-btn" onClick={handleUpload}>Upload photo</button>

                    {image && (
                        <button className="btn btn-danger" onClick={handleRemovePhoto}>Remove photo</button>
                    )}
                </div>
            </div>

            <div className="form-container">
                <h2>update staff</h2>
                <form onSubmit={Update}>
                    <div className="mb-3">
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            autoComplete="off"
                            name="name"
                            className="form-control rounded-0"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            className="form-control rounded-0"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="reenterPassword">
                            <strong>Reenter Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Reenter password"
                            name="reenterPassword"
                            className="form-control rounded-0"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="number">
                            <strong>Mobile Number</strong>
                        </label>
                        <input
                            type="number"
                            placeholder="Enter mobile number"
                            name="number"
                            className="form-control rounded-0"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="role">
                            <strong>Role</strong>
                        </label>
                        <select
                            className="form-control rounded-0"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            
                            <option value="admin">Admin</option>
                            <option value="staff">Staff</option>
                            
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateStaff;