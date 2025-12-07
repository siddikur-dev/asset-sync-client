import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaArrowRight, FaEnvelope, FaPhone } from "react-icons/fa";

const ContactCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-500 to-teal-400 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of companies already using AssetVerse to manage their assets efficiently
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/signup?role=hr">
              <button className="btn bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-lg shadow-lg">
                Start Free Trial <FaArrowRight className="ml-2" />
              </button>
            </Link>
            <Link to="/signup">
              <button className="btn btn-outline border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-lg font-semibold rounded-lg">
                Join as Employee
              </button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-sm">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-2xl" />
              <span>info@assetverse.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="text-2xl" />
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;

