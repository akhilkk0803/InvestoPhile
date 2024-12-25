import React from "react";
import { useNavigate, NavLink } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-gray-800 to-teal-700">
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-teal-600 to-teal-800 shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="text-3xl font-bold text-teal-100 tracking-wide">Inverstophile</div>

          {/* Navigation Links */}
          <div className="space-x-6 hidden md:flex">
            <a href="#home" className="text-teal-100 text-lg font-medium hover:text-teal-300 transition">
              Home
            </a>
            <a href="#about" className="text-teal-100 text-lg font-medium hover:text-teal-300 transition">
              About
            </a>
            <a href="#features" className="text-teal-100 text-lg font-medium hover:text-teal-300 transition">
              Features
            </a>
            <a href="#contact" className="text-teal-100 text-lg font-medium hover:text-teal-300 transition">
              Contact
            </a>
          </div>

          {/* Authentication Buttons */}
          <div className="space-x-4">
            <NavLink to="/signup">
              <button className="bg-teal-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-600 transition">
                Sign Up
              </button>
            </NavLink>
            <NavLink to="/login">
              <button className="bg-gray-700 text-teal-100 px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition">
                Login
              </button>
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-br from-teal-800 to-black py-20">
        <div className="container mx-auto px-6 text-center md:text-left">
          <div className="md:flex items-center justify-between">
            {/* Left Content */}
            <div className="md:w-1/2">
              <h1 className="text-5xl md:text-6xl font-extrabold text-teal-100 mb-6">
                Unlock Your Financial Potential
              </h1>
              <p className="text-lg text-teal-200 mb-6">
                Take charge of your investments with our platform. Discover new opportunities
                across diverse asset classes and achieve financial freedom.
              </p>
              <NavLink to="/signup">
                <button className="bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition">
                  Get Started
                </button>
              </NavLink>
            </div>

            {/* Right Content */}
            <div className="md:w-1/3 mt-8 md:mt-0">
              <img
                src="https://miro.medium.com/v2/resize:fit:1400/0*Bxdcb6mds-EkgOLJ.jpg" // Replace this URL with the actual image for investment illustration
                alt="Investment Illustration"
                className="rounded-lg shadow-lg border-4 border-teal-500"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gradient-to-br from-black to-teal-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-teal-100 mb-8">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-teal-700 shadow-lg rounded-lg p-6 hover:shadow-xl transition">
              <img
                src="https://via.placeholder.com/80" // Replace with actual image for Diversification
                alt="Diversification"
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-teal-100">Diversification</h3>
              <p className="text-teal-200">
                Maximize your returns with a balanced portfolio across multiple asset
                classes.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-teal-700 shadow-lg rounded-lg p-6 hover:shadow-xl transition">
              <img
                src="https://via.placeholder.com/80" // Replace with actual image for Risk Assessment
                alt="Risk Assessment"
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-teal-100">Risk Assessment</h3>
              <p className="text-teal-200">
                Tailored strategies based on your goals and risk tolerance to ensure
                smarter decisions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-teal-700 shadow-lg rounded-lg p-6 hover:shadow-xl transition">
              <img
                src="https://via.placeholder.com/80" // Replace with actual image for Goal Tracking
                alt="Goal Tracking"
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-teal-100">Goal Tracking</h3>
              <p className="text-teal-200">
                Stay on track with intuitive tools to measure your financial progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-teal-800 to-black text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-teal-200 font-medium">
            &copy; 2024 Inverstophile. Your trusted partner in wealth creation.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
