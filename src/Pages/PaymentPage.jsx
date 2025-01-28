import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "./../Hooks/useAxiosSecure";
import { imageUpload } from "./../utils/imageUpload";

// Load Stripe's publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const scholarshipId = useParams();
  const [isPaid, setIsPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const [scholarship, setScholarship] = useState({});

  useEffect(() => {
    axios
      .get(`https://scholarshipserver.vercel.app/scholarship-details/${id}`)
      .then((res) => setScholarship(res.data));
  }, []);

  const totalAmount =
    Number(scholarship.serviceCharge) + Number(scholarship.applicationFees);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe has not loaded.");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error("Card Element not found.");
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        email: user.email,
        amount: Number(totalAmount),
      });

      const clientSecret = data.clientSecret;

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: user.name || "Customer Name",
            },
          },
        }
      );

      if (error) {
        console.error("Payment failed:", error.message);
        Swal.fire("Error!", "Payment failed. Please try again.", "error");
        setIsLoading(false);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        Swal.fire("Success!", "Your payment was successful!", "success").then(
          (result) => {
            if (result.isConfirmed) {
              setIsPaid(true);
            }
            setIsLoading(false);
          }
        );
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      Swal.fire(
        "Error!",
        "An error occurred while processing payment.",
        "error"
      );
      setIsLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    phoneNumber: "",
    address: "",
    gender: "",
    degree: "",
    sscResult: "",
    hscResult: "",
    studyGap: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (file) => {
    try {
      const imageUrl = await imageUpload(file);
      setFormData({ ...formData, image: imageUrl });
    } catch (error) {
      console.error("Error uploading image:", error);
      Swal.fire("Error!", "Image upload failed. Please try again.", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const finalData = {
        ...formData,
        universityName: scholarship.universityName,
        scholarshipCategory: scholarship.scholarshipCategory,
        subjectCategory: scholarship.subjectCategory,
        scholarshipId: id,
        location: scholarship.location,
        universityCity: scholarship.universityCity,
        universityCountry: scholarship.universityCountry,
        serviceCharge: scholarship.serviceCharge,
        applicationFees: scholarship.applicationFees,
      };

      const response = await axiosSecure.post(
        `https://scholarshipserver.vercel.app/appliedscholarships`,
        {
          ...finalData,
          email: user.email,
        }
      );

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          text: "Your application has been submitted successfully.",
          confirmButtonText: "OK",
        });
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error submitting application:", error);

      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "There was an error while submitting your application. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="py-10 px-6">
      <div className="container mx-auto py-10 px-6 mt-12 bg-gray-100">
        {!isPaid ? (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-left">Images</th>
                    <th className="p-4 text-left">Details</th>
                    <th className="p-4 text-left">Unit Price</th>
                    <th className="p-4 text-left">Quantity</th>
                    <th className="p-4 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4 align-top">
                      <img
                        src={scholarship.universityImage}
                        alt="Product"
                        className="object-cover rounded h[100px] w-[70px]"
                      />
                    </td>
                    <td className="p-4 align-top">
                      Service Charge + Application Fees
                    </td>
                    <td className="p-4 align-top">${totalAmount}</td>
                    <td className="p-4 align-top">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value="1"
                          className="w-12 text-center border rounded"
                          readOnly
                        />
                      </div>
                    </td>
                    <td className="p-4 align-top">${totalAmount}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex flex-col items-end">
              <div className="w-full sm:w-1/2 md:w-1/3 border border-gray-200 rounded p-4">
                <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${totalAmount}</span>
                </div>
                <div className="flex justify-between items-center border-t pt-2">
                  <span className="text-gray-600">Total</span>
                  <span className="font-semibold">${totalAmount}</span>
                </div>

                <form onSubmit={handlePayment}>
                  <CardElement
                    className="border p-4 rounded-md my-4"
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#32325d",
                        },
                      },
                    }}
                  />
                  <button
                    type="submit"
                    className={`mt-4 w-full py-2 rounded font-semibold text-white ${
                      isLoading
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Pay"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-xl mx-auto p-4 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold mb-4">Application Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 border-b pb-2">
                  Personal Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Applicant's Phone Number
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Applicant Photo
                    </label>
                    <input
                      type="file"
                      onChange={(e) => handleImageUpload(e.target.files[0])}
                      className="w-full border p-2 rounded"
                      required
                    />
                  </div>

                  <div className="mb-4 col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Applicant Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                      placeholder="Village, District, Country"
                      required
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Applicant Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 border-b pb-2">
                  Academic Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Applicant Applying Degree
                    </label>
                    <select
                      name="degree"
                      value={formData.degree}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                      required
                    >
                      <option value="">Select Degree</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Bachelor">Bachelor</option>
                      <option value="Masters">Masters</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      SSC Result
                    </label>
                    <input
                      type="number"
                      name="sscResult"
                      value={formData.sscResult}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                      placeholder="Enter SSC result"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      HSC Result
                    </label>
                    <input
                      type="number"
                      name="hscResult"
                      value={formData.hscResult}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                      placeholder="Enter HSC result"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Study Gap (Optional)
                    </label>
                    <select
                      name="studyGap"
                      value={formData.studyGap}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    >
                      <option value="">Select Study Gap</option>
                      <option value="1 year">1 year</option>
                      <option value="2 years">2 years</option>
                      <option value="3 years or more">3 years or more</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 border-b pb-2">
                  Additional Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      University Name
                    </label>
                    <input
                      type="text"
                      value={scholarship.universityName}
                      className="w-full border p-2 rounded bg-gray-100"
                      readOnly
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Scholarship Category
                    </label>
                    <input
                      type="text"
                      value={scholarship.scholarshipCategory}
                      className="w-full border p-2 rounded bg-gray-100"
                      readOnly
                    />
                  </div>

                  <div className="mb-4 col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Subject Category
                    </label>
                    <input
                      type="text"
                      value={scholarship.subjectCategory}
                      className="w-full border p-2 rounded bg-gray-100"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
              >
                Submit / Apply
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default () => (
  <Elements stripe={stripePromise}>
    <PaymentPage />
  </Elements>
);
