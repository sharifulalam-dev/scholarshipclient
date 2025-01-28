import React from "react";
import { AiFillStar, AiOutlineFile, AiOutlineUser } from "react-icons/ai";
import { NavLink } from "react-router-dom";

export default function UserMenu() {
  return (
    <nav>
      <ul className="space-y-2">
        <li>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded ${
                isActive
                  ? "bg-white text-blue-600 font-bold"
                  : "hover:bg-blue-500 text-white"
              }`
            }
          >
            <AiOutlineUser className="mr-2 text-xl" />
            <span>My Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/myapplications"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded ${
                isActive
                  ? "bg-white text-blue-600 font-bold"
                  : "hover:bg-blue-500 text-white"
              }`
            }
          >
            <AiOutlineFile className="mr-2 text-xl" />
            <span>My Applications</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/myreviews"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded ${
                isActive
                  ? "bg-white text-blue-600 font-bold"
                  : "hover:bg-blue-500 text-white"
              }`
            }
          >
            <AiFillStar className="mr-2 text-xl" />
            <span>My Reviews</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
