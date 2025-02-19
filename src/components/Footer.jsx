import React from "react";
import {
  FaBook,
  FaFacebook,
  FaHome,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2A3B69] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-6 lg:space-y-0">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold">Scholarship Management</h2>
            <p className="text-sm mt-2">
              Find and apply for scholarships around the world.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row justify-center lg:justify-end items-center space-y-4 lg:space-y-0 lg:space-x-8">
            <a
              href="/"
              className="flex items-center gap-2 text-sm hover:text-gray-400"
            >
              <FaHome className="text-lg" /> Home
            </a>
            <a
              href="/allscholarship"
              className="flex items-center gap-2 text-sm hover:text-gray-400"
            >
              <FaBook className="text-lg" /> All Scholarships
            </a>
          </div>
        </div>

        <div className="my-6 border-t border-blue-700"></div>

        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
          <div className="flex justify-center lg:justify-start space-x-6">
            <a
              href="#"
              className="text-white hover:text-gray-400"
              aria-label="Facebook"
            >
              <FaFacebook className="text-2xl" />
            </a>
            <a
              href="#"
              className="text-white hover:text-gray-400"
              aria-label="Twitter"
            >
              <FaTwitter className="text-2xl" />
            </a>
            <a
              href="#"
              className="text-white hover:text-gray-400"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-2xl" />
            </a>
          </div>

          <p className="text-sm text-center lg:text-right">
            © 2025 Scholarship Management. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
