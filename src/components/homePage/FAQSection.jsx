import { motion } from "framer-motion";
import { useState } from "react";
import { FaQuestionCircle, FaChevronDown } from "react-icons/fa";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How secure is my data on Asset Sync?",
      answer: "We use enterprise-grade 256-bit encryption for all data transfers and storage. Your data is hosted on secure AWS servers with regular security audits, compliance with GDPR, and role-based access control to ensure only authorized personnel can access sensitive information."
    },
    {
      question: "Can I import my existing asset data?",
      answer: "Yes! Asset Sync supports bulk import from CSV, Excel, and XML files. You can also integrate with your existing ERP systems through our comprehensive REST API. Our migration team provides free assistance for enterprise customers."
    },
    {
      question: "What happens if I exceed my plan limits?",
      answer: "You'll receive notifications when approaching your limits. You can upgrade your plan anytime with prorated billing, or archive older assets to free up space. We never lose your data - it's always accessible when you upgrade."
    },
    {
      question: "Do you offer mobile apps?",
      answer: "Yes! Asset Sync offers native mobile apps for both iOS and Android. The mobile apps include barcode scanning, GPS tracking, offline mode, and push notifications for real-time updates."
    },
    {
      question: "How does the free trial work?",
      answer: "Start with a 14-day free trial with full access to all features. No credit card required. After the trial, choose the plan that fits your needs or contact our sales team for custom enterprise solutions."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Frequently Asked Questions</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Got questions? We've got answers
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-base-100 rounded-lg overflow-hidden border border-base-300 hover-lift"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-base-200 transition-colors duration-200 focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <FaQuestionCircle className="text-primary text-lg flex-shrink-0" />
                  <span className="font-semibold text-base-content">{faq.question}</span>
                </div>
                <FaChevronDown
                  className={`text-primary transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <motion.div
                initial={false}
                animate={openIndex === index ? "open" : "closed"}
                variants={{
                  open: { height: "auto", opacity: 1 },
                  closed: { height: 0, opacity: 0 }
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 text-base-content/70 leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary to-secondary p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-lg mb-6 opacity-90">
              Our support team is here to help you 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                Contact Support
              </button>
              <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all duration-300">
                View Documentation
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
