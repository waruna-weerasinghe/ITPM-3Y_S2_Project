import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaEdit, FaTrash, FaReceipt } from "react-icons/fa";

function AllLoyaltyForms() {
  const [loyaltyForms, setLoyaltyForms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchLoyaltyForms();
  }, []);

  const fetchLoyaltyForms = () => {
    axios
      .get("http://localhost:8080/LoyaltyProgramme/")
      .then((res) => {
        setLoyaltyForms(res.data);
      })
      .catch((err) => {
        alert("Failed to fetch data. Please check the server connection.");
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      axios
        .delete(`http://localhost:8080/LoyaltyProgramme/delete/${id}`)
        .then(() => {
          fetchLoyaltyForms();
        })
        .catch(() => {
          alert("Error deleting form. Please try again.");
        });
    }
  };

  const handleGenerateReport = () => {
    html2canvas(document.querySelector("#loyalty-table")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgHeight = (canvas.height * 208) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, 208, imgHeight);
      pdf.save("loyalty_forms_report.pdf");
    });
  };

  const filteredForms = loyaltyForms.filter((form) =>
    form.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredForms.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <main className="ml-20">
        <div className="flex justify-between items-center mt-2 mb-4 ml-20">
          <div className="rounded-lg bg-green-300 shadow-md p-4 mr-2 ml-20 w-50">
            <div className="text-lg font-semibold text-center">Total Forms</div>
            <div className="text-center text-3xl font-bold text-gray-800">
              {filteredForms.length}
            </div>
          </div>
          <button
            onClick={handleGenerateReport}
            className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg mt-2 mr-20 hover:bg-blue-700 flex items-center"
          >
            <FaReceipt className="mr-2" /> Report
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by name..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block px-4 py-2 text-sm text-gray-900 border border-gray-800 rounded-lg w-36 sm:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        />

        <table id="loyalty-table" className="w-100 text-m text-left text-gray-700 border-collapse mt-8 mr-8">
          <thead className="text-xs text-white uppercase bg-gray-900">
            <tr>
              <th className="px-2 py-2">No</th>
              <th className="px-2 py-2">Name</th>
              <th className="px-2 py-2">Email</th>
              <th className="px-2 py-2">Telephone</th>
              <th className="px-2 py-2">Address</th>
              <th className="px-2 py-2">Category</th>
              <th className="px-2 py-2">Image</th>
              <th className="px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((form, index) => (
              <tr key={form._id} className="bg-white border-b hover:bg-gray-100">
                <td className="px-2 py-2 text-center">{index + 1 + indexOfFirstItem}</td>
                <td className="px-2 py-2">{form.name}</td>
                <td className="px-2 py-2">{form.email}</td>
                <td className="px-2 py-2">{form.telephone}</td>
                <td className="px-2 py-2">{form.address}</td>
                <td className="px-2 py-2">{form.category}</td>
                <td className="px-2 py-2">
                                        <img
                                            src={form.image}
                                            alt={form.name}
                                            className="w-20 h-20 object-cover"
                                        />
                                    </td>
                <td className="px-2 py-2">
                  <Link to={`/updateLoyalty/${form._id}`}>
                    <button className="bg-blue-500 text-white font-bold py-1 px-2 rounded mr-2 hover:bg-blue-700">
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(form._id)}
                    className="bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <ul className="flex">
            {Array.from({ length: Math.ceil(filteredForms.length / itemsPerPage) }).map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 mx-1 rounded ${
                    currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
                  } cursor-pointer`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default AllLoyaltyForms;
