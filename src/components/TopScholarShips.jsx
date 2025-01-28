import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
const TotalScholarships = () => {
  const [scholarships, setscholarships] = useState(null);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await axios.get(
          `https://scholarshipserver.vercel.app/allscholarship`
        );

        setscholarships(response.data); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching scholarships:", error.message);
      }
    };

    fetchScholarships();
  }, []);

  const getRatingConfig = (value) => ({
    size: 20,
    value,
    edit: false,
    isHalf: true,
    activeColor: "#ffb700",
    color: "#dcdcdc",
  });

  return (
    <section className="py-10 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
          Total Scholarships
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {scholarships &&
            scholarships
              .sort(
                (a, b) =>
                  a.applicationFees - b.applicationFees ||
                  new Date(a.deadline) - new Date(b.deadline)
              )
              .slice(0, 6)
              .map((scholarship) => (
                <div
                  key={scholarship._id}
                  className="relative bg-white p-6 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <img
                    src={scholarship.universityImage}
                    alt={`${scholarship.universityName} Logo`}
                    className="mb-4 h-48 w-full object-cover rounded-md"
                  />

                  <span className="absolute top-4 right-4 bg-blue-600 text-white text-sm py-1 px-3 rounded-md shadow-sm">
                    {scholarship.subjectCategory}
                  </span>

                  <h3 className="text-xl font-semibold text-blue-700 mb-1">
                    {scholarship.universityName}
                  </h3>
                  <p className="text-orange-600 text-md font-medium mb-2">
                    {scholarship.scholarshipCategory}
                  </p>

                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <IoLocationSharp className="mr-1" />
                    <p>
                      {scholarship.universityCity},{" "}
                      {scholarship.universityCountry}
                    </p>
                  </div>

                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Application Deadline:</strong>{" "}
                    {scholarship.deadline}
                  </p>

                  <div className="mt-3 mb-2 flex items-center">
                    <span className="font-semibold text-gray-700">Rating:</span>
                    <div className="flex items-center mt-1 ml-2">
                      <ReactStars {...getRatingConfig(scholarship.rating)} />
                      <span className="text-gray-700 text-md ml-2">
                        {scholarship.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-200">
                    <h4 className="text-red-700 text-lg font-bold">
                      ${scholarship.applicationFees}
                    </h4>
                    <Link
                      to={`/scholarship-details/${scholarship._id}`}
                      className="text-blue-600 font-medium hover:underline"
                    >
                      View Details &rarr;
                    </Link>
                  </div>
                </div>
              ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/allscholarship">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold">
              View All Scholarships
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TotalScholarships;
