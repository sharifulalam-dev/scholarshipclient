import React, { useContext, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Authentication } from "../AuthProvider/AuthProvider";

const Login = () => {
  const { googleLogin, facebookLogin, login } = useContext(Authentication);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginRole, setLoginRole] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setError("");
  };
  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setLoginRole(selectedRole);
    // Auto-fill dummy credentials based on the selected role
    if (selectedRole === "admin") {
      setFormData({ email: "admin@phteam.com", password: "Aa123456!" });
    } else if (selectedRole === "moderator") {
      setFormData({ email: "moderator@phteam.com", password: "Aa123456!" });
    } else {
      setFormData({ email: "", password: "" });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate(from, { replace: true });
    } catch (err) {
      setError("Google login failed. Please try again.");
      console.error("Google login error:", err);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await facebookLogin();
      navigate(from, { replace: true });
    } catch (err) {
      setError("Facebook login failed. Please try again.");
      console.error("Facebook login error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError("Login failed. Check your credentials and try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl flex flex-col md:flex-row">
        {/* Left side: Login Form */}
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Welcome Back!
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Log in to continue to your account
          </p>

          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full py-3 bg-gray-100 text-gray-800 rounded-md shadow-md hover:bg-gray-200 transition mb-4"
          >
            <FcGoogle className="text-2xl mr-2" />
            Login with Google
          </button>

          <button
            onClick={handleFacebookLogin}
            className="flex items-center justify-center w-full py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition mb-4"
          >
            <FaFacebook className="text-2xl mr-2" />
            Login with Facebook
          </button>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500">OR</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-600 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-600 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline hover:text-blue-800"
            >
              Register here
            </Link>
          </p>

          <p className="text-center text-gray-600 mt-4">
            <Link
              to="/forget-password"
              className="text-blue-600 hover:underline hover:text-blue-800"
            >
              Forgot Password?
            </Link>
          </p>
        </div>

        {/* Right side: Login As Dropdown */}
        <div className="w-full md:w-1/2 p-4 border-t md:border-t-0 md:border-l">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Login As</h2>
          <select
            value={loginRole}
            onChange={handleRoleChange}
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
          </select>
          <p className="mt-4 text-gray-600">
            Dummy credentials will auto-fill based on selection.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
