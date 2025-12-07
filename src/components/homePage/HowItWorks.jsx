import { motion } from "framer-motion";
import { FaUserPlus, FaBox, FaCheckCircle } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus className="text-4xl" />,
      title: "Register Your Company",
      description: "HR Managers register with company details and get started with a default package."
    },
    {
      icon: <FaBox className="text-4xl" />,
      title: "Add Your Assets",
      description: "Add all company assets to the inventory with details like type, quantity, and images."
    },
    {
      icon: <FaCheckCircle className="text-4xl" />,
      title: "Manage & Track",
      description: "Employees request assets, HR approves, and everything is tracked automatically."
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
            Get started in three simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="text-center relative"
            >
              <div className="bg-gradient-to-br from-blue-500 to-teal-400 w-20 h-20 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
                {step.icon}
              </div>
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 -z-10">
                <div className="text-6xl font-bold text-base-200">{index + 1}</div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-base-content/70">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

