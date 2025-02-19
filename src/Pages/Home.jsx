import "animate.css";
import React from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TopScholarships from "./../components/TopScholarShips";
import banner1 from "/public/banner1.avif";
import banner2 from "/public/banner2.avif";
import banner3 from "/public/banner3.avif";
import counterBack from "/public/library.avif";

export default function Home() {
  return (
    <>
      <main>
        {/* Hero Banner */}
        <section className="relative">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            effect="fade" // Use fade effect
            modules={[Pagination, Autoplay]} // Remove Navigation module
            className="custom-swiper"
          >
            {[banner1, banner2, banner3].map((banner, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-[560px] w-full overflow-hidden">
                  <img
                    src={banner}
                    alt={`Slide ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#2A3B69]/60 flex items-center justify-center">
                    <div className="text-center text-white max-w-2xl px-4">
                      <h1 className="mb-4 text-4xl font-bold md:text-5xl animate__animated animate__fadeInDown">
                        Unlock Your Academic Potential
                      </h1>
                      <p className="mb-8 text-lg md:text-xl">
                        Find and apply for scholarships that match your dreams
                      </p>
                      <Link to="/allscholarship">
                        <button className="rounded-lg bg-[#FF6B4A] px-8 py-3 font-semibold text-white transition-all hover:scale-105">
                          Explore Scholarships
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Top Scholarships Section */}
        <TopScholarships />

        {/* Achievements Section */}
        <section
          className="relative min-h-max bg-cover bg-center px-6 py-12"
          style={{ backgroundImage: `url(${counterBack})` }}
        >
          {/* Color overlay */}
          <div className="absolute inset-0 bg-[#2A3B69]/60 z-0"></div>{" "}
          {/* Navy Blue overlay with 60% opacity */}
          <div className="relative z-10 text-center">
            <h2 className="mb-12 text-3xl font-bold text-white md:text-4xl">
              Transforming Educational Journeys
            </h2>
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 gap-8 md:grid-cols-4">
              {[
                {
                  value: 200,
                  label: "Successful Applications",
                  color: "#34B78F",
                },
                { value: 100, label: "Scholarship Programs", color: "#FF6B4A" },
                { value: 50, label: "Partner Universities", color: "#2A3B69" },
                { value: 500, label: "Happy Students", color: "#34B78F" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-white/90 p-6 backdrop-blur-sm"
                >
                  <h3
                    className="text-4xl font-bold md:text-5xl"
                    style={{ color: item.color }}
                  >
                    <CountUp end={item.value} duration={3} />+
                  </h3>
                  <p className="mt-2 text-gray-700">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className=" bg-[#F5F7FA] py-20 px-6 md:px-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-bold text-[#2A3B69] md:text-5xl">
                Transformative Experiences
              </h2>
              <p className="mt-4 text-lg text-[#2A3B69]/80">
                Hear from students who unlocked their academic potential
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  name: "Maria Gonzalez",
                  text: "Found my dream scholarship through this platform!",
                  img: "https://i.pravatar.cc/150?img=51",
                  university: "Stanford University",
                },
                {
                  name: "James Smith",
                  text: "Simplified application process saved me hours!",
                  img: "https://i.pravatar.cc/150?img=12",
                  university: "MIT",
                },
                {
                  name: "Sarah Lee",
                  text: "Secured a full-ride scholarship effortlessly!",
                  img: "https://i.pravatar.cc/150?img=56",
                  university: "Harvard University",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <div className="absolute -top-4 -right-4 h-16 w-16 rotate-45 bg-[#34B78F]/10" />

                  <div className="mb-6 flex items-center">
                    <div className="relative mr-4">
                      <img
                        src={testimonial.img}
                        alt={testimonial.name}
                        className="h-14 w-14 rounded-full border-2 border-[#34B78F] object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-[#FF6B4A] flex items-center justify-center">
                        <svg
                          className="h-4 w-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#2A3B69]">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-[#34B78F]">
                        {testimonial.university}
                      </p>
                    </div>
                  </div>

                  <div className="relative pl-8">
                    <svg
                      className="absolute left-0 top-0 h-6 w-6 text-[#FF6B4A]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M10 7L8 11H11V17H5V11L7 7H10M18 7L16 11H19V17H13V11L15 7H18Z" />
                    </svg>
                    <p className="text-lg leading-relaxed text-[#2A3B69]/90">
                      {testimonial.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button className="rounded-full bg-[#2A3B69] px-8 py-3 font-semibold text-white transition-all hover:bg-[#34B78F] hover:shadow-lg">
                View More Success Stories
              </button>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        {/* Trusted By Leading Institutions Section */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-12 text-center text-3xl font-bold text-[#2A3B69] md:text-4xl">
              Trusted By Leading Institutions
            </h2>
            <div className="flex flex-wrap justify-center gap-12 opacity-75">
              {/* Real University Logos */}
              <img
                src="https://logos-world.net/wp-content/uploads/2020/12/Harvard-Symbol.png" // Harvard Logo
                alt="Harvard University"
                className="h-16 grayscale transition-all hover:grayscale-0"
              />
              <img
                src="https://logos-world.net/wp-content/uploads/2022/11/Stanford-Cardinal-Logo.png" // Stanford Logo
                alt="Stanford University"
                className="h-16 grayscale transition-all hover:grayscale-0"
              />
              <img
                src="https://logos-world.net/wp-content/uploads/2024/08/Drexel-University-Logo.png" // Cambridge Logo
                alt="Drexel University"
                className="h-16 grayscale transition-all hover:grayscale-0"
              />
              <img
                src="https://logos-world.net/wp-content/uploads/2022/11/Brown-University-Logo.png" // Columbia University Logo
                alt="Brown University"
                className="h-16 grayscale transition-all hover:grayscale-0"
              />
              <img
                src="https://logos-world.net/wp-content/uploads/2023/08/Macquarie-University-Logo.png" // MIT Logo
                alt="Macquarie university"
                className="h-16 grayscale transition-all hover:grayscale-0"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className=" bg-[#FF6B4A] py-16">
          <div className="mx-auto max-w-4xl text-center text-white">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Ready to Begin Your Journey?
            </h2>
            <p className="mb-8 text-lg md:text-xl">
              Start your scholarship application in less than 5 minutes
            </p>
            <div className="flex justify-center gap-4">
              <button className="rounded-lg bg-[#2A3B69] hover:bg-[#34B78F] px-8 py-3 font-semibold transition-all hover:scale-105">
                Get Started
              </button>
              <button className="rounded-lg border-2 border-white bg-transparent px-8 py-3 font-semibold hover:bg-white/20">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
