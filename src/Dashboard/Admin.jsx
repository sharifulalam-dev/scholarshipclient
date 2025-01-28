import React from "react";
import {
  AiFillStar,
  AiOutlineFile,
  AiOutlinePlusCircle,
  AiOutlineUser,
} from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard/profile"
              className="flex items-center px-4 py-2 hover:bg-blue-500 rounded"
            >
              <AiOutlineUser className="mr-2 text-xl" />
              <span>My Profile</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/managescholarships"
              className="flex items-center px-4 py-2 hover:bg-blue-500 rounded"
            >
              <AiOutlineFile className="mr-2 text-xl" />
              <span>Manage Scholarships</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/manageusers"
              className="flex items-center px-4 py-2 hover:bg-blue-500 rounded"
            >
              <AiOutlineUser className="mr-2 text-xl" />
              <span>Manage Users</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/allreviews"
              className="flex items-center px-4 py-2 hover:bg-blue-500 rounded"
            >
              <AiFillStar className="mr-2 text-xl" />
              <span>All Reviews</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/allappliedscholarships"
              className="flex items-center px-4 py-2 hover:bg-blue-500 rounded"
            >
              <AiOutlineFile className="mr-2 text-xl" />
              <span>All Applied Scholarships</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/addscholarship"
              className="flex items-center px-4 py-2 hover:bg-blue-500 rounded"
            >
              <AiOutlinePlusCircle className="mr-2 text-xl" />
              <span>Add Scholarship</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
