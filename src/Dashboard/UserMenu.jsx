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
                  ? "bg-gray-200 text-black font-bold"
                  : "hover:bg-gray-100 text-gray-700"
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
                  ? "bg-gray-200 text-black font-bold"
                  : "hover:bg-gray-100 text-gray-700"
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
                  ? "bg-gray-200 text-black font-bold"
                  : "hover:bg-gray-100 text-gray-700"
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
