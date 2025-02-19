import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import React, { useState } from "react";

const Contact = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Coordinates for Dhaka, Bangladesh
  const position = { lat: 23.8103, lng: 90.4125 };

  // Styles for the map
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  // Google Maps API Key (You will need to replace this with your own API Key)
  const apiKey = "YOUR_GOOGLE_MAPS_API_KEY";

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

          {/* Google Map Section */}
          <div className="relative rounded-lg overflow-hidden shadow-md">
            <LoadScript googleMapsApiKey={apiKey}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={position}
                zoom={13}
              >
                <Marker
                  position={position}
                  onClick={() => setSelectedPlace(position)}
                />
                {selectedPlace && (
                  <InfoWindow
                    position={position}
                    onCloseClick={() => setSelectedPlace(null)}
                  >
                    <div>
                      <h4>Dhaka, Bangladesh</h4>
                      <p>Located in the heart of Bangladesh</p>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
