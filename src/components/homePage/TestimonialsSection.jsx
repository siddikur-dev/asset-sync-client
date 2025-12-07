import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "HR Manager, TechCorp",
      content: "AssetVerse has transformed how we manage our company assets. The system is intuitive and saves us hours every week.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Operations Director, InnovateCo",
      content: "The analytics feature gives us incredible insights into asset usage. Highly recommend for any growing company.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "HR Lead, StartupHub",
      content: "Easy to use, reliable, and the support team is fantastic. Our asset tracking has never been better.",
      rating: 5
    }
  ];

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
            <span className="text-gradient">What Our Clients Say</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Trusted by 100+ companies worldwide
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="bg-base-100 p-8 rounded-2xl shadow-lg"
            >
              <FaQuoteLeft className="text-4xl text-primary mb-4" />
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-base-content/70 mb-6 italic">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-base-content/70">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

