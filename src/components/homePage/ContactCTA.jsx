import { motion } from "framer-motion";
import { FaArrowRight, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router";

const ContactCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary to-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12">
            Join thousands of companies that have streamlined their asset management with Asset Sync
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <FaPhone className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Call Us</h3>
            <p className="text-white/80">+1 (555) 123-4567</p>
            <p className="text-white/60 text-sm">Mon-Fri 9AM-6PM EST</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <FaEnvelope className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Email Us</h3>
            <p className="text-white/80">support@Asset Sync.com</p>
            <p className="text-white/60 text-sm">24/7 Support</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <FaMapMarkerAlt className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Visit Us</h3>
            <p className="text-white/80">123 Business Ave</p>
            <p className="text-white/60 text-sm">New York, NY 10001</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Start Your Free Trial</h3>
            <p className="text-white/80 mb-6 max-w-md mx-auto">
              No credit card required. Full access to all features for 14 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center gap-2">
                  Start Free Trial
                  <FaArrowRight />
                </button>
              </Link>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all duration-300">
                Schedule Demo
              </button>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center items-center gap-8"
        >
          <div className="flex items-center gap-2 text-white/80">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-sm">SSL Secured</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-sm">GDPR Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-sm">ISO 27001 Certified</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;
