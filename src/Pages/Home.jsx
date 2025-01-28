import "animate.css";
import React from "react";
import CountUp from "react-countup";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TopScholarships from "./../components/TopScholarShips";
import banner1 from "/public/banner1.avif";
import banner2 from "/public/banner2.avif";
import banner3 from "/public/banner3.avif";
import counterBack from "/public/library.avif";

export default function Home() {
  return (
    <>
      <main className=" pb-6 pt-16">
        <div className="max-h-screen">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            navigation={true}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Pagination, Autoplay]}
            className="custom-swiper animate__animated animate__fadeInDown"
          >
            <SwiperSlide>
              <div className="w-full h-[560px]  overflow-hidden">
                <img
                  src={banner1}
                  alt="Slide 1"
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full h-[560px]  overflow-hidden">
                <img
                  src={banner2}
                  alt="Slide 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full h-[560px]  overflow-hidden">
                <img
                  src={banner3}
                  alt="Slide 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <TopScholarships />

        <section
          style={{ backgroundImage: `url(${counterBack})` }}
          className="p-6 md:p-10 mt-10 rounded-lg animate__animated animate__fadeInDown"
        >
          <h2 className="text-white text-3xl md:text-4xl font-bold text-center">
            Our Achievements
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-8 mt-6">
            <div className="text-center bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-green-600 text-4xl md:text-5xl font-bold">
                <CountUp end={200} duration={7} />+
              </h3>
              <p className="text-gray-700 text-lg">Successful Applications</p>
            </div>
            <div className="text-center bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-orange-600 text-4xl md:text-5xl font-bold">
                <CountUp end={100} duration={7} />+
              </h3>
              <p className="text-gray-700 text-lg">Scholarship Programs</p>
            </div>
            <div className="text-center bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-blue-600 text-4xl md:text-5xl font-bold">
                <CountUp end={50} duration={7} />+
              </h3>
              <p className="text-gray-700 text-lg">Partner Universities</p>
            </div>
            <div className="text-center bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-yellow-600 text-4xl md:text-5xl font-bold">
                <CountUp end={500} duration={7} />+
              </h3>
              <p className="text-gray-700 text-lg">Happy Users</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 p-6 md:p-10 mt-10 rounded-lg border-t-4 border-blue-600 animate__animated animate__fadeInDown">
          <h2 className="text-black text-3xl md:text-4xl font-bold text-center mb-6">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-orange-100 p-6 rounded-lg border border-dashed border-gray-500 flex flex-col items-center ">
              <img
                src="https://i.pravatar.cc/150?img=51"
                alt="User Maria Gonzalez"
                className="w-20 h-20 rounded-full mb-4 "
              />
              <p className="text-gray-600 text-center italic mb-2">
                "Scholarship Management helped me find the perfect scholarship
                for my dream university!"
              </p>
              <p className="text-gray-800 font-bold">- Kevin Gonzalez</p>
            </div>
            <div className="bg-orange-100 p-6 rounded-lg border border-dashed border-gray-500 flex flex-col items-center ">
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="User James Smith"
                className="w-20 h-20 rounded-full mb-4 border-2 border-blue-300"
              />
              <p className="text-gray-600 text-center italic mb-2">
                "The platform made the application process so smooth and
                stress-free. Highly recommend!"
              </p>
              <p className="text-gray-800 font-bold">- James Smith</p>
            </div>
            <div className="bg-orange-100 p-6 rounded-lg border border-dashed border-gray-500 flex flex-col items-center ">
              <img
                src="https://i.pravatar.cc/150?img=56"
                alt="User Sarah Lee"
                className="w-20 h-20 rounded-full mb-4 border-2 border-blue-300"
              />
              <p className="text-gray-600 text-center italic mb-2">
                "Thanks to this website, I secured a full-ride scholarship for
                my bachelor's degree!"
              </p>
              <p className="text-gray-800 font-bold">- Breet Lee</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
