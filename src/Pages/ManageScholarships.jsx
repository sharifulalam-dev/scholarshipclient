import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { FaEdit, FaInfoCircle, FaTrash } from "react-icons/fa";
import Spinner from "react-spinner"; // Ensure this import matches your installed library
import Swal from "sweetalert2";

const fetchScholarships = async () => {
  const response = await axios.get(
    `https://scholarshipserver.vercel.app/allscholarship`
  );
  return response.data;
};

const ManageScholarships = () => {
  const [modalType, setModalType] = useState(null);
  const [selectedScholarship, setSelectedScholarship] = useState(null);

  const {
    data: scholarships = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["scholarships"],
    queryFn: fetchScholarships,
    onError: () => {
      Swal.fire("Error", "Failed to load scholarships.", "error");
    },
  });

  const openModal = (type, scholarship) => {
    setModalType(type);
    setSelectedScholarship(scholarship);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedScholarship(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://scholarshipserver.vercel.app/allscholarship/${selectedScholarship._id}`
      );
      Swal.fire("Deleted!", "Scholarship has been deleted.", "success");
      refetch();
      closeModal();
    } catch (error) {
      Swal.fire("Error", "Failed to delete scholarship.", "error");
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    const updatedScholarship = {
      scholarshipName: event.target.scholarshipName.value,
      universityName: event.target.universityName.value,
      subjectCategory: event.target.subjectCategory.value,
      degree: event.target.degree.value,
      applicationFees: parseFloat(event.target.applicationFees.value),
    };

    try {
      await axios.patch(
        `https://scholarshipserver.vercel.app/allscholarship/${selectedScholarship._id}`,
        updatedScholarship
      );
      Swal.fire("Success!", "Scholarship has been updated.", "success");
      refetch();
      closeModal();
    } catch (error) {
      Swal.fire("Error", "Failed to update scholarship.", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <Spinner size={50} color="#00BFFF" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600 text-lg">Failed to load scholarships.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Manage Scholarships
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Scholarship Name</th>
              <th className="py-3 px-4 text-left">University Name</th>
              <th className="py-3 px-4 text-left">Subject Category</th>
              <th className="py-3 px-4 text-left">Degree</th>
              <th className="py-3 px-4 text-left">Application Fees</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((scholarship) => (
              <tr key={scholarship._id} className="border-t">
                <td className="py-3 px-4">{scholarship.scholarshipName}</td>
                <td className="py-3 px-4">{scholarship.universityName}</td>
                <td className="py-3 px-4">{scholarship.subjectCategory}</td>
                <td className="py-3 px-4">{scholarship.degree}</td>
                <td className="py-3 px-4">${scholarship.applicationFees}</td>
                <td className="py-3 px-4 flex justify-center space-x-2">
                  <button
                    onClick={() => openModal("details", scholarship)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 flex items-center space-x-1"
                  >
                    <FaInfoCircle /> <span>Details</span>
                  </button>
                  <button
                    onClick={() => openModal("edit", scholarship)}
                    className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 flex items-center space-x-1"
                  >
                    <FaEdit /> <span>Edit</span>
                  </button>
                  <button
                    onClick={() => openModal("delete", scholarship)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 flex items-center space-x-1"
                  >
                    <FaTrash /> <span>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {scholarships.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No scholarships available.
        </p>
      )}

      {modalType === "details" && selectedScholarship && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Scholarship Details</h2>
            <p>
              <strong>Name:</strong> {selectedScholarship.scholarshipName}
            </p>
            <p>
              <strong>University:</strong> {selectedScholarship.universityName}
            </p>
            <p>
              <strong>Subject Category:</strong>{" "}
              {selectedScholarship.subjectCategory}
            </p>
            <p>
              <strong>Degree:</strong> {selectedScholarship.degree}
            </p>
            <p>
              <strong>Application Fees:</strong> $
              {selectedScholarship.applicationFees}
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {modalType === "edit" && selectedScholarship && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Scholarship</h2>
            <form onSubmit={handleEdit}>
              <div className="mb-4">
                <label className="block font-medium mb-1">
                  Scholarship Name
                </label>
                <input
                  type="text"
                  name="scholarshipName"
                  defaultValue={selectedScholarship.scholarshipName}
                  className="w-full border rounded px-3 py-2 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">
                  University Name
                </label>
                <input
                  type="text"
                  name="universityName"
                  defaultValue={selectedScholarship.universityName}
                  className="w-full border rounded px-3 py-2 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">
                  Subject Category
                </label>
                <input
                  type="text"
                  name="subjectCategory"
                  defaultValue={selectedScholarship.subjectCategory}
                  className="w-full border rounded px-3 py-2 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Degree</label>
                <input
                  type="text"
                  name="degree"
                  defaultValue={selectedScholarship.degree}
                  className="w-full border rounded px-3 py-2 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">
                  Application Fees
                </label>
                <input
                  type="number"
                  name="applicationFees"
                  defaultValue={selectedScholarship.applicationFees}
                  className="w-full border rounded px-3 py-2 focus:outline-none"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalType === "delete" && selectedScholarship && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Delete Scholarship</h2>
            <p>Are you sure you want to delete this scholarship?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageScholarships;
