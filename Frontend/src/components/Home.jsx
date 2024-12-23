import React from "react";
import { useNavigate, NavLink } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">Inverstophile</div>
          <div className="space-x-6 hidden md:flex">
            <a href="#home" className="text-gray-700 hover:text-blue-600">
              Home
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600">
              About
            </a>
            <a href="#features" className="text-gray-700 hover:text-blue-600">
              Features
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600">
              Contact
            </a>
          </div>
          <div className="space-x-4">
            <NavLink to="/signup">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Sign Up
              </button>
            </NavLink>
            <NavLink to="/login">
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
                Login
              </button>
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-blue-100 py-20">
        <div className="container mx-auto px-6 text-center md:text-left">
          <div className="md:flex items-center justify-between">
            {/* Left Content */}
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Achieve Financial Freedom with Diversified Investments
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Your gateway to smart investing across asset classes like
                stocks, mutual funds, real estate, and more. Start today and
                secure your financial future!
              </p>
              <NavLink to="/signup">
                <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
                  Get Started
                </button>
              </NavLink>
            </div>

            {/* Right Content */}
            <div className="md:w-1/3 mt-8 md:mt-0">
              <img
                src="https://via.placeholder.com/400"
                alt="Investments"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <img
                src="https://via.placeholder.com/80"
                alt="Diversification"
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Diversification
              </h3>
              <p className="text-gray-600">
                Invest across stocks, mutual funds, real estate, and more for
                balanced growth.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <img
                src="https://via.placeholder.com/80"
                alt="Risk Assessment"
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Risk Assessment
              </h3>
              <p className="text-gray-600">
                Tailored investment strategies based on your risk tolerance.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <img
                src="https://via.placeholder.com/80"
                alt="Goal Tracking"
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Goal Tracking
              </h3>
              <p className="text-gray-600">
                Monitor your progress and achieve your financial milestones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            &copy; 2024 Inverstophile. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
