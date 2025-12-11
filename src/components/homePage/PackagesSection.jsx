import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { FaCheck, FaArrowRight, FaStar } from "react-icons/fa";
import { Link } from "react-router";

const PackagesSection = () => {
  const axiosInstance = useAxios();
  
  // Default package data as specified in requirements
  const defaultPackages = [
    {
      name: "Basic",
      employeeLimit: 5,
      price: 5,
      features: ["Asset Tracking", "Employee Management", "Basic Support"],
      popular: false
    },
    {
      name: "Standard",
      employeeLimit: 10,
      price: 8,
      features: ["All Basic features", "Advanced Analytics", "Priority Support"],
      popular: true
    },
    {
      name: "Premium",
      employeeLimit: 20,
      price: 15,
      features: ["All Standard features", "Custom Branding", "24/7 Support"],
      popular: false
    }
  ];
  
  const { data: packages = defaultPackages, isLoading } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get('/packages');
        return res.data;
      } catch {
        // Return default packages if API fails
        return defaultPackages;
      }
    },
    // Use default data as initial fallback
    initialData: defaultPackages
  });

  if (isLoading && !packages) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <div className="loading loading-spinner loading-lg"></div>
          </div>
        </div>
      </section>
    );
  }

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
              className={`bg-base-200 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 relative hover-lift border border-base-300 ${
                pkg.popular ? 'border-2 border-primary transform scale-105' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <FaStar className="text-xs" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-base-content">{pkg.name}</h3>
                <div className="text-4xl font-bold text-primary mb-2">
                  ${pkg.price}
                  <span className="text-lg text-base-content/70">/month</span>
                </div>
                <p className="text-base-content/70">Up to {pkg.employeeLimit} employees</p>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features?.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <FaCheck className="text-primary flex-shrink-0" />
                    <span className="text-base-content">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/dashboard/upgrade-package">
                <button className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  pkg.popular
                    ? 'btn-gradient text-white shadow-lg hover:shadow-xl'
                    : 'bg-base-300 text-base-content hover:bg-base-400 border border-base-400'
                }`}>
                  Get Started
                  <FaArrowRight className="text-sm" />
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
