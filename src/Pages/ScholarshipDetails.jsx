import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "react-spinner"; // Make sure this import matches your installed library
import SwiperCore from "swiper/core";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

SwiperCore.use([Navigation, Pagination]);

const ScholarshipDetails = () => {
  const { id } = useParams();

  const {
    data: scholarship = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://scholarshipserver.vercel.app/scholarship-details/${id}`
      );
      return data;
    },
  });

  if (isLoading) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          zIndex: 99999, // Ensure the spinner is above all other elements
        }}
      >
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        <div className="w-full mx-auto bg-white shadow-md rounded-md mt-32 p-6">
          <div>
            <img
              src={scholarship.universityImage}
              alt={scholarship.universityName}
              className="w-full max-h-96 object-cover rounded-md"
            />
            <div className="flex flex-col items-center mt-4 space-y-2">
              <h1 className="text-xl font-bold text-gray-800">
                {scholarship.universityName}
              </h1>
              <p className="text-sm text-gray-500">
                {scholarship.location?.city}, {scholarship.location?.country}
              </p>
            </div>
          </div>

          <div className="mt-4 border-t border-gray-200 pt-4">
            <p className="text-blue-600 font-semibold">
              {scholarship.subjectCategory}
            </p>
            <p className="text-blue-500">{scholarship.subjectName}</p>
          </div>

          <p className="text-gray-700 mt-3">
            {scholarship.scholarshipCategory}
          </p>

          <p className="text-gray-700 mt-3">
            {scholarship.scholarshipDescription}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-gray-500 text-sm">Stipend</p>
              <p className="text-gray-800 font-medium">{scholarship.stipend}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Post Date</p>
              <p className="text-gray-800 font-medium">
                {scholarship.postDate}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Deadline</p>
              <p className="text-gray-800 font-medium">
                {scholarship.applicationDeadline}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Service Charge</p>
              <p className="text-gray-800 font-medium">
                ${scholarship.serviceCharge}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Application Fees</p>
              <p className="text-gray-800 font-medium">
                ${scholarship.applicationFees}
              </p>
            </div>
          </div>

          <div className="max-w-sm mx-auto p-4">
            <Link to={`/payment/${scholarship._id}`}>
              <button className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors">
                Apply For Scholarship
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScholarshipDetails;
