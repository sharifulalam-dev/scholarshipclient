import { Link } from "react-router-dom";
export default function About() {
  return (
    <div className="bg-[#578e78]">
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <img
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1920"
          alt="Students celebrating graduation"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#2A3B69]/90 flex items-center">
          <div className="mx-auto max-w-7xl px-6 text-center text-white">
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
              Empowering Dreams, Building Futures
            </h1>
            <p className="mx-auto max-w-2xl text-xl md:text-2xl">
              Bridging the gap between education and opportunity with
              transparent scholarship management.
            </p>
          </div>
        </div>
      </section>

      {/* Why I Exist Section */}
      <section className="bg-[#F0F4F8] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 md:flex md:items-center md:gap-12">
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=800"
              alt="Student studying"
              className="rounded-2xl shadow-xl"
            />
          </div>
          <div className="mt-12 md:mt-0 md:w-1/2">
            <h2 className="text-3xl font-bold text-[#2A3B69] md:text-4xl">
              Why We Exist
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              We understand that financial barriers can hinder students' access
              to education. Our platform bridges the gap by helping students
              find the perfect scholarship opportunities tailored to their goals
              and needs.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="bg-[#34B78F] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Our Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Smart Matching",
                description: "AI-powered scholarship recommendations.",
              },
              {
                title: "Wide Reach",
                description: "Access to thousands of global scholarships.",
              },
              {
                title: "Easy Application",
                description: "One-click application for multiple scholarships.",
              },
              {
                title: "Transparent Process",
                description:
                  "Clear and easy-to-understand application guidelines.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-[#2A3B69] rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* Stats Section */}
      <section className="py-20 bg-[#F5F7FA] text-[#2A3B69]">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Our Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                number: 15000,
                label: "Scholarships Offered",
                color: "#2A3B69",
              },
              {
                number: 85,
                label: "Success Rate",
                suffix: "%",
                color: "#2A3B69",
              },
              { number: 120, label: "Partner Countries", color: "#2A3B69" },
              {
                number: 4.9,
                label: "Student Rating",
                suffix: "/5",
                color: "#2A3B69",
              },
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <div
                  className="text-4xl font-bold mb-2"
                  style={{ color: stat.color }}
                >
                  {stat.number}
                  {stat.suffix}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-[#34B78F] py-20">
        <div className="mx-auto max-w-4xl text-center text-white px-6">
          <h2 className="text-3xl font-bold mb-6 md:text-4xl">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of students who found their perfect scholarship match
            and unlock new opportunities for your education!
          </p>
          <Link
            to="/allscholarship"
            className="rounded-lg bg-[#FF6B4A] px-8 py-4 text-lg font-semibold transition-all"
          >
            Start Your Journey Today
          </Link>
        </div>
      </section>
    </div>
  );
}
