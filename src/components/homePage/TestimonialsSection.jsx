import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const AnimatedCounter = ({ end, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      let startTime = null;
      const animateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [isVisible, end, duration]);

  return (
    <span ref={countRef}>
      {count}{suffix}
    </span>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechCorp Solutions",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c1ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      testimonial: "Asset Sync has transformed how we manage our equipment. The real-time tracking feature alone has saved us thousands in lost assets."
    },
    {
      name: "Michael Chen",
      company: "Global Manufacturing",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      testimonial: "The analytics dashboard provides incredible insights into our asset utilization. We've optimized our inventory by 40% since implementing Asset Sync."
    },
    {
      name: "Emily Rodriguez",
      company: "Innovation Labs",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      testimonial: "Best investment we've made for our IT department. The mobile app makes it easy for our team to track assets from anywhere."
    }
  ];

  const stats = [
    { value: 100, suffix: "+", label: "Companies Trust Us" },
    { value: 50, suffix: "K+", label: "Assets Managed" },
    { value: 99.9, suffix: "%", label: "Uptime" }
  ];

  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Trusted by Industry Leaders</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto mb-12">
            Join hundreds of companies that have transformed their asset management
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-lg text-base-content/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-gradient">What Our Clients Say</span>
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="bg-base-100 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover-lift border border-base-300"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-primary/20"
                  />
                  <div>
                    <h4 className="font-semibold text-base-content">{testimonial.name}</h4>
                    <p className="text-sm text-base-content/70">{testimonial.company}</p>
                  </div>
                </div>
                
                <div className="relative">
                  <FaQuoteLeft className="text-primary/20 text-2xl absolute -top-2 -left-2" />
                  <p className="text-base-content/80 leading-relaxed pl-6 italic">
                    {testimonial.testimonial}
                  </p>
                </div>

                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
