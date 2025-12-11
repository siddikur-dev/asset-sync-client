import { motion } from "framer-motion";
import { FaPlus, FaCheckCircle, FaRocket } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaPlus className="text-3xl" />,
      title: "Add Your Assets",
      description: "Upload or scan your assets into our system. Import from spreadsheets, add manually, or use our mobile app for quick entry."
    },
    {
      icon: <FaCheckCircle className="text-3xl" />,
      title: "Track & Manage",
      description: "Monitor your assets in real-time, assign to employees, set maintenance schedules, and receive automated alerts."
    },
    {
      icon: <FaRocket className="text-3xl" />,
      title: "Optimize & Grow",
      description: "Analyze usage patterns, reduce costs, and scale your operations with data-driven insights."
    }
  ];

  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">How It Works</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Get started with Asset Sync in three simple steps
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary/20 transform -translate-y-1/2"></div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="relative"
              >
                {/* Step Number Circle */}
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white shadow-lg">
                      {step.icon}
                    </div>
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-base-100 px-3 py-1 rounded-full shadow-md border-2 border-primary">
                      <span className="text-sm font-bold text-primary">Step {index + 1}</span>
                    </div>
                  </div>
                </div>

                {/* Step Content */}
                <div className="bg-base-200 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 text-center hover-lift border border-base-300">
                  <h3 className="text-xl font-semibold mb-4 text-base-content">{step.title}</h3>
                  <p className="text-base-content/70 leading-relaxed">{step.description}</p>
                </div>

                {/* Connection Line for Mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <div className="w-0.5 h-8 bg-primary/20"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary to-secondary p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Asset Management?</h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of companies that have already streamlined their operations with Asset Sync
            </p>
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
              Get Started Today
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
