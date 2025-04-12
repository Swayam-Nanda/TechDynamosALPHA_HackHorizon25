import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Chatbot from "../components/Chatbot/Chatbot";

function Home() {
  const galleryImages = [
    "/assets/1.jpg",
    "/assets/2.jpg",
    "/assets/3.jpg",
    "/assets/4.jpg",
    "/assets/5.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-8 py-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Title */}
        <h1 className="text-4xl font-bold text-emerald-400 text-center">
          Virtual Police Station
        </h1>

        {/* Top Section: Left and Right Panels */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Panel */}
          <div className="flex flex-col justify-between gap-6 w-full md:w-1/2 bg-gray-800/50 p-6 rounded-2xl shadow-lg min-h-[300px]">
            <Link
              to="/file-fir"
              className="bg-blue-600 hover:bg-blue-700 py-3 w-full text-center rounded-xl text-lg font-medium transition-all shadow-md"
            >
              📄 File FIR
            </Link>
            <Link
              to="/track-fir"
              className="bg-green-600 hover:bg-green-700 py-3 w-full text-center rounded-xl text-lg font-medium transition-all shadow-md"
            >
              🔍 Track FIR
            </Link>
            <Link
              to="/emergency"
              className="bg-red-600 hover:bg-red-700 py-3 w-full text-center rounded-xl text-lg font-medium transition-all shadow-md"
            >
              🚨 Emergency SOS
            </Link>
          </div>

          {/* Right Panel */}
          <div className="flex flex-col justify-between gap-6 w-full md:w-1/2 bg-gray-800/50 p-6 rounded-2xl shadow-lg min-h-[300px]">
            <div className="bg-gray-900/80 p-4 rounded-xl text-right w-full">
              <h2 className="text-2xl font-semibold text-emerald-300 mb-1">
                ✅ Cases Solved
              </h2>
              <p className="text-3xl font-bold">132</p>
            </div>
            <div className="bg-gray-900/80 p-4 rounded-xl text-right w-full">
              <h2 className="text-2xl font-semibold text-yellow-400 mb-1">
                ⏳ Cases Pending
              </h2>
              <p className="text-3xl font-bold">27</p>
            </div>
          </div>
        </div>

        {/* Carousel Gallery */}
        <div className="bg-gray-800/40 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">
            📸 Gallery
          </h2>
          <Slider {...settings}>
            {galleryImages.map((src, index) => (
              <div key={index} className="px-3">
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="h-64 w-full object-cover rounded-xl shadow-md"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <Chatbot />
    </div>
  );
}

export default Home;
