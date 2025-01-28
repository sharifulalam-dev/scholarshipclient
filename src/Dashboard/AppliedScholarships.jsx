import React, { useState } from "react";
import { FaEdit, FaInfoCircle, FaStar, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const AppliedScholarships = () => {
  const [scholarships, setScholarships] = useState([
    {
      id: 1,
      universityName: "University of Excellence",
      universityAddress: "123 Main St, New York, USA",
      feedback: "Excellent application",
      subjectCategory: "Engineering",
      appliedDegree: "Bachelor",
      applicationFees: 20,
      serviceCharge: 5,
      status: "Pending",
    },
    {
      id: 2,
      universityName: "Global Science Academy",
      universityAddress: "45 Science Rd, Berlin, Germany",
      feedback: "Needs additional documents",
      subjectCategory: "Sciences",
      appliedDegree: "Masters",
      applicationFees: 25,
      serviceCharge: 8,
      status: "Processing",
    },
    {
      id: 3,
      universityName: "Artistic Minds University",
      universityAddress: "78 Art Blvd, Paris, France",
      feedback: "Great portfolio submitted",
      subjectCategory: "Arts",
      appliedDegree: "Diploma",
      applicationFees: 18,
      serviceCharge: 4,
      status: "Completed",
    },
    {
      id: 4,
      universityName: "Tech Innovators University",
      universityAddress: "90 Tech Park, Tokyo, Japan",
      feedback: "Application rejected due to incomplete details",
      subjectCategory: "Technology",
      appliedDegree: "Bachelor",
      applicationFees: 22,
      serviceCharge: 6,
      status: "Rejected",
    },
  ]);

  const handleDetails = (id) => {
    Swal.fire("Details Button Clicked", `Scholarship ID: ${id}`, "info");
  };

  const handleEdit = (status) => {
    if (status === "Pending") {
      Swal.fire(
        "Edit Application",
        "You can edit this application.",
        "success"
      );
    } else {
      Swal.fire(
        "Cannot Edit",
        "You cannot edit this application as it is already processing.",
        "warning"
      );
    }
  };

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this application.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        setScholarships(
          scholarships.filter((scholarship) => scholarship.id !== id)
        );
        Swal.fire(
          "Cancelled!",
          "Your application has been cancelled.",
          "success"
        );
      }
    });
  };

  const handleAddReview = (id) => {
    Swal.fire({
      title: "Add Review",
      html: `
        <div>
          <label for="rating" class="block text-left font-medium">Rating Point</label>
          <input type="number" id="rating" class="swal2-input" min="1" max="5" placeholder="Enter rating (1-5)" />
          <label for="comment" class="block text-left font-medium mt-2">Review Comment</label>
          <textarea id="comment" class="swal2-textarea" placeholder="Enter your review"></textarea>
          <label for="date" class="block text-left font-medium mt-2">Review Date</label>
          <input type="date" id="date" class="swal2-input" />
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Submit",
      preConfirm: () => {
        const rating = document.getElementById("rating").value;
        const comment = document.getElementById("comment").value;
        const date = document.getElementById("date").value;

        if (!rating || !comment || !date) {
          Swal.showValidationMessage("Please fill out all fields.");
          return null;
        }

        return { rating, comment, date };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { rating, comment, date } = result.value;

        Swal.fire("Success!", "Your review has been submitted.", "success");
      }
    });
  };

  return (
    <div className="w-full mx-auto py-10 ">
      <h1 className="text-3xl font-bold text-center mb-6">
        My Applied Scholarships
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">University Name</th>
              <th className="py-3 px-4 text-left">University Address</th>
              <th className="py-3 px-4 text-left">Feedback</th>
              <th className="py-3 px-4 text-left">Subject Category</th>
              <th className="py-3 px-4 text-left">Applied Degree</th>
              <th className="py-3 px-4 text-left">Application Fees</th>
              <th className="py-3 px-4 text-left">Service Charge</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((scholarship) => (
              <tr key={scholarship.id} className="border-t">
                <td className="py-3 px-4">{scholarship.universityName}</td>
                <td className="py-3 px-4">{scholarship.universityAddress}</td>
                <td className="py-3 px-4">{scholarship.feedback}</td>
                <td className="py-3 px-4">{scholarship.subjectCategory}</td>
                <td className="py-3 px-4">{scholarship.appliedDegree}</td>
                <td className="py-3 px-4">${scholarship.applicationFees}</td>
                <td className="py-3 px-4">${scholarship.serviceCharge}</td>
                <td
                  className={`py-3 px-4 font-bold ${
                    scholarship.status === "Pending"
                      ? "text-yellow-500"
                      : scholarship.status === "Processing"
                      ? "text-blue-500"
                      : scholarship.status === "Completed"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {scholarship.status}
                </td>
                <td className="py-3 px-4 flex justify-center space-x-2">
                  <button
                    onClick={() => handleDetails(scholarship.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 flex items-center space-x-1"
                  >
                    <FaInfoCircle />
                  </button>
                  <button
                    onClick={() => handleEdit(scholarship.status)}
                    className={`px-3 py-1 rounded-md flex items-center space-x-1 ${
                      scholarship.status === "Pending"
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-gray-400 text-white cursor-not-allowed"
                    }`}
                    disabled={scholarship.status !== "Pending"}
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleCancel(scholarship.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 flex items-center space-x-1"
                  >
                    <FaTimes />
                  </button>
                  <button
                    onClick={() => handleAddReview(scholarship.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 flex items-center space-x-1"
                  >
                    <FaStar />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {scholarships.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No scholarships found.</p>
      )}
    </div>
  );
};

export default AppliedScholarships;
