import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "./../Hooks/useAuth";
import Logo from "/Logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.email) {
        try {
          const response = await axios.get(
            `https://scholarshipserver.vercel.app/users/${user.email}`
          );
          setRole(response.data.role); // Assuming the response contains a `role` field
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
    <div className="relative max-w-[95%] mx-auto ">
      <header className="bg-white -mt-2 text-black py-4 px-6 flex justify-between items-center fixed w-full max-w-[95%] left-0 right-0 mx-auto z-50">
        <Link to="/">
          <div className="flex items-center text-2xl font-bold">
            <img
              src={Logo}
              alt="Logo"
              className="h-[50px] w-[50px] rounded-full mr-2"
            />
            Scholarship
          </div>
        </Link>

        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row md:items-center gap-6 text-lg absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent p-6 md:p-0 z-10`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-orange-300" : "hover:text-[#E05307]"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/allscholarship"
            className={({ isActive }) =>
              isActive ? "text-orange-400" : "hover:text-[#E05307]"
            }
          >
            All Scholarships
          </NavLink>
          {user ? (
            role === "admin" ? (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "text-orange-300" : "hover:text-[#E05307]"
                }
              >
                Admin Dashboard
              </NavLink>
            ) : (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "text-orange-300" : "hover:text-[#E05307]"
                }
              >
                User Dashboard
              </NavLink>
            )
          ) : null}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <button
              onClick={handleLogOut}
              className="bg-orange-400 text-white px-4 py-2 rounded-[20px] hover:bg-orange-500"
            >
              Log Out
            </button>
          ) : (
            <button className="bg-orange-400 text-white px-4 py-2 rounded-[20px] hover:bg-orange-500">
              <Link to="/login">Login</Link>
            </button>
          )}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars />
          </button>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
