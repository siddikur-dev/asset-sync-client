import { motion } from "framer-motion";
import { 
  FaSearch, 
  FaCloud, 
  FaUsers, 
  FaChartBar, 
  FaMobileAlt, 
  FaCogs 
} from "react-icons/fa";

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaSearch className="text-3xl" />,
      title: "Real-time Tracking",
      description: "Monitor your assets instantly with our advanced GPS and RFID tracking technology."
    },
    {
      icon: <FaCloud className="text-3xl" />,
      title: "Cloud Storage",
      description: "Secure cloud-based storage with automatic backups and 99.9% uptime guarantee."
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: "Team Collaboration",
      description: "Enable seamless collaboration between departments with role-based access control."
    },
    {
      icon: <FaChartBar className="text-3xl" />,
      title: "Analytics Dashboard",
      description: "Get comprehensive insights with customizable reports and data visualization."
    },
    {
      icon: <FaMobileAlt className="text-3xl" />,
      title: "Mobile App",
      description: "Manage assets on-the-go with our intuitive mobile application for iOS and Android."
    },
    {
      icon: <FaCogs className="text-3xl" />,
      title: "API Integration",
      description: "Integrate with your existing systems through our comprehensive REST API."
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
            <span className="text-blue-600">Powerful Features</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage your assets efficiently in one platform
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
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center hover:-translate-y-1 group"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-600 transition-colors duration-300">
                <span className="text-blue-600 group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
