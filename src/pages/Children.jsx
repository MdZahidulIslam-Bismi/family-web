import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Children = () => {
  const [children, setChildren] = useState([]);
  const navigate = useNavigate();
  const [parents, setParents] = useState([]); // Kept for demonstration, though maybe not needed after backend fix

  // Fetch children
  const fetchChildren = async () => {
    try {
      const res = await axios.get("/api/children");
      setChildren(res.data);
      console.log("Loaded Children (Check for nested family object!):", res.data);
    } catch (err) {
      console.error("Error fetching children:", err);
    }
  };

  // Fetch parents (Kept in case frontend lookup is preferred)
  const fetchParents = async () => {
    try {
      const res = await axios.get("/api/family");
      setParents(res.data);
      console.log("Loaded Parents:", res.data);
    } catch (err) {
      console.error("Error fetching parents:", err);
    }
  };

  useEffect(() => {
    fetchChildren();
    fetchParents(); 
  }, []);

  // Delete handler
  // const handleDelete = async (id) => {
  //   console.log("Deleting child with id:", id);
  //   try {
  //     // Note: Use relative path if proxy is configured for DELETE as well
  //     await axios.delete(`/api/children/${id}`); 
  //     toast.success("Child deleted successfully!");
  //     fetchChildren(); 
  //   } catch (error) {
  //     console.error("Delete failed:", error);
  //     toast.error("Failed to delete child!");
  //   }
  // };
  


  const deleteChild = async (id) => {
  try {
    // Call backend DELETE endpoint
    await axios.delete(`http://localhost:8080/api/children/${id}`);
    toast.success(`Child with id ${id} deleted successfully!`);

    // Refresh children list from backend
    fetchChildren();
  } catch (error) {
    console.error("Error deleting child:", error);
    toast.error("Failed to delete child!");
  }
};


//   const handleDelete = async (id) => {
//   try {
//     await axios.delete(`http://localhost:8080/api/children/${id}`);
//     toast.success(`Child with id ${id} deleted successfully!`);

//     // Remove the deleted child from local state so UI updates immediately
//     setChildren((prev) => prev.filter((child) => child.id !== id));
//   } catch (error) {
//     console.error("Error deleting child:", error);
//     toast.error("Failed to delete child. Please try again.");
//   }
// };


  // Edit child navigation
  const handleEdit = (id) => {
    navigate(`/edit-child/${id}`);
  };

  // const handleEdit = (id) => {
  //   navigate(`/edit-parent/${id}`);
  // };


  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Children List</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">First Name</th>
            <th className="border p-2">Last Name</th>
            <th className="border p-2">Parent</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {children.map((child) => {
            // After the backend fix, child.family should be available.
            // This is the direct, clean way to access the name:
            const parentName = child.family?.name || "No parent";

            return (
              <tr key={child.id}>
                <td className="border p-2">{child.id}</td>
                <td className="border p-2">{child.firstName}</td>
                <td className="border p-2">{child.lastName}</td>
                <td className="border p-2">
                  {child.parentsName || "No parent"}

                </td>
                <td className="border p-2 flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(child.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteChild(child.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}

          {children.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-3">
                No children found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Children; 