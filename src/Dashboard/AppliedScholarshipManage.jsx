import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaComment, FaEye, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const AppliedScholarshipManage = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        `https://scholarshipserver.vercel.app/allappliedscholarships`
      );

      setApplications(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching applications:", error);
      Swal.fire("Error", "Failed to load applications", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const openModal = (type, application) => {
    setModalType(type);
    setSelectedApplication(application);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedApplication(null);
    setFeedback("");
  };

  const handleFeedbackSubmit = async (id) => {
    try {
      const selectedApp = applications.find((app) => app._id === id);

      if (!selectedApp) {
        Swal.fire("Error", "Application not found.", "error");
        return;
      }

      const feedbackData = {
        appliedScholarshipId: selectedApp._id,
        scholarshipId: selectedApp.scholarshipId,
        feedback,
      };

      await axios.post(
        `https://scholarshipserver.vercel.app/add-feedback`,
        feedbackData
      );

      Swal.fire("Feedback Submitted", "Feedback has been saved.", "success");
      closeModal();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      Swal.fire("Error", "Failed to submit feedback.", "error");
    }
  };

  const handleCancelApplication = async (id) => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure?",
        text: "This action will cancel the application.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, cancel it!",
      });

      if (isConfirmed) {
        await axios.patch(
          `https://scholarshipserver.vercel.app/allappliedscholarships/${id}`,
          {
            status: "Rejected",
          }
        );

        setApplications((prev) =>
          prev.filter((application) => application._id !== id)
        );

        Swal.fire("Canceled!", "The application has been canceled.", "success");
      }
    } catch (error) {
      console.error("Error canceling application:", error);
      Swal.fire("Error", "Failed to cancel the application.", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-bold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        All Applied Scholarships
      </h1>
      <div className="overflow-x-auto">
        {applications.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg font-medium text-gray-600">
              No applied scholarships found.
            </p>
          </div>
        ) : (
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">University Name</th>
                <th className="py-3 px-4 text-left">Degree</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application._id} className="border-t">
                  <td className="py-3 px-4">{application.universityName}</td>
                  <td className="py-3 px-4">{application.degree}</td>
                  <td className="py-3 px-4">
                    {application.scholarshipCategory}
                  </td>
                  <td className="py-3 px-4 capitalize">{application.status}</td>
                  <td className="py-3 px-4 flex justify-center space-x-2">
                    <button
                      onClick={() => openModal("details", application)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 flex items-center space-x-1"
                    >
                      <FaEye /> <span>Details</span>
                    </button>
                    <button
                      onClick={() => openModal("feedback", application)}
                      className="bg-yellow-600 text-white px-3 py-1 rounded-md hover:bg-yellow-700 flex items-center space-x-1"
                    >
                      <FaComment /> <span>Feedback</span>
                    </button>
                    <button
                      onClick={() => handleCancelApplication(application._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 flex items-center space-x-1"
                    >
                      <FaTimes /> <span>Cancel</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalType === "details" && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Application Details</h2>
            <p>
              <strong>University Name:</strong>{" "}
              {selectedApplication.universityName}
            </p>
            <p>
              <strong>Degree:</strong> {selectedApplication.degree}
            </p>
            <p>
              <strong>Category:</strong>{" "}
              {selectedApplication.scholarshipCategory}
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

      {modalType === "feedback" && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Provide Feedback</h2>
            <textarea
              className="w-full border rounded px-3 py-2 focus:outline-none"
              rows="5"
              placeholder="Enter your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleFeedbackSubmit(selectedApplication._id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppliedScholarshipManage;
