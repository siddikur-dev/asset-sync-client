import { motion } from "framer-motion";
import { FaShieldAlt, FaClock, FaChartBar, FaUsers } from "react-icons/fa";

const AboutSection = () => {
  const benefits = [
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: "Prevents Asset Loss",
      description: "Track every asset and improve accountability across your organization."
    },
    {
      icon: <FaClock className="text-4xl" />,
      title: "Streamlines Processes",
      description: "Simplify asset assignment and return processes with automated workflows."
    },
    {
      icon: <FaChartBar className="text-4xl" />,
      title: "Clear Visibility",
      description: "Get complete visibility into your company's asset inventory in real-time."
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: "Reduces Overhead",
      description: "Minimize administrative overhead for HR departments with automated tracking."
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
            <span className="text-gradient">Why Choose AssetVerse?</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Comprehensive asset management solution designed for modern businesses
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
              className="bg-base-200 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="text-primary mb-4 flex justify-center">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-base-content/70">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

