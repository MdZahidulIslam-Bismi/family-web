import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Parents = () => {
  const [parents, setParents] = useState([]);
  const navigate = useNavigate();

  // Fetch all parents from backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/family")
      .then((res) => setParents(res.data))
      .catch((err) => console.error("Error fetching parents:", err));
  }, []);

  // Delete parent by ID
  const handleDelete = async (id) => {
  
  await axios.delete(`http://localhost:8080/api/family/${id}`);
  fetchParents();
};

  // Edit parent (redirect to edit page)
  const handleEdit = (id) => {
    navigate(`/edit-parent/${id}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Parents List</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">City</th>
            <th className="border p-2">Street</th>
            <th className="border p-2">Zip code</th>
            <th className="border p-2">State</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {parents.map((parent) => (
            <tr key={parent.id}>
              <td className="border p-2">{parent.id}</td>
              <td className="border p-2">{parent.name}</td>
              <td className="border p-2">{parent.city}</td>
              <td className="border p-2">{parent.street}</td>
              <td className="border p-2">{parent.zip}</td>
              <td className="border p-2">{parent.state}</td>
              <td className="border p-2 flex gap-2 justify-center">
                <button
                  onClick={() => handleEdit(parent.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(parent.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
              export  </button>
              </td>
            </tr>
          ))}
          {parents.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center p-3">
                No parents found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Parents;
