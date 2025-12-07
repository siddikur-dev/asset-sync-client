import { motion } from "framer-motion";
import { FaBox, FaUserCheck, FaChartLine, FaMobileAlt, FaBell, FaLock } from "react-icons/fa";

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaBox className="text-4xl" />,
      title: "Asset Tracking",
      description: "Track all your company assets from inventory to assignment to return."
    },
    {
      icon: <FaUserCheck className="text-4xl" />,
      title: "Employee Management",
      description: "Efficiently manage employees and their asset assignments."
    },
    {
      icon: <FaChartLine className="text-4xl" />,
      title: "Advanced Analytics",
      description: "Get insights into asset usage, requests, and distribution."
    },
    {
      icon: <FaMobileAlt className="text-4xl" />,
      title: "Responsive Design",
      description: "Access your asset management system from any device, anywhere."
    },
    {
      icon: <FaBell className="text-4xl" />,
      title: "Real-time Notifications",
      description: "Stay updated with instant notifications for requests and approvals."
    },
    {
      icon: <FaLock className="text-4xl" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security to protect your company data."
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
            <span className="text-gradient">Key Features</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Everything you need to manage your assets effectively
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="bg-base-200 p-6 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-base-content/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

