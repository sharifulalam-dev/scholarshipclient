import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiEdit, FiInfo, FiStar, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import useAuth from "./../Hooks/useAuth";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [currentApplication, setCurrentApplication] = useState(null);
  const [reviewData, setReviewData] = useState({
    rating: "",
    comment: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    axios
      .get(`https://scholarshipserver.vercel.app/appliedscholarships`, {
        params: { email: user.email },
      })
      .then((res) => setApplications(res.data))
      .catch((err) => console.error(err));
  }, [user.email]);

  const handleDetails = (id) => {
    const application = applications.find((app) => app._id === id);
    const city = application?.universityCity || "Not Provided";
    const country = application?.universityCountry || "Not Provided";

    Swal.fire(
      `Details for ${application.universityName}`,
      `Address: ${city}, ${country}\nStatus: ${application.status}`,
      "info"
    );
  };

  const handleEdit = (status) => {
    if (status.toLowerCase() === "pending") {
      Swal.fire(
        "Edit Application",
        "You can edit this application.",
        "success"
      );
    } else {
      Swal.fire(
        "Cannot Edit",
        "This application is already in processing or completed.",
        "error"
      );
    }
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
        axios
          .delete(
            `https://scholarshipserver.vercel.app/appliedscholarships/${id}`
          )
          .then((res) => {
            if (res.status === 200) {
              setApplications((prev) => prev.filter((app) => app._id !== id));
              Swal.fire(
                "Deleted!",
                "Your application has been deleted.",
                "success"
              );
            } else {
              Swal.fire("Error", "Failed to delete the application.", "error");
            }
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error", "Failed to delete the application.", "error");
          });
      }
    });
  };

  const handleAddReview = (app) => {
    setCurrentApplication(app);
    setShowModal(true);
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({ ...prev, [name]: value }));
  };

  const submitReview = async () => {
    if (!reviewData.rating || !reviewData.comment) {
      Swal.fire("Error", "Please fill out all review fields.", "error");
      return;
    }

    try {
      const response = await axios.post(
        `https://scholarshipserver.vercel.app/addreviews`,
        {
          ...reviewData,
          email: user.email,
          reviewerName: user.displayName,
          reviwerImage: user.photoURL,
          scholarshipId: currentApplication.scholarshipId,
        }
      );

      if (response.status === 201) {
        Swal.fire("Success", "Your review has been submitted!", "success");
        setShowModal(false);
        setReviewData({
          rating: "",
          comment: "",
          date: new Date().toISOString().split("T")[0],
        });
      } else {
        throw new Error("Failed to submit review.");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to submit review. Please try again.", "error");
    }
  };

  return (
    <div className="w-full lg:w-[1066px] mx-auto overflow-x-auto">
      <h1 className="text-3xl font-bold text-center mb-6">My Applications</h1>
      <table className="bg-white border border-gray-200 rounded">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="py-2 px-4">University Name</th>
            <th className="py-2 px-4">Address</th>
            <th className="py-2 px-4">Degree</th>
            <th className="py-2 px-4">Subject Category</th>
            <th className="py-2 px-4">Application Fee</th>
            <th className="py-2 px-4">Service Charge</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Feedback</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr
              key={app._id}
              className="border-b hover:bg-gray-100 text-center"
            >
              <td className="py-2 px-4">{app.universityName}</td>
              <td className="py-2 px-4">
                {`${app.universityCity || "Not Provided"}, ${
                  app.universityCountry || "Not Provided"
                }`}
              </td>
              <td className="py-2 px-4">{app.degree}</td>
              <td className="py-2 px-4">{app.subjectCategory}</td>
              <td className="py-2 px-4">${app.applicationFees || "0.00"}</td>
              <td className="py-2 px-4">${app.serviceCharge || "0.00"}</td>
              <td className="py-2 px-4 capitalize">{app.status}</td>
              <td className="py-2 px-4">
                {app.feedback ? app.feedback : "No Feedback"}
              </td>
              <td className="py-2 px-4 flex justify-center space-x-2">
                <button
                  onClick={() => handleDetails(app._id)}
                  className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 flex items-center justify-center"
                >
                  <FiInfo />
                </button>
                <button
                  onClick={() => handleEdit(app.status)}
                  className={`py-1 px-3 rounded hover:bg-yellow-600 flex items-center justify-center ${
                    app.status.toLowerCase() === "pending"
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-400 text-gray-700 cursor-not-allowed"
                  }`}
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => handleAddReview(app)}
                  className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-700 flex items-center justify-center"
                >
                  <FiStar />
                </button>
                <button
                  onClick={() => handleDelete(app._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 flex items-center justify-center"
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {applications.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No applications found.</p>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Add Review</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Rating Point
              </label>
              <input
                type="number"
                name="rating"
                value={reviewData.rating}
                onChange={handleReviewChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter rating (1-5)"
                min="1"
                max="5"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Review Comment
              </label>
              <textarea
                name="comment"
                value={reviewData.comment}
                onChange={handleReviewChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Write your review"
                rows="4"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Review Date
              </label>
              <input
                type="date"
                name="date"
                value={reviewData.date}
                onChange={handleReviewChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={submitReview}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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

export default MyApplications;
