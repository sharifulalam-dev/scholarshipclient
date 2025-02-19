import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners"; // Import the spinner
import Swal from "sweetalert2";

const AllScholarships = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  // Mock data fetch with useEffect for loading state
  useEffect(() => {
    setTimeout(() => {
      setApplications([
        {
          id: 1,
          applicantName: "John Doe",
          appliedUniversity: "Harvard University",
          appliedDegree: "MSc in Computer Science",
          scholarshipCategory: "Merit-based",
          status: "Pending",
          feedback: "",
        },
        {
          id: 2,
          applicantName: "Jane Smith",
          appliedUniversity: "Stanford University",
          appliedDegree: "MBA",
          scholarshipCategory: "Need-based",
          status: "Processing",
          feedback: "",
        },
      ]);
      setLoading(false); // Set loading to false after data is loaded
    }, 2000); // Simulate a 2-second data fetch
  }, []);

  const handleDetails = (application) => {
    setSelectedApplication(application);
    setShowDetailsModal(true);
  };

  const handleFeedback = (application) => {
    setSelectedApplication(application);
    setFeedbackText(application.feedback || "");
    setShowFeedbackModal(true);
  };

  const submitFeedback = () => {
    if (!selectedApplication) return;

    const updated = applications.map((app) =>
      app.id === selectedApplication.id
        ? { ...app, feedback: feedbackText }
        : app
    );
    setApplications(updated);

    setShowFeedbackModal(false);
    setSelectedApplication(null);
    setFeedbackText("");

    Swal.fire({
      icon: "success",
      title: "Feedback Submitted",
      text: "Your feedback has been recorded successfully.",
    });
  };

  const handleCancel = (application) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once canceled, the applicant will see the status as Rejected!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#999",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = applications.map((app) =>
          app.id === application.id ? { ...app, status: "Rejected" } : app
        );
        setApplications(updated);

        Swal.fire(
          "Rejected!",
          "The application has been marked as rejected.",
          "success"
        );
      }
    });
  };

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">All Applied Scholarships</h1>

      {/* Show spinner when loading */}
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <ClipLoader color="#2A3B69" size={100} />
        </div>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="py-3 px-4 text-left font-medium">
                Application ID
              </th>
              <th className="py-3 px-4 text-left font-medium">
                Applicant Name
              </th>
              <th className="py-3 px-4 text-left font-medium">University</th>
              <th className="py-3 px-4 text-left font-medium">Degree</th>
              <th className="py-3 px-4 text-left font-medium">
                Scholarship Category
              </th>
              <th className="py-3 px-4 text-left font-medium">Status</th>
              <th className="py-3 px-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-b border-gray-200">
                <td className="py-3 px-4">{app.id}</td>
                <td className="py-3 px-4">{app.applicantName}</td>
                <td className="py-3 px-4">{app.appliedUniversity}</td>
                <td className="py-3 px-4">{app.appliedDegree}</td>
                <td className="py-3 px-4">{app.scholarshipCategory}</td>
                <td className="py-3 px-4">{app.status}</td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 transition-colors"
                    onClick={() => handleDetails(app)}
                  >
                    Details
                  </button>

                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                    onClick={() => handleFeedback(app)}
                    disabled={app.status === "Rejected"}
                  >
                    Feedback
                  </button>

                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                    onClick={() => handleCancel(app)}
                    disabled={app.status === "Rejected"}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedApplication && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-11/12 max-w-md mx-auto rounded shadow-lg p-6 relative">
            <h2 className="text-xl font-semibold mb-4">Application Details</h2>
            <div className="mb-4">
              <p>
                <strong>University:</strong>{" "}
                {selectedApplication.appliedUniversity}
              </p>
              <p>
                <strong>Degree:</strong> {selectedApplication.appliedDegree}
              </p>
              <p>
                <strong>Scholarship Category:</strong>{" "}
                {selectedApplication.scholarshipCategory}
              </p>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                onClick={() => setShowDetailsModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && selectedApplication && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-11/12 max-w-md mx-auto rounded shadow-lg p-6 relative">
            <h2 className="text-xl font-semibold mb-4">Give Feedback</h2>
            <textarea
              className="w-full border rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
              rows={4}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Enter any missing documents or extra info needed..."
            ></textarea>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                onClick={submitFeedback}
              >
                Submit
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                onClick={() => {
                  setShowFeedbackModal(false);
                  setSelectedApplication(null);
                  setFeedbackText("");
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllScholarships;
