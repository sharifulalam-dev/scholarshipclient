import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaGraduationCap,
  FaMoneyBillWave,
  FaUniversity,
  FaUsers,
} from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useAuth from "./../Hooks/useAuth";

const DashboardMain = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState({});
  const { user } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [scholarshipsRes, applicationsRes, usersRes, paymentsRes] =
          await Promise.all([
            axios.get("https://scholarshipserver.vercel.app/allscholarship"),
            axios.get(
              "https://scholarshipserver.vercel.app/allappliedscholarships"
            ),
            axios.get("https://scholarshipserver.vercel.app/users"),
            axios.get("https://scholarshipserver.vercel.app/allscholarship"),
          ]);

        const scholarshipData = Array.isArray(scholarshipsRes.data)
          ? scholarshipsRes.data
          : [];

        const applicationData = Array.isArray(applicationsRes.data)
          ? applicationsRes.data
          : [];

        const userData = Array.isArray(usersRes.data) ? usersRes.data : [];

        const finduser = userData.find((item) => item.email === user.email);
        setRole(finduser);

        const processData = {
          categories: scholarshipData.reduce((acc, curr) => {
            acc[curr.subjectCategory] = (acc[curr.subjectCategory] || 0) + 1;
            return acc;
          }, {}),

          applications: applicationData.reduce((acc, curr) => {
            const month = new Date(curr.currentDate).toLocaleString("default", {
              month: "short",
            });
            acc[month] = (acc[month] || 0) + 1;
            return acc;
          }, {}),

          revenue: scholarshipData.reduce((acc, curr) => {
            const month = new Date(curr.postDate).toLocaleString("default", {
              month: "short",
            });
            acc[month] = (acc[month] || 0) + (curr.applicationFees || 0);
            return acc;
          }, {}),

          roles: userData.reduce((acc, curr) => {
            acc[curr.role] = (acc[curr.role] || 0) + 1;
            return acc;
          }, {}),

          universities: scholarshipData.reduce((acc, curr) => {
            acc[curr.universityName] = (acc[curr.universityName] || 0) + 1;
            return acc;
          }, {}),
        };

        setStats(processData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboardMain data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <ClipLoader size={50} color="#2A3B69" />
      </div>
    );
  }

  if (!stats) return <div>No data available</div>;

  const transformData = (obj) =>
    Object.entries(obj).map(([name, value]) => ({ name, value }));

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Dashboard
      </h1>

      {role.role === "admin" ? (
        <>
          <div
            className="bg-[#2A3B69] text-white p-6 rounded-lg shadow-md mb-8"
            style={{ textAlign: "center" }}
          >
            <h1 className="text-4xl font-bold mb-4">Welcome, Admin</h1>
            <p className="text-xl">
              You have access to the full dashboard of all scholarships and
              applications. Manage users, track applications, and view the
              statistics.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
              <FaGraduationCap className="text-3xl text-blue-600 mr-4" />
              <div>
                <p className="text-gray-500">Total Scholarships</p>
                <p className="text-2xl font-bold">
                  {Object.values(stats.categories).reduce((a, b) => a + b, 0)}
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
              <FaUsers className="text-3xl text-green-600 mr-4" />
              <div>
                <p className="text-gray-500">Total Applications</p>
                <p className="text-2xl font-bold">
                  {Object.values(stats.applications).reduce((a, b) => a + b, 0)}
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
              <FaMoneyBillWave className="text-3xl text-purple-600 mr-4" />
              <div>
                <p className="text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold">
                  $
                  {Object.values(stats.revenue)
                    .reduce((a, b) => a + b, 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
              <FaUniversity className="text-3xl text-orange-600 mr-4" />
              <div>
                <p className="text-gray-500">Universities</p>
                <p className="text-2xl font-bold">
                  {Object.keys(stats.universities).length}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">
                Scholarship Distribution by Category
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={transformData(stats.categories)}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {transformData(stats.categories).map((entry, index) => (
                      <Cell
                        key={index}
                        fill={`#${Math.floor(Math.random() * 16777215).toString(
                          16
                        )}`}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">
                Applications Timeline
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={transformData(stats.applications)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={transformData(stats.revenue)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#10B981"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">
                User Roles Distribution
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={transformData(stats.roles)}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    label
                  >
                    {transformData(stats.roles).map((entry, index) => (
                      <Cell
                        key={index}
                        fill={["#3B82F6", "#10B981", "#F59E0B"][index]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      ) : (
        <div
          className="bg-[#34B78F] text-white p-6 rounded-lg shadow-md mb-8"
          style={{ textAlign: "center" }}
        >
          <h1 className="text-4xl font-bold mb-4">
            Welcome, {role === "user" ? "Student" : "Member"}
          </h1>
          <p className="text-xl">
            Explore the available scholarships, track your applications, and
            discover opportunities to advance your education.
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardMain;
