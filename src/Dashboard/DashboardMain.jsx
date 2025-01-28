import axios from "axios";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  AiOutlineCheckCircle,
  AiOutlineFileText,
  AiOutlineHourglass,
} from "react-icons/ai";
import { Authentication } from "../AuthProvider/AuthProvider";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DashboardMain = () => {
  const { user, loading } = useContext(Authentication);
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [scholarshipData, setScholarshipData] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    rejected: 0,
  });

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
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  useEffect(() => {
    const fetchScholarshipData = async () => {
      if (role === "admin") {
        try {
          const response = await axios.get(
            `https://scholarshipserver.vercel.app/allscholarship`
          );
          setScholarshipData(response.data);

          const stats = {
            total: response.data.length,
            pending: response.data.filter((app) => app.status === "pending")
              .length,
            completed: response.data.filter((app) => app.status === "completed")
              .length,
            rejected: response.data.filter((app) => app.status === "rejected")
              .length,
          };
          setStats(stats);
        } catch (error) {
          console.error("Error fetching scholarship data:", error);
        }
      }
    };

    if (role === "admin") fetchScholarshipData();
  }, [role]);

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (role !== "admin") {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center">
          Dashboard Area for {role.charAt(0).toUpperCase() + role.slice(1)}
        </h1>
        <p className="text-center mt-4 text-lg">
          This is your personal dashboard. You can view your scholarships or
          applications here.
        </p>
      </div>
    );
  }

  const chartData = {
    labels: ["Total", "Pending", "Completed", "Rejected"],
    datasets: [
      {
        label: "Scholarship Status",
        data: [stats.total, stats.pending, stats.completed, stats.rejected],
        backgroundColor: ["#4A90E2", "#F5A623", "#7ED321", "#D0021B"],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
          <AiOutlineFileText className="text-3xl text-blue-500" />
          <div>
            <h3 className="text-xl font-semibold">Total Applications</h3>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
          <AiOutlineHourglass className="text-3xl text-yellow-500" />
          <div>
            <h3 className="text-xl font-semibold">Pending Applications</h3>
            <p className="text-2xl font-bold">{stats.pending}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
          <AiOutlineCheckCircle className="text-3xl text-green-500" />
          <div>
            <h3 className="text-xl font-semibold">Completed Applications</h3>
            <p className="text-2xl font-bold">{stats.completed}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
          <AiOutlineFileText className="text-3xl text-red-500" />
          <div>
            <h3 className="text-xl font-semibold">Rejected Applications</h3>
            <p className="text-2xl font-bold">{stats.rejected}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Scholarship Overview</h2>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default DashboardMain;
