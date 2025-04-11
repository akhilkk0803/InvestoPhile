import React from "react";
import { useNavigate, NavLink } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-gray-900 to-teal-800 text-white">
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-teal-600 to-teal-800 shadow-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="text-3xl font-extrabold text-white tracking-wide">
            Inverstophile
          </div>

          {/* Navigation Links */}
          <div className="space-x-6 hidden md:flex">
            {["Home", "About", "Features", "Contact"].map((text) => (
              <a
                key={text}
                href={`#${text.toLowerCase()}`}
                className="text-teal-100 text-lg font-medium hover:text-teal-300 transition duration-200"
              >
                {text}
              </a>
            ))}
          </div>

          {/* Authentication Buttons */}
          <div className="space-x-4">
            <NavLink to="/signup">
              <button className="bg-teal-500 px-4 py-2 rounded-lg font-semibold hover:bg-teal-600 shadow hover:shadow-md transition duration-200">
                Sign Up
              </button>
            </NavLink>
            <NavLink to="/login">
              <button className="bg-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 shadow hover:shadow-md transition duration-200">
                Login
              </button>
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-20 bg-gradient-to-br from-teal-800 to-black">
        <div className="container mx-auto px-6 text-center md:text-left">
          <div className="md:flex items-center justify-between">
            {/* Left Content */}
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-5xl md:text-6xl font-extrabold text-teal-100 leading-tight">
                Unlock Your Financial Potential
              </h1>
              <p className="text-lg text-teal-300">
                Take charge of your investments with our platform. Discover new
                opportunities across diverse asset classes and achieve financial
                freedom.
              </p>
              <NavLink to="/signup">
                <button className="bg-teal-500 px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 shadow-lg hover:shadow-xl transition duration-300">
                  Get Started
                </button>
              </NavLink>
            </div>

            {/* Right Content */}
            <div className="md:w-1/3 mt-10 md:mt-0">
              <img
                src="https://miro.medium.com/v2/resize:fit:1400/0*Bxdcb6mds-EkgOLJ.jpg"
                alt="Investment Illustration"
                className="rounded-xl shadow-xl border-4 border-teal-500 w-full max-w-md h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 bg-gradient-to-br from-black to-teal-800"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-teal-100 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-teal-300 text-md mb-12 max-w-2xl mx-auto">
            Explore features that empower your financial journey.
          </p>
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {[
              {
                title: "Diversification",
                description:
                  "Maximize your returns with a balanced portfolio across multiple asset classes.",
                img: "https://www.datocms-assets.com/76408/1690452201-diversification-1.png",
              },
              {
                title: "Risk Assessment",
                description:
                  "Tailored strategies based on your goals and risk tolerance to ensure smarter decisions.",
                img: "https://eu-images.contentstack.com/v3/assets/blt07f68461ccd75245/blt77e60dbae0b45f57/6618064bf1336dcd3a2b41ea/GettyImages-1343006928-1401x788-49696df.jpeg",
              },
              {
                title: "Goal Tracking",
                description:
                  "Stay on track with intuitive tools to measure your financial progress.",
                img: "https://agencyanalytics.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fdfcvkz6j859j%2F473RYZBe7hSHzxTWNGH4Dk%2F818e3d7833e56e2363e39849a3fb8774%2FSTREAM-goals-alternative-to-SMART-goals.png&w=2048&q=75",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-teal-700 rounded-xl p-6 shadow-lg hover:shadow-2xl transition duration-300 flex flex-col justify-between h-full transform hover:-translate-y-1"
              >
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="mx-auto mb-4 w-full h-40 object-cover rounded-md"
                />
                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-teal-200 mt-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-10 border-t border-teal-600">
        <div className="container mx-auto text-center">
          <p className="text-teal-300 font-medium">
            &copy; 2024 Inverstophile. Your trusted partner in wealth creation.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
