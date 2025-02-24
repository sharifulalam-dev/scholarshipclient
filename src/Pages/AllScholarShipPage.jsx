import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoFilterSharp, IoLocationSharp } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const AllScholarshipPage = () => {
  const [scholarships, setScholarships] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [ratingFilter, setRatingFilter] = useState("high"); // Rating filter (high to low)
  const [priceFilter, setPriceFilter] = useState("low"); // Price filter (low to high)
  const itemsPerPage = 8;
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await axios.get(
          `https://scholarshipserver.vercel.app/allscholarship`
        );
        setScholarships(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching scholarships:", error.message);
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  const filteredScholarships = scholarships
    ?.filter((s) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        s.universityName?.toLowerCase()?.includes(query) ||
        s.category?.toLowerCase()?.includes(query) ||
        s.subjectCategory?.toLowerCase()?.includes(query) ||
        s.universityCity?.toLowerCase()?.includes(query) ||
        s.universityCountry?.toLowerCase()?.includes(query);

      return matchesSearch;
    })
    .sort((a, b) => {
      // Handle price filter (only if price filter is active)
      if (priceFilter !== "") {
        const cleanFee = (fee) => {
          if (typeof fee === "number") return fee;
          return parseFloat(fee?.replace(/[^0-9.]/g, "")) || 0;
        };

        const priceA = cleanFee(a.applicationFees);
        const priceB = cleanFee(b.applicationFees);

        if (priceFilter === "low") {
          return priceA - priceB; // low to high price
        } else if (priceFilter === "high") {
          return priceB - priceA; // high to low price
        }
      }

      // Handle rating filter (only if rating filter is active)
      if (ratingFilter !== "") {
        if (ratingFilter === "high") {
          return b.rating - a.rating; // high to low rating
        } else if (ratingFilter === "low") {
          return a.rating - b.rating; // low to high rating
        }
      }

      return 0;
    });

  const offset = currentPage * itemsPerPage;
  const paginatedScholarships = filteredScholarships?.slice(
    offset,
    offset + itemsPerPage
  );
  const pageCount = Math.ceil(filteredScholarships?.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  const getRatingConfig = (value) => ({
    size: 20,
    value,
    edit: false,
    isHalf: true,
    activeColor: "#ffb700",
    color: "#dcdcdc",
  });

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Scholarship Search
      </h1>

      {/* Show spinner while loading */}
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <ClipLoader color="#2A3B69" size={100} />
        </div>
      ) : (
        <>
          {/* Search and Filter Box */}
          <div className="flex justify-center mb-8 space-x-4">
            <input
              type="text"
              placeholder="Search by University, Category, Subject, or Location"
              value={searchQuery}
              onChange={handleSearch}
              className="border rounded-l-md px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setCurrentPage(0)}
              className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700 transition"
            >
              Search
            </button>

            {/* Filter Icon and Filter Dropdown */}
            <div className="relative z-50">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="bg-gray-200 p-2 rounded-md flex items-center hover:bg-gray-300 transition"
              >
                <IoFilterSharp className="text-xl text-gray-600" />
                <span className="ml-2 text-gray-600">Filter</span>
              </button>
              {showFilterDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-4 space-y-2">
                  {/* Rating Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Rating
                    </label>
                    <select
                      value={ratingFilter}
                      onChange={(e) => {
                        setRatingFilter(e.target.value);
                        setPriceFilter(""); // Clear price filter when rating is selected
                      }}
                      className="w-full mt-1 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">None</option>
                      <option value="high">High to Low</option>
                      <option value="low">Low to High</option>
                    </select>
                  </div>

                  {/* Price Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Application Fee
                    </label>
                    <select
                      value={priceFilter}
                      onChange={(e) => {
                        setPriceFilter(e.target.value);
                        setRatingFilter(""); // Clear rating filter when price is selected
                      }}
                      className="w-full mt-1 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">None</option>
                      <option value="low">Low to High</option>
                      <option value="high">High to Low</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Scholarships Grid */}
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedScholarships?.length > 0 ? (
                paginatedScholarships.map((scholarship) => (
                  <div
                    key={scholarship._id}
                    className="relative bg-white p-6 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg flex flex-col min-h-[500px] max-h-[600px] h-full"
                  >
                    <img
                      src={scholarship.universityImage}
                      alt={`${scholarship.universityName} Logo`}
                      className="mb-4 h-48 w-full object-cover rounded-md"
                    />
                    <span className="absolute top-4 right-4 bg-blue-600 text-white text-sm py-1 px-3 rounded-md shadow-sm">
                      {scholarship.subjectCategory}
                    </span>
                    <div className="flex-1 flex flex-col justify-between">
                      <h3 className="text-xl font-semibold text-blue-700 mb-1">
                        {scholarship.universityName}
                      </h3>
                      <p className="text-orange-600 text-md font-medium mb-2">
                        {scholarship.category}
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
                        {scholarship.applicationDeadline}
                      </p>
                      <div className="mt-3 mb-2 flex items-center">
                        <span className="font-semibold text-gray-700">
                          Rating:
                        </span>
                        <div className="flex items-center mt-1 ml-2">
                          <ReactStars
                            {...getRatingConfig(scholarship.rating)}
                          />
                          <span className="text-gray-700 text-md ml-2">
                            {scholarship.rating.toFixed(1)}
                          </span>
                        </div>
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
                ))
              ) : (
                <div className="col-span-2 text-center">No results found</div>
              )}
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-8">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName={"flex items-center justify-center space-x-2"}
              activeClassName={"bg-blue-600 text-white px-3 py-1 rounded"}
              pageClassName={"px-2 py-1 cursor-pointer"}
              previousClassName={"px-2 py-1 bg-gray-300 rounded cursor-pointer"}
              nextClassName={"px-2 py-1 bg-gray-300 rounded cursor-pointer"}
              disabledClassName={"opacity-50 cursor-not-allowed"}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AllScholarshipPage;
