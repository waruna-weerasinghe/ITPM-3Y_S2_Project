import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './CreateUsers.css'; // Import CSS file
import Swal from 'sweetalert2';
import AdminNav from '../Nav/adminNav';
function CreateStaff() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [reenterPassword, setReenterPassword] = useState("");
    const [number, setNumber] = useState("");
    const [role, setRole] = useState(""); // State for role
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        

        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!name.match(nameRegex)) {
          
            Swal.fire({
                icon: 'error',
                title: 'error...',
                text: 'Name should only contain letters.',
            });
            return;
        }

        if (password !== reenterPassword) {
            
            Swal.fire({
                icon: 'error',
                title: 'error...',
                text: 'Passwords do not match.',
            });
            
            return;
        }

        const validNumberLength = 10;
        if (number.length !== validNumberLength) {
           
            Swal.fire({
                icon: 'error',
                title: 'error...',
                text: 'Mobile number should be 10 digits.',
            });
            return;
        }

        axios.post('http://localhost:8175/user/staffregister', { name, email, password, number, role }) // Include role in the request
            .then(result => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "user successful added",
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log(result);
              
                navigate('/staffdetails');
            })
            .catch(err => {
                if (err.response && err.response.data.error ) {
                    // Display SweetAlert2 popup message
                    Swal.fire({
                        icon: 'error',
                        title: 'error...',
                        text: 'Email is already in use. Please use a different email.',
                    });
                } else {
                    console.log(err);
                }
            });
    }
    return (
        <div className="container">
            <AdminNav/>
             <div className="form-container">
               
                <form onSubmit={handleSubmit}>
                <h2>Add employee</h2>
                    <div >
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            autoComplete="off"
                            name="name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div >
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            autoComplete="off"
                            name="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div >
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div >
                        <label htmlFor="reenterPassword">Reenter Password</label>
                        <input
                            type="password"
                            placeholder="Reenter password"
                            name="reenterPassword"
                            className="form-control"
                            value={reenterPassword}
                            onChange={(e) => setReenterPassword(e.target.value)}
                        />
                    </div>
                    <div >
                        <label htmlFor="number">Mobile Number</label>
                        <input
                            type="number"
                            placeholder="Enter mobile number"
                            name="number"
                            className="form-control"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </div>
                    <div >
                        <label htmlFor="role">Role</label>
                        <select
                            className="form-control"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            
                            <option value="admin">Admin</option>
                            <option value="staff">Staff</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateStaff;
