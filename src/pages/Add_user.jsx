import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const MODE_PARENT = "parent";
const MODE_CHILD = "child";

const Add_user = () => {
  const [activeMode, setActiveMode] = useState(MODE_PARENT);
  const [parents, setParents] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // get parent ID if editing
  const isEditMode = Boolean(id);

  // --- Parent State ---
  const [parentData, setParentData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  //-------- Fetch for Children data selection----------------//
useEffect(() => {
  axios.get("http://localhost:8080/api/family")   // <-- your backend endpoint
    .then((res) => {
      console.log("Loaded Parents:", res.data);
  setParents(Array.isArray(res.data) ? res.data : res.data.content || res.data.data || []);
    })
    .catch((err) => {
      console.error("Error fetching parents:", err);
    });
}, []);

  // --- Fetch parent for edit ---
  useEffect(() => {
    if (isEditMode) {
      axios
        .get(`http://localhost:8080/api/family/${id}`)
        .then((res) => {
          const data = res.data;
          const [firstName, ...rest] = data.name?.split(" ") || ["", ""];
          const lastName = rest.join(" ");
          setParentData({
            firstName,
            lastName,
            street: data.street || "",
            city: data.city || "",
            state: data.state || "",
            zip: data.zip || "",
          });
        })
        .catch((err) => console.error("Error fetching parent data:", err));
    }
  }, [id, isEditMode]);

  // --- Child State ---
  const [childData, setChildData] = useState({
    firstName: "",
    lastName: "",
    parentId: "",
  });



  // --- Handle Input Changes ---
  const handleParentChange = (e) => {
    setParentData({ ...parentData, [e.target.name]: e.target.value });
  };

  const handleChildChange = (e) => {
    setChildData({ ...childData, [e.target.name]: e.target.value });
  };

  // --- Parent Submit ---
  const handleParentSubmit = async (event) => {
    event.preventDefault();

    const fullName = `${parentData.firstName} ${parentData.lastName}`.trim();
    const parentToSend = {
      name: fullName,
      street: parentData.street,
      city: parentData.city,
      state: parentData.state,
      zip: parentData.zip,
    };

    try {
      let response;
      if (isEditMode) {
        // Update existing record
        response = await axios.put(
          `http://localhost:8080/api/family/${id}`,
          parentToSend
        );
        toast.success(`Parent "${fullName}" updated successfully!`);
      } else {
        // Create new record
        response = await axios.post(
          "http://localhost:8080/api/family",
          parentToSend
        );
        toast.success(`Parent "${fullName}" added successfully!`);
      }

      console.log("Response:", response.data);

      // Reset form (optional for add mode)
      if (!isEditMode) {
        setParentData({
          firstName: "",
          lastName: "",
          street: "",
          city: "",
          state: "",
          zip: "",
        });
      }

      //  After update, go back or stay
      // navigate("/"); // Uncomment if you want to go back to home

    } catch (error) {
      console.error("Error submitting parent:", error);
      toast.error("Failed to submit data. Please try again.");
    }
  };

  // --- Child Submit ---
  const handleChildSubmit = async (event) => {
  event.preventDefault();

  if (!childData.parentId) {
    return toast.error("Please select a parent first.");
  }

  try {
    const response = await axios.post(
      "http://localhost:8080/api/children",
      {
        firstName: childData.firstName,
        lastName: childData.lastName,
        family: { id: childData.parentId } // send the parent id as object
      }
    );

    console.log("Child saved:", response.data);
    toast.success(`Child ${childData.firstName} added successfully!`);
    setChildData({ firstName: "", lastName: "", parentId: "" });
  } catch (error) {
    console.error("Error saving child:", error);
    toast.error("Failed to add child. Please try again.");
  }
};


  // --- Parent Form ---
  const renderParentForm = () => (
    <form className="space-y-4" onSubmit={handleParentSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={parentData.firstName}
            onChange={handleParentChange}
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Parent First Name"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={parentData.lastName}
            onChange={handleParentChange}
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Parent Last Name"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm mb-1">Street</label>
        <input
          type="text"
          name="street"
          value={parentData.street}
          onChange={handleParentChange}
          required
          className="w-full border rounded px-3 py-2"
          placeholder="123 Main St"
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="block text-sm mb-1">City</label>
          <input
            type="text"
            name="city"
            value={parentData.city}
            onChange={handleParentChange}
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Anytown"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">State</label>
          <input
            type="text"
            name="state"
            value={parentData.state}
            onChange={handleParentChange}
            required
            className="w-full border rounded px-3 py-2"
            placeholder="NY"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">ZIP</label>
          <input
            type="text"
            name="zip"
            value={parentData.zip}
            onChange={handleParentChange}
            required
            className="w-full border rounded px-3 py-2"
            placeholder="10001"
          />
        </div>
      </div>

      <button
        type="submit"
        className={`w-full rounded px-6 py-2 text-white transition ${
          isEditMode
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isEditMode ? "Update Parent" : "Add Parent"}
      </button>
    </form>
  );

  // --- Child Form ---
  const renderChildForm = () => (
    <form className="space-y-4" onSubmit={handleChildSubmit}>
      <div>
        <label className="block text-sm mb-1">First Name</label>
        <input
          type="text"
          name="firstName"
          value={childData.firstName}
          onChange={handleChildChange}
          required
          className="w-full border rounded px-3 py-2"
          placeholder="Child First Name"
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={childData.lastName}
          onChange={handleChildChange}
          required
          className="w-full border rounded px-3 py-2"
          placeholder="Child Last Name"
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Select Parent</label>
        <select
          name="parentId"
          value={childData.parentId}
          onChange={handleChildChange}
          required
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select Parent</option>
  {parents.map((parent) => (
    <option key={parent.id} value={parent.id}>
      {parent.name}
    </option>
          ))}
        </select>

      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white rounded px-6 py-2 hover:bg-green-600 transition"
      >
        Add Child
      </button>
    </form>
  );

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">
        {isEditMode ? "Edit Parent" : "Family Data Entry"}
      </h1>

      <div className="flex justify-center mb-8 p-1 bg-gray-100 rounded-lg shadow-inner">
        <button
          type="button"
          onClick={() => setActiveMode(MODE_PARENT)}
          className={`flex-1 py-2 rounded-lg font-medium transition ${
            activeMode === MODE_PARENT
              ? "bg-blue-500 text-white shadow"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          Parent Form
        </button>
        <button
          type="button"
          onClick={() => setActiveMode(MODE_CHILD)}
          className={`flex-1 py-2 rounded-lg font-medium transition ${
            activeMode === MODE_CHILD
              ? "bg-green-500 text-white shadow"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          Child Form
        </button>
      </div>

      <div className="shadow-2xl rounded-xl p-6 bg-white border border-gray-100 min-h-[400px]">
        {activeMode === MODE_PARENT ? renderParentForm() : renderChildForm()}
      </div>
    </div>
  );
};

export default Add_user;
