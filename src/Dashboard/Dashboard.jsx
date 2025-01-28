import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "./../Hooks/useAuth";
import Admin from "./Admin";
import ModeratorMenu from "./ModeratorMenu";
import UserMenu from "./UserMenu";
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

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row roundded-lg">
      <div className="mt-20  flex lg:flex-row flex-col min-h-screen  w-full ">
        <aside className="bg-blue-600  text-white p-2 min-w-[200px] lg:w-1/5">
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
