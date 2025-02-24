import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import useAuth from "./../Hooks/useAuth";
import Admin from "./Admin";
import ModeratorMenu from "./ModeratorMenu";
import UserMenu from "./UserMenu";
import Logo from "/Logo.png";
const Dashboard = () => {
  const { user } = useAuth();
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

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
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <ClipLoader size={50} color="#2A3B69" />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row rounded-lg">
      <div className="flex lg:flex-row flex-col min-h-screen w-full">
        <aside className=" text-black p-2 min-w-[200px] lg:w-1/5">
          {/* Logo linked to Home */}
          <div className="flex justify-center items-center mb-4">
            <Link to="/">
              <img src={Logo} alt="Website Logo" className="w-32" />
            </Link>
          </div>
          <h2 className="text-2xl font-bold my-4 flex items-center justify-center underline">
            Dashboard
          </h2>
          {role === "user" && <UserMenu />}
          {role === "moderator" && <ModeratorMenu />}
          {role === "admin" && <Admin />}
        </aside>

        <main className="flex-1 bg-gray-100 p-6 max-w-4/5">
          <div className="mt-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
