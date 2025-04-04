import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import './CreateUsers.css';
import { BsPersonFill } from 'react-icons/bs'; 
import Swal from 'sweetalert2';
import AdminNav from '../Nav/adminNav';

function UpdateUsers() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reenterPassword, setReenterPassword] = useState("");
    const [number, setNumber] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();
    const [file, setFile] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8080/user/getUser/${id}`)
            .then(result => {
                setName(result.data.name);
                setEmail(result.data.email);
                setNumber(result.data.number);
                setImage(result.data.image);
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
                text: "Mobile number should be 10 digits",
            });
            return;
        }

        const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!email.match(gmailPattern)) {
            Swal.fire({
                icon: "error",
                title: "Error...",
                text: "Please enter a valid Gmail address",
            });
            return;
        }

        if (password && password !== reenterPassword) {
            Swal.fire({
                icon: "error",
                title: "Error...",
                text: "Passwords don't match",
            });
            return;
        }

        // Prepare update data
        const updateData = {
            name,
            email,
            number,
        };

        // Only include password fields if they're not empty
        if (password) {
            updateData.password = password;
            updateData.reenterPassword = reenterPassword;
        }

        // If all validations pass, proceed with the update request
        axios.put(`http://localhost:8080/user/userupdate/${id}`, updateData)
            .then((result) => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Update successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/userdetails');
            })
            .catch((err) => {
                if (err.response && err.response.data.error === 'Email is already in use') {
                    Swal.fire({
                        icon: "error",
                        title: "Error...",
                        text: "Email is already in use. Please use a different email.",
                    });
                } else {
                    console.log(err);
                    Swal.fire({
                        icon: "error",
                        title: "Error...",
                        text: "An error occurred during update",
                    });
                }
            });
    };

    const handleUpload = (e) => {
        e.preventDefault();
        if (!file) {
            Swal.fire({
                icon: "error",
                title: "Error...",
                text: "Please select a file first",
            });
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        axios.post(`http://localhost:8080/user/userimageupdate/${id}`, formData)
            .then(res => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Image uploaded successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                setImage(res.data.image); // Update the image state with the new image name
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    icon: "error",
                    title: "Error...",
                    text: "Failed to upload image",
                });
            });
    };
    
    const handleRemovePhoto = () => {
        axios.post(`http://localhost:8080/user/userremove-image/${id}`)
            .then(res => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Image removed successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                setImage(null);
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    icon: "error",
                    title: "Error...",
                    text: "Failed to remove image",
                });
            });
    };
    
    const handleClickProfilePicture = () => {
        if (image) {
            Swal.fire({
                imageUrl: `http://localhost:8080/image/${image}`,
                imageAlt: 'Profile Picture',
                showCloseButton: true,
                showConfirmButton: false,
                width: 'auto',
                height: 'auto',
            });
        }
    };
    
    return (
        <div className="container">
            <AdminNav /> 
            <div className="image-container">
                {image ? (
                    <img
                        src={`http://localhost:8080/image/${image}`}
                        alt="Profile"
                        style={{ borderRadius: '50%', cursor: 'pointer', width: '100px', height: '100px' }}
                        onClick={handleClickProfilePicture}
                    />
                ) : (
                    <BsPersonFill size={100} color="#adb5bd" />
                )}
                <div className="upload-remove-buttons">
                    <input 
                        type="file" 
                        onChange={e => setFile(e.target.files[0])}
                        accept="image/*"
                    /> 
                    <button className="btn btn-primary mt-2 upload-btn" onClick={handleUpload}>
                        Upload photo
                    </button>
                    {image && (
                        <button className="btn btn-danger" onClick={handleRemovePhoto}>
                            Remove photo
                        </button>
                    )}
                </div>
            </div>

            <div className="form-container">
                <h2>Update user</h2>
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
                            required
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
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter new password (leave blank to keep current)"
                            name="password"
                            className="form-control rounded-0"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="reenterPassword">
                            <strong>Re-enter Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Re-enter new password"
                            name="reenterPassword"
                            className="form-control rounded-0"
                            value={reenterPassword}
                            onChange={(e) => setReenterPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="number">
                            <strong>Mobile Number</strong>
                        </label>
                        <input
                            type="tel"
                            placeholder="Enter mobile number"
                            name="number"
                            className="form-control rounded-0"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUsers;