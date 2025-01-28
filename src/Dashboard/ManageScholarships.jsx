import React, { useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import Swal from "sweetalert2";

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([
    {
      id: 1,
      name: "Fullbright Scholarship",
      universityName: "Harvard University",
      subjectCategory: "Engineering",
      degree: "Masters",
      applicationFees: "$100",
    },
    {
      id: 2,
      name: "Rhodes Scholarship",
      universityName: "Oxford University",
      subjectCategory: "Arts",
      degree: "PhD",
      applicationFees: "$120",
    },
    {
      id: 3,
      name: "Stanford Scholars Program",
      universityName: "Stanford University",
      subjectCategory: "Medicine",
      degree: "Bachelors",
      applicationFees: "$150",
    },
  ]);

  const [editScholarship, setEditScholarship] = useState(null);

  const handleDetails = (id) => {
    const scholarship = scholarships.find((sch) => sch.id === id);
    Swal.fire(
      `Details for ${scholarship.name}`,
      `University: ${scholarship.universityName}\nSubject: ${scholarship.subjectCategory}\nDegree: ${scholarship.degree}\nApplication Fees: ${scholarship.applicationFees}`,
      "info"
    );
  };

  const handleEdit = (id) => {
    const scholarship = scholarships.find((sch) => sch.id === id);
    setEditScholarship(scholarship);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setScholarships((prev) => prev.filter((sch) => sch.id !== id));
        Swal.fire("Deleted!", "The scholarship has been deleted.", "success");
      }
    });
  };

  const handleUpdate = () => {
    setScholarships((prev) =>
      prev.map((sch) => (sch.id === editScholarship.id ? editScholarship : sch))
    );
    setEditScholarship(null);
    Swal.fire(
      "Updated!",
      "The scholarship has been updated successfully.",
      "success"
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Moderator Dashboard</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-2 px-4">Scholarship Name</th>
              <th className="py-2 px-4">University Name</th>
              <th className="py-2 px-4">Subject Category</th>
              <th className="py-2 px-4">Degree</th>
              <th className="py-2 px-4">Application Fees</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((sch) => (
              <tr
                key={sch.id}
                className="border-b hover:bg-gray-100 text-center"
              >
                <td className="py-2 px-4">{sch.name}</td>
                <td className="py-2 px-4">{sch.universityName}</td>
                <td className="py-2 px-4">{sch.subjectCategory}</td>
                <td className="py-2 px-4">{sch.degree}</td>
                <td className="py-2 px-4">{sch.applicationFees}</td>
                <td className="py-2 px-4 flex justify-center space-x-2">
                  <button
                    onClick={() => handleDetails(sch.id)}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                  >
                    <AiOutlineInfoCircle className="text-xl" />
                  </button>
                  <button
                    onClick={() => handleEdit(sch.id)}
                    className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-700"
                  >
                    <AiOutlineEdit className="text-xl" />
                  </button>
                  <button
                    onClick={() => handleDelete(sch.id)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
                  >
                    <AiOutlineDelete className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editScholarship && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Scholarship</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">
                  Scholarship Name
                </label>
                <input
                  type="text"
                  value={editScholarship.name}
                  onChange={(e) =>
                    setEditScholarship({
                      ...editScholarship,
                      name: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">
                  University Name
                </label>
                <input
                  type="text"
                  value={editScholarship.universityName}
                  onChange={(e) =>
                    setEditScholarship({
                      ...editScholarship,
                      universityName: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">
                  Subject Category
                </label>
                <input
                  type="text"
                  value={editScholarship.subjectCategory}
                  onChange={(e) =>
                    setEditScholarship({
                      ...editScholarship,
                      subjectCategory: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Degree</label>
                <input
                  type="text"
                  value={editScholarship.degree}
                  onChange={(e) =>
                    setEditScholarship({
                      ...editScholarship,
                      degree: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">
                  Application Fees
                </label>
                <input
                  type="text"
                  value={editScholarship.applicationFees}
                  onChange={(e) =>
                    setEditScholarship({
                      ...editScholarship,
                      applicationFees: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setEditScholarship(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageScholarships;
