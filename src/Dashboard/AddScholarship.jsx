import React, { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "./../Hooks/useAuth";
import { imageUpload } from "./../utils/imageUpload";

import axios from "axios";

const AddScholarship = () => {
  const { user } = useAuth();
  const { email } = user;

  const [formData, setFormData] = useState({
    scholarshipName: "",
    universityName: "",
    universityImage: null,
    universityCountry: "",
    universityCity: "",
    universityRank: "",
    subjectName: "",
    subjectCategory: "",
    scholarshipCategory: "",
    degree: "",
    tuitionFees: "",
    applicationFees: "",
    serviceCharge: "",
    applicationDeadline: "",
    postDate: new Date().toISOString().split("T")[0],
    scholarshipDescription: "",
    stipend: "",
    rating: "",
  });

  const subjectCategories = ["Agriculture", "Engineering", "Doctor"];
  const scholarshipCategories = ["Full fund", "Partial", "Self-fund"];
  const degreeCategories = ["Diploma", "Bachelor", "Masters"];

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.universityImage) {
      Swal.fire("Error", "Please upload a university logo.", "error");
      return;
    }

    if (formData.rating && (formData.rating < 1 || formData.rating > 5)) {
      Swal.fire("Error", "Rating must be between 1 and 5.", "error");
      return;
    }

    try {
      const imageUrl = await imageUpload(formData.universityImage);

      const payload = {
        ...formData,
        universityImage: imageUrl,
        postedUserEmail: email,
      };

      const response = await axios.post(
        `https://scholarshipserver.vercel.app/addscholarship`,
        payload
      );

      if (response.status === 200) {
        Swal.fire("Success", "Scholarship added successfully!", "success");
        setFormData({
          scholarshipName: "",
          universityName: "",
          universityImage: null,
          universityCountry: "",
          universityCity: "",
          universityRank: "",
          subjectName: "",
          subjectCategory: "",
          scholarshipCategory: "",
          degree: "",
          tuitionFees: "",
          applicationFees: "",
          serviceCharge: "",
          applicationDeadline: "",
          postDate: new Date().toISOString().split("T")[0],
          scholarshipDescription: "",
          stipend: "",
          rating: "",
        });
      } else {
        Swal.fire("Error", "Failed to add scholarship.", "error");
      }
    } catch (error) {
      console.error("Error adding scholarship:", error);
      Swal.fire(
        "Error",
        "An error occurred while adding the scholarship.",
        "error"
      );
    }
  };

  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-6">Add Scholarship</h1>
      <form
        className="bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-2">Scholarship Name</label>
            <input
              type="text"
              name="scholarshipName"
              value={formData.scholarshipName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">University Name</label>
            <input
              type="text"
              name="universityName"
              value={formData.universityName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">University Logo</label>
            <input
              type="file"
              name="universityImage"
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">University Country</label>
            <input
              type="text"
              name="universityCountry"
              value={formData.universityCountry}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">University City</label>
            <input
              type="text"
              name="universityCity"
              value={formData.universityCity}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              University World Rank
            </label>
            <input
              type="number"
              name="universityRank"
              value={formData.universityRank}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Subject Name</label>
            <input
              type="text"
              name="subjectName"
              value={formData.subjectName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Subject Category</label>
            <select
              name="subjectCategory"
              value={formData.subjectCategory}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="">Select Category</option>
              {subjectCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">
              Scholarship Category
            </label>
            <select
              name="scholarshipCategory"
              value={formData.scholarshipCategory}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="">Select Category</option>
              {scholarshipCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">Degree</label>
            <select
              name="degree"
              value={formData.degree}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="">Select Degree</option>
              {degreeCategories.map((degree, index) => (
                <option key={index} value={degree}>
                  {degree}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">Tuition Fees</label>
            <input
              type="number"
              name="tuitionFees"
              value={formData.tuitionFees}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Application Fees</label>
            <input
              type="number"
              name="applicationFees"
              value={formData.applicationFees}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Service Charge</label>
            <input
              type="number"
              name="serviceCharge"
              value={formData.serviceCharge}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Scholarship Description
            </label>
            <textarea
              name="scholarshipDescription"
              value={formData.scholarshipDescription}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
              rows="4"
            ></textarea>
          </div>

          <div>
            <label className="block font-medium mb-2">Stipend (Optional)</label>
            <input
              type="number"
              name="stipend"
              value={formData.stipend}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Rating (1-5)</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
              min="1"
              max="5"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Application Deadline
            </label>
            <input
              type="date"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Post Date</label>
            <input
              type="date"
              name="postDate"
              value={formData.postDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Scholarship
        </button>
      </form>
    </div>
  );
};

export default AddScholarship;
