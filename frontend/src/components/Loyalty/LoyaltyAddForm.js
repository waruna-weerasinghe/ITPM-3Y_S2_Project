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

  function sendData(e) {
    e.preventDefault();

    const filteredCategories = Object.fromEntries(
      Object.entries(categories).filter(([_, count]) => count > 0)
    );

    const newLoyalty = {
      name,
      email,
      telephone,
      address,
      category: JSON.stringify(filteredCategories),
    };

    axios
      .post("http://localhost:8080/LoyaltyProgramme/add", newLoyalty)
      .then(() => {
        alert("Loyalty Form Successfully Submitted");

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
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
        Add Loyalty Programme
      </h2>
      <form onSubmit={sendData} className="space-y-4">
        <div>
          <label className="block text-gray-600">Name:</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-600">Email:</label>
          <input
            type="email"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-600">Telephone:</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-600">Address:</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-600">Select Categories</label>
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
                  <span className="text-lg font-semibold">{categories[category]}</span>
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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
