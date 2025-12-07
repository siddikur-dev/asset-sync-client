import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaArrowRight, FaBox, FaUsers, FaChartLine } from "react-icons/fa";

const HeroBanner = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              <span className="text-gradient">AssetVerse</span>
              <br />
              <span className="text-base-content">Corporate Asset Management</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-base-content/70 mb-8 leading-relaxed"
            >
              Comprehensive digital platform that helps companies efficiently manage their physical assets and track which employee has which equipment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/signup?role=hr">
                <button className="btn btn-gradient text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                  Get Started as HR
                  <FaArrowRight />
                </button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-outline border-2 border-primary text-primary px-8 py-3 text-lg font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-300">
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
                <div className="text-3xl font-bold text-gradient">100+</div>
                <div className="text-sm text-base-content/70">Companies</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-gradient">5000+</div>
                <div className="text-sm text-base-content/70">Assets Tracked</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-gradient">24/7</div>
                <div className="text-sm text-base-content/70">Support</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-base-300"
              >
                <FaBox className="text-4xl text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">Asset Tracking</h3>
                <p className="text-sm text-base-content/70">Track all company assets</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-base-300 mt-8"
              >
                <FaUsers className="text-4xl text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">Employee Management</h3>
                <p className="text-sm text-base-content/70">Manage your team</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-base-300"
              >
                <FaChartLine className="text-4xl text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">Analytics</h3>
                <p className="text-sm text-base-content/70">Get insights</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-500 to-teal-400 p-6 rounded-2xl shadow-lg text-white"
              >
                <FaBox className="text-4xl mb-4" />
                <h3 className="font-semibold text-lg mb-2">Easy Management</h3>
                <p className="text-sm">Streamlined process</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;

