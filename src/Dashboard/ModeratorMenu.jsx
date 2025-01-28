import React from "react";
import {
  AiOutlineFile,
  AiOutlinePlusCircle,
  AiOutlineStar,
  AiOutlineUser,
} from "react-icons/ai";
export default function ModeratorMenu() {
  return (
    <>
      <nav>
        <ul className="space-y-2">
          <li>
            <a
              href="/dashboard/profile"
              className="flex items-center px-4 py-2 hover:bg-blue-500 rounded"
            >
              <AiOutlineUser className="mr-2 text-xl" />
              <span>My Profile</span>
            </a>
          </li>
          <li>
            <a
              href="/dashboard/managescholarships"
              className="flex items-center px-4 py-2 hover:bg-blue-500 rounded"
            >
              <AiOutlineFile className="mr-2 text-xl" />
              <span>Manage Scholarships</span>
            </a>
          </li>
          <li>
            <a
              href="/dashboard/allreviews"
              className="flex items-center px-4 py-2 hover:bg-blue-500 rounded"
            >
              <AiOutlineStar className="mr-2 text-xl" />
              <span>All Reviews</span>
            </a>
          </li>
          <li>
            <a
              href="/dashboard/allappliedscholarships"
              className="flex items-center px-4 py-2 hover:bg-blue-500 rounded"
            >
              <AiOutlineFile className="mr-2 text-xl" />
              <span>All Applied Scholarships</span>
            </a>
          </li>
          <li>
            <a
              href="/dashboard/addscholarship"
              className="flex items-center px-4 py-2 hover:bg-blue-500 rounded"
            >
              <AiOutlinePlusCircle className="mr-2 text-xl" />
              <span>Add Scholarship</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
