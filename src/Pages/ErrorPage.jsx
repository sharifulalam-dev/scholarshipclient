import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-orange-400 text-white text-center px-4">
      <h1 className="text-9xl font-extrabold">404</h1>
      <p className="text-xl mt-4">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button
        className="mt-6 px-6 py-3 text-blue-500 bg-white font-medium text-lg rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition transform"
        onClick={() => navigate("/")}
      >
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorPage;
