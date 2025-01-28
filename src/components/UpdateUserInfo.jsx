import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Authentication } from "../AuthProvider/AuthProvider";
const UpdateUserInfo = () => {
  const { user, updateUserProfile } = useContext(Authentication);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    photoURL: user?.photoURL || "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    try {
      await updateUserProfile({
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      });
      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Update Profile
        </h1>
        {message && (
          <p
            className={`text-center mb-4 ${
              message.includes("successfully")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="displayName"
              className="block text-gray-600 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="displayName"
              value={formData.displayName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="photoURL"
              className="block text-gray-600 font-medium mb-2"
            >
              Photo URL
            </label>
            <input
              type="text"
              id="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Save
          </button>
          <button className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition">
            <Link to="/">Cancel</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserInfo;
