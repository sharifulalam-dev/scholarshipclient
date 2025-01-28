import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "./../Hooks/useAuth";

const MyReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://scholarshipserver.vercel.app/reviews`, {
        params: { email: user.email },
      })
      .then((res) => {
        setReviews(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [user.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this review.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://scholarshipserver.vercel.app/reviews/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "Your review has been deleted.", "success");
            setReviews((prev) => prev.filter((review) => review._id !== id));
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete the review.", "error");
          });
      }
    });
  };

  const handleEdit = (review) => {
    Swal.fire({
      title: "Edit Review",
      html: `
        <div>
          <label for="editScholarshipName" class="block text-left font-medium">Scholarship Name</label>
          <input type="text" id="editScholarshipName" class="swal2-input" value="${review.scholarshipName}" disabled />
          <label for="editUniversityName" class="block text-left font-medium mt-2">University Name</label>
          <input type="text" id="editUniversityName" class="swal2-input" value="${review.universityName}" disabled />
          <label for="editComment" class="block text-left font-medium mt-2">Comment</label>
          <textarea id="editComment" class="swal2-textarea" placeholder="Edit your comment">${review.comment}</textarea>
          <label for="editDate" class="block text-left font-medium mt-2">Date</label>
          <input type="date" id="editDate" class="swal2-input" value="${review.date}" />
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Save Changes",
      preConfirm: () => {
        const editedComment = document.getElementById("editComment").value;
        const editedDate = document.getElementById("editDate").value;

        if (!editedComment || !editedDate) {
          Swal.showValidationMessage("Please fill out all fields.");
          return null;
        }

        return { comment: editedComment, date: editedDate };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            `https://scholarshipserver.vercel.app/reviews/${review._id}`,
            result.value
          )
          .then(() => {
            Swal.fire("Updated!", "Your review has been updated.", "success");
            setReviews((prev) =>
              prev.map((r) =>
                r._id === review._id ? { ...r, ...result.value } : r
              )
            );
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to update the review.", "error");
          });
      }
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Reviews</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Scholarship Name</th>
              <th className="py-3 px-4 text-left">University Name</th>
              <th className="py-3 px-4 text-left">Comment</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id} className="border-t">
                <td className="py-3 px-4">{review.scholarshipName}</td>
                <td className="py-3 px-4">{review.universityName}</td>
                <td className="py-3 px-4">{review.comment}</td>
                <td className="py-3 px-4">{review.date}</td>
                <td className="py-3 px-4 flex justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(review)}
                    className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
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
      {reviews.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No reviews found.</p>
      )}
    </div>
  );
};

export default MyReviews;
