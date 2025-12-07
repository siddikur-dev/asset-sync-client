import { motion } from "framer-motion";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How does AssetVerse help prevent asset loss?",
      answer: "AssetVerse tracks every asset from inventory to assignment to return, providing complete visibility and accountability. HR can see which employee has which asset at any time."
    },
    {
      question: "Can employees work with multiple companies?",
      answer: "Yes! Employees can be affiliated with multiple companies simultaneously. Each company manages their own assets independently."
    },
    {
      question: "What happens when an HR reaches their package limit?",
      answer: "When an HR reaches their employee limit, they'll need to upgrade their package. The system prevents approving new requests until the package is upgraded via Stripe payment."
    },
    {
      question: "Can employees return assets?",
      answer: "Yes, employees can return returnable assets. Non-returnable assets (like consumables) cannot be returned. The system automatically updates inventory when assets are returned."
    },
    {
      question: "How do I upgrade my package?",
      answer: "HR managers can upgrade their package from the dashboard. Simply select a new package, complete the Stripe payment, and your employee limit is updated immediately."
    }
  ];

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
          <p className="text-lg text-base-content/70">
            Everything you need to know about AssetVerse
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
              className="bg-base-100 rounded-xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-base-200 transition-colors"
              >
                <span className="font-semibold text-left">{faq.question}</span>
                {openIndex === index ? (
                  <FaChevronUp className="text-primary flex-shrink-0" />
                ) : (
                  <FaChevronDown className="text-primary flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-base-content/70">
                  {faq.answer}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

