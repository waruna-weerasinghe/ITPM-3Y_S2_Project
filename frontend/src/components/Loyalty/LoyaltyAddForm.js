import React, { useState, useEffect } from "react";
import axios from "axios";
//import Cookies from "js-cookie";
//import UserNav from "../Nav/userNav";
//import Footer from "../Nav/footer";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useNavigate } from "react-router-dom";

export default function LoyaltyAddForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState({
    TShirts: 0,
    Denim: 0,
    Frocks: 0,
    Shorts: 0,
    Trousers: 0,
  });
  const navigate = useNavigate();

  // useEffect(() => {
  //   const userId = Cookies.get("userId");
  //   if (userId) {
  //     axios
  //       .get(`http://localhost:8080/user/getUsers/${userId}`)
  //       .then((result) => {
  //         setName(result.data.name);
  //         setEmail(result.data.email);
  //         setTelephone(result.data.number);
  //       })
  //       .catch((err) => console.error(err));
  //   }
  // }, []);

  const increment = (category) => {
    setCategories((prev) => ({
      ...prev,
      [category]: prev[category] + 1,
    }));
  };

  const decrement = (category) => {
    setCategories((prev) => ({
      ...prev,
      [category]: Math.max(0, prev[category] - 1),
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const sendData = (e) => {
    e.preventDefault();

    const filteredCategories = Object.fromEntries(
      Object.entries(categories).filter(([_, count]) => count > 0)
    );

    if (Object.keys(filteredCategories).length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select at least one category!",
      });
      return;
    }

    const newLoyalty = {
      name,
      email,
      telephone,
      address,
      category: JSON.stringify(filteredCategories),
      image,
    };

    axios
      .post("http://localhost:8080/LoyaltyProgramme/add", newLoyalty)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Loyalty Form Submitted Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/loyaltyList");

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
        setImage(null);
      })
      .catch((err) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error submitting form",
          showConfirmButton: false,
          timer: 1500,
        });
        console.error(err);
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/*<UserNav />*/}
      <div className="container mx-auto px-4 py-12">
        <form
          onSubmit={sendData}
          className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg"
          encType="multipart/form-data"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
            Add Loyalty Programme
          </h2>

          <div className="mb-4">
            <label className="block text-gray-600">Name:</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
             // disabled
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600">Email:</label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
             // disabled
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600">Telephone:</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
             // disabled
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600">Address:</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600">Select Categories:</label>
            <div className="space-y-3">
              {Object.keys(categories).map((category) => (
                <div
                  key={category}
                  className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
                >
                  <span className="text-gray-700 font-medium">{category}</span>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                      onClick={() => decrement(category)}
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">
                      {categories[category]}
                    </span>
                    <button
                      type="button"
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                      onClick={() => increment(category)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Receipt:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
      {/*<Footer />*/}
    </div>
  );
}
