import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `https://scholarshipserver.vercel.app/users`
        );
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        Swal.fire("Error", "Failed to load users", "error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.patch(
        `https://scholarshipserver.vercel.app/users/${userId}`,
        {
          role: newRole,
        }
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );

      setFilteredUsers((prevFilteredUsers) =>
        prevFilteredUsers.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );

      Swal.fire("Success", `User role updated to ${newRole}`, "success");
    } catch (error) {
      console.error("Error updating user role:", error);
      Swal.fire("Error", "Failed to update user role", "error");
    }
  };

  const handleDeleteUser = async (userId) => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the user permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (isConfirmed) {
      try {
        await axios.delete(
          `https://scholarshipserver.vercel.app/users/${userId}`
        );

        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
        setFilteredUsers((prevFilteredUsers) =>
          prevFilteredUsers.filter((user) => user._id !== userId)
        );

        Swal.fire("Deleted!", "User has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire("Error", "Failed to delete user", "error");
      }
    }
  };

  const handleFilterChange = (role) => {
    setFilterRole(role);

    if (role === "all") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter((user) => user.role === role));
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-bold">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-6">Manage Users</h1>
      <div className="flex justify-end mb-4">
        <select
          value={filterRole}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="all">All Roles</option>
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">User Name</th>
              <th className="py-3 px-4 text-left">User Email</th>
              <th className="py-3 px-4 text-left">User Role</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border px-2 py-1 rounded"
                  >
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
