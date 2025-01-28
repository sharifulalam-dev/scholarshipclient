import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Swal from "sweetalert2";

const fetchReviews = async () => {
  const response = await axios.get(
    `https://scholarshipserver.vercel.app/allreviews`
  );
  return response.data;
};

const AllReviews = () => {
  const {
    data: reviews = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading reviews...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg">Failed to load reviews.</p>
      </div>
    );
  }

  if (!Array.isArray(reviews) || reviews.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">No reviews available.</p>
      </div>
    );
  }

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://scholarshipserver.vercel.app/allreviews/${id}`
          );
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Review deleted successfully!",
            confirmButtonText: "OK",
          });
          refetch();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete the review.",
          });
          console.error("Error deleting review:", error.message);
        }
      }
    });
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold text-center mb-6">All Reviews</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="w-80 border border-gray-200 rounded-lg shadow-md p-6 bg-white transition-transform transform hover:scale-105"
          >
            <div className="flex flex-col items-center mb-4">
              <img
                src={review.reviwerImage || "https://via.placeholder.com/80"}
                alt="Reviewer"
                className="w-20 h-20 rounded-full mb-3 shadow-lg"
              />
              <h3 className="text-lg font-semibold text-gray-700">
                {review.universityName}
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Subject Category:</strong> {review.subjectCategory}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Reviewer:</strong> {review.reviewerName}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Review Date:</strong> {review.date}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Rating:</strong> {review.rating} / 5
            </p>
            <p className="text-sm text-gray-600">
              <strong>Comments:</strong> {review.comment}
            </p>
            <button
              onClick={() => handleDelete(review._id)}
              className="mt-4 px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 shadow-md"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
