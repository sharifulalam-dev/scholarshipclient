import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import coverImg from "../assets/cover.avif";
import { Authentication } from "../AuthProvider/AuthProvider";
const Profile = () => {
  const { user, loading } = useContext(Authentication);
  const [role, setRole] = useState("");
  useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.email || "user1@test.com") {
        try {
          const response = await axios.get(
            `https://scholarshipserver.vercel.app/users/${
              user.email || "user1@test.com"
            }`
          );

          setRole(response.data.role);
        } catch (error) {
          console.error("Error fetching role:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-xl rounded-lg max-w-3xl w-full overflow-hidden">
        <div className="relative">
          <img
            alt="cover"
            src={coverImg}
            className="w-full h-48 object-cover"
          />

          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <img
              alt="profile"
              src={user.photoURL}
              className="rounded-full border-4 border-white shadow-lg h-24 w-24 object-cover"
            />
          </div>
        </div>

        <div className="pt-16 pb-8 px-6 sm:px-10">
          {role !== "user" && (
            <div className="flex justify-center">
              <span className="inline-block bg-lime-600 text-white text-xs font-semibold rounded-full px-4 py-1 shadow-md">
                {role.toUpperCase()}
              </span>
            </div>
          )}

          <div className="mt-4 text-center">
            <p className="text-gray-500 text-sm">User ID: {user.uid}</p>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">
              {user.displayName}
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mt-1">
              {user.email}
            </p>
          </div>

          <hr className="my-6 border-gray-200" />

          <div className="text-center text-gray-600 space-y-1">
            <p>This is your personal dashboard where you can view details.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
