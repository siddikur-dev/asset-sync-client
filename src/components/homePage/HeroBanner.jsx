import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  FaArrowRight,
  FaBox,
  FaUsers,
  FaChartLine,
  FaShieldAlt,
} from "react-icons/fa";

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      title: "Streamline Your Asset Management",
      subtitle: "Complete digital solution for modern businesses",
      description:
        "Track, manage, and optimize your company's assets with our comprehensive platform designed for efficiency and growth.",
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Real-Time Asset Tracking",
      subtitle: "Know where your assets are, always",
      description:
        "Monitor your equipment, tools, and resources in real-time with advanced tracking and reporting capabilities.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Scale Your Business Confidently",
      subtitle: "Grow without the complexity",
      description:
        "Our platform scales with your business, from startups to enterprises, ensuring seamless asset management at every stage.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-animated"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left text-white"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              <span className="block">{slides[currentSlide].title}</span>
              <span className="text-xl md:text-2xl lg:text-3xl block mt-2 text-blue-200">
                {slides[currentSlide].subtitle}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed"
            >
              {slides[currentSlide].description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/signup?role=hr">
                <button className="btn-gradient text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 transform hover:scale-105">
                  Get Started as HR
                  <FaArrowRight />
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-transparent border-2 border-white text-white px-8 py-4 text-lg font-semibold rounded-lg hover:bg-white hover:text-primary transition-all duration-300">
                  Join as Employee
                </button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-3 gap-6 mt-12"
            >
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white">100+</div>
                <div className="text-sm text-white/80">Companies</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-sm text-white/80">Assets Managed</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white">99.9%</div>
                <div className="text-sm text-white/80">Uptime</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20"
              >
                <FaBox className="text-4xl text-blue-300 mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-white">
                  Asset Tracking
                </h3>
                <p className="text-sm text-white/80">
                  Track all company assets
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20 mt-8"
              >
                <FaUsers className="text-4xl text-blue-300 mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-white">
                  Employee Management
                </h3>
                <p className="text-sm text-white/80">Manage your team</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20"
              >
                <FaChartLine className="text-4xl text-blue-300 mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-white">
                  Analytics
                </h3>
                <p className="text-sm text-white/80">Get insights</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-primary/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20"
              >
                <FaShieldAlt className="text-4xl text-white mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-white">
                  Secure Platform
                </h3>
                <p className="text-sm text-white/90">Enterprise security</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
