import { motion } from "framer-motion";
import { FaClock, FaCheckCircle, FaChartLine, FaDollarSign } from "react-icons/fa";

const AboutSection = () => {
  const benefits = [
    {
      icon: <FaClock className="text-4xl" />,
      title: "Time Saving",
      description: "Automate asset tracking and reduce administrative overhead by up to 70%, allowing your team to focus on core business activities."
    },
    {
      icon: <FaCheckCircle className="text-4xl" />,
      title: "Accuracy",
      description: "Eliminate human error with real-time tracking and automated reporting, ensuring 99.9% accuracy in asset management."
    },
    {
      icon: <FaChartLine className="text-4xl" />,
      title: "Scalability",
      description: "Grow from 10 to 10,000+ assets seamlessly with our cloud-based infrastructure that scales with your business."
    },
    {
      icon: <FaDollarSign className="text-4xl" />,
      title: "Cost-Effective",
      description: "Reduce asset-related costs by 40% through optimized utilization, loss prevention, and predictive maintenance."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-blue-600">Why Choose AssetVerse?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Corporate-friendly asset management solution designed for modern businesses
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center hover:-translate-y-1"
            >
              <div className="text-blue-600 mb-4 flex justify-center">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
