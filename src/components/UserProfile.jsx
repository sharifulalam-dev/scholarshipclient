import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Authentication } from "../AuthProvider/AuthProvider";
const UserProfile = ({ onEdit }) => {
  const { user } = useContext(Authentication);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-700 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-2xl w-full">
        <div className="flex items-center space-x-4">
          <img
            src={user?.photoURL || "https://placehold.co/150"}
            alt="User Profile"
            className="w-20 h-20 rounded-full shadow-md border-2 border-gray-200"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome, {user?.displayName || "User"}!
            </h1>
            <p className="text-gray-600">
              {user?.email || "No email available"}
            </p>
          </div>
        </div>
        <div className="mt-8">
          <div className="flex flex-col space-y-4">
            <div className="bg-gray-100 p-4 rounded-md shadow-sm">
              <h2 className="text-gray-500 font-medium">Username</h2>
              <p className="text-gray-800 text-lg font-semibold">
                {user?.displayName || "N/A"}
              </p>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={onEdit}
              className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
            >
              <Link to="/update-user-info">Update Info</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
