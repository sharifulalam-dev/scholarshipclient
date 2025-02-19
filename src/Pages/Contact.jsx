import Lottie from "lottie-react"; // Use Lottie instead of Player
import React from "react";
import contactAnimation from "../assets/contact.json"; // Path to your Lottie JSON file

const Contact = () => {
  return (
    <div className="bg-white py-10">
      <section className="mx-auto max-w-7xl px-6">
        <h1 className="text-4xl font-bold text-center text-[#2A3B69] mb-12">
          Contact Us
        </h1>

        {/* Contact Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#F5F7FA] p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-[#2A3B69] mb-4">
              Get in Touch
            </h2>
            <form>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows="4"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#34B78F] text-white py-3 px-4 rounded-md font-semibold hover:bg-[#2A3B69] transition-all"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Lottie Animation Section */}
          <div className="relative rounded-lg overflow-hidden shadow-md">
            <Lottie
              animationData={contactAnimation} // Use animationData instead of src
              loop={true}
              autoplay={true}
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
