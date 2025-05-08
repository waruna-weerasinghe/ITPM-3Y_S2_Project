import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaEdit, FaTrash } from 'react-icons/fa';

function UserLoyaltyForm() {
    const [userLoyalties, setUserLoyalties] = useState([]);
    const userId = Cookies.get('userId');

    useEffect(() => {
        fetchUserLoyalties();
    }, []);

    const fetchUserLoyalties = () => {
        axios
            .get('http://localhost:8175/loyalty/')
            .then((res) => {
                const filtered = res.data.filter(item => item.userId === userId);
                setUserLoyalties(filtered);
            })
            .catch((err) => {
                alert('Failed to fetch loyalty data: ' + err.message);
            });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this loyalty record!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`http://localhost:8175/loyalty/delete/${id}`)
                    .then(() => {
                        fetchUserLoyalties();
                        Swal.fire('Deleted!', 'Your loyalty record has been deleted.', 'success');
                    })
                    .catch((err) => {
                        Swal.fire('Error!', 'Failed to delete loyalty record.', 'error');
                    });
            }
        });
    };

    return (
        <div>
            <header>
               
            </header>

            <div>
                <table className="w-full border-collapse mt-20 px-10 round-lg">
                    <thead className="text-xs text-white bg-gray-900">
                        <tr>
                            <th className="px-2 py-2">Name</th>
                            <th className="px-2 py-2">Email</th>
                            <th className="px-4 py-2">Telephone</th>
                            <th className="px-4 py-2">Address</th>
                            <th className="px-2 py-2">Category</th>
                            <th className="px-4 py-2">Image</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-500">
                        {userLoyalties.map((loyalty, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-300' : 'bg-grey-300'}>
                                <td className="px-2 py-2">{loyalty.name}</td>
                                <td className="px-2 py-2">{loyalty.email}</td>
                                <td className="px-4 py-2">{loyalty.telephone}</td>
                                <td className="px-4 py-2">{loyalty.address}</td>
                                <td className="px-2 py-2">{loyalty.category}</td>
                                <td className="px-4 py-2">
                                    <img src={loyalty.image} alt={loyalty.name} className="w-20 h-20 object-cover" />
                                </td>
                                <td className="px-4 py-2">
                                    <Link to={`/updateLoyalty/${loyalty._id}`}>
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"><FaEdit /></button>
                                    </Link>
                                    <button onClick={() => handleDelete(loyalty._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserLoyaltyForm;
