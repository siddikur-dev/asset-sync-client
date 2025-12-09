import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import {
  FaRocket,
  FaShieldAlt,
  FaChartLine,
  FaCogs,
  FaUsers,
  FaBoxOpen,
  FaHandshake
} from 'react-icons/fa';

const Banner = () => {
  // Animated icon variants for unique, smooth movement
  const iconVariants = {
    float: {
      animate: { y: [0, -15, 0] },
      transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' }
    },
    floatDelayed: {
      animate: { y: [0, -10, 0] },
      transition: { repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.5 }
    },
    rotate: {
      animate: { rotate: [0, 5, -5, 0] },
      transition: { repeat: Infinity, duration: 5, ease: 'easeInOut' }
    },
    scale: {
      animate: { scale: [1, 1.1, 1] },
      transition: { repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.3 }
    }
  };

  // Feature cards data
  const features = [
    {
      icon: FaBoxOpen,
      title: "Smart Tracking",
      description: "Real-time asset monitoring with QR codes and RFID",
      color: "text-blue-400"
    },
    {
      icon: FaUsers,
      title: "Team Collaboration",
      description: "Seamless coordination between departments",
      color: "text-green-400"
    },
    {
      icon: FaShieldAlt,
      title: "Enterprise Security",
      description: "Bank-level encryption and access controls",
      color: "text-purple-400"
    },
    {
      icon: FaChartLine,
      title: "Advanced Analytics",
      description: "AI-powered insights and predictive maintenance",
      color: "text-orange-400"
    }
  ];

  return (
    <section className="relative w-full overflow-hidden">
      {/* Hero Section with Custom CSS Banner Design */}
      <div className="relative w-full min-h-[90vh] flex items-center justify-center">
        {/* Custom CSS Background Design */}
        <div className="absolute inset-0 z-0">
          {/* Base gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900"></div>
          
          {/* Animated geometric shapes */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
          </div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
          
          {/* Floating particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-50"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${10 + Math.random() * 20}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>
        </div>

        {/* Floating Animated Icons */}
        <motion.div
          className="hidden lg:block absolute top-20 left-10 z-10"
          variants={iconVariants.float}
          animate="animate"
        >
          <FaRocket className="text-4xl text-blue-400 opacity-70" />
        </motion.div>
        <motion.div
          className="hidden lg:block absolute top-32 right-16 z-10"
          variants={iconVariants.floatDelayed}
          animate="animate"
        >
          <FaCogs className="text-4xl text-green-400 opacity-70" />
        </motion.div>
        <motion.div
          className="hidden lg:block absolute bottom-20 left-20 z-10"
          variants={iconVariants.rotate}
          animate="animate"
        >
          <FaShieldAlt className="text-4xl text-purple-400 opacity-70" />
        </motion.div>
        <motion.div
          className="hidden lg:block absolute bottom-32 right-10 z-10"
          variants={iconVariants.scale}
          animate="animate"
        >
          <FaChartLine className="text-4xl text-orange-400 opacity-70" />
        </motion.div>

        {/* Main Content */}
        <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">AssetVerse</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Smart Asset Management
              </span>
            </h1>
            
            <motion.p
              className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Revolutionize your asset management with our comprehensive platform.
              Track, manage, and optimize company resources with real-time insights
              and seamless collaboration tools.
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Link to="/signup?role=employee">
              <button className="group relative overflow-hidden btn bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-base hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <span className="relative z-10 flex items-center gap-2">
                  <FaUsers />
                  Get Started
                </span>
              </button>
            </Link>
            <Link to="/signup?role=hr_manager">
              <button className="group btn bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
                <FaHandshake className="mr-2" />
                For HR Teams
              </button>
            </Link>
          </motion.div>

          {/* Feature Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-2xl"
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className={`${feature.color} text-3xl mb-4`}>
                  <feature.icon />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-white/80 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Custom styles for the banner */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-20px) translateX(10px);
          }
          66% {
            transform: translateY(10px) translateX(-10px);
          }
        }
      `}</style>
    </section>
  );
};

export default Banner;