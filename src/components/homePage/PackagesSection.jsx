import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { FaCheck, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const PackagesSection = () => {
  const axiosInstance = useAxios();
  
  const { data: packages = [], isLoading } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const res = await axiosInstance.get('/packages');
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-base-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <div className="loading loading-spinner loading-lg"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Choose Your Package</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Flexible pricing plans to suit businesses of all sizes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg._id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className={`bg-base-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                pkg.name === 'Standard' ? 'border-2 border-primary scale-105' : ''
              }`}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="text-4xl font-bold text-gradient mb-2">
                  ${pkg.price}
                  <span className="text-lg text-base-content/70">/month</span>
                </div>
                <p className="text-base-content/70">Up to {pkg.employeeLimit} employees</p>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features?.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <FaCheck className="text-primary flex-shrink-0" />
                    <span className="text-base-content/70">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/signup?role=hr">
                <button className="w-full btn btn-gradient text-white">
                  Get Started <FaArrowRight className="ml-2" />
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;

