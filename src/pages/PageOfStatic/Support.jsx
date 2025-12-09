import React, { useState } from 'react';
import SectionTitle from '../../components/shared/SectionTitle';
import { 
  FaHeadset, 
  FaEnvelopeOpenText, 
  FaPhoneAlt, 
  FaQuestionCircle, 
  FaChevronDown, 
  FaExternalLinkAlt, 
  FaComments, 
  FaDownload, 
  FaPaperPlane, 
  FaUser, 
  FaEnvelope, 
  FaRegFileAlt,
  FaCloudUploadAlt,
  FaSyncAlt,
  FaShieldAlt,
  FaClock,
  FaBook,
  FaVideo,
  FaTicketAlt,
  FaSearch,
  FaTools,
  FaUsers,
  FaLightbulb
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const Support = () => {
  const [openFAQIndex, setOpenFAQIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const faqs = [
    {
      question: "How do I sync my assets across multiple devices?",
      answer: "Simply install Asset Sync on all your devices, sign in with your account, and your assets will automatically synchronize. You can manage sync settings in your dashboard.",
      category: "Syncing"
    },
    {
      question: "What file types are supported for synchronization?",
      answer: "Asset Sync supports over 50 file types including documents, images, videos, audio files, and project files. Check our documentation for the complete list of supported formats.",
      category: "Features"
    },
    {
      question: "How secure is my data on Asset Sync?",
      answer: "We use enterprise-grade 256-bit encryption for all data transfers and storage. Your assets are protected with multiple security layers including two-factor authentication and regular security audits.",
      category: "Security"
    },
    {
      question: "Can I share assets with team members who don't have Asset Sync?",
      answer: "Yes! You can generate secure shareable links that allow anyone to access specific assets without requiring an Asset Sync account.",
      category: "Sharing"
    },
    {
      question: "What happens if I exceed my storage limit?",
      answer: "You'll receive notifications when approaching your limit. You can upgrade your plan anytime or archive older assets to free up space.",
      category: "Account"
    },
    {
      question: "How do I restore a previous version of an asset?",
      answer: "Asset Sync automatically saves version history. Right-click any asset and select 'Version History' to view and restore previous versions.",
      category: "Features"
    }
  ];

  const supportCategories = [
    {
      icon: <FaCloudUploadAlt />,
      title: "Syncing Issues",
      description: "Problems with asset synchronization",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <FaShieldAlt />,
      title: "Security & Privacy",
      description: "Account security and data protection",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <FaUsers />,
      title: "Team Collaboration",
      description: "Multi-user and workspace issues",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <FaTools />,
      title: "Technical Support",
      description: "Platform bugs and technical problems",
      color: "from-red-500 to-red-600"
    }
  ];

  const resources = [
    {
      icon: <FaBook />,
      title: "User Guide",
      description: "Complete documentation for all features",
      link: "#",
      type: "PDF"
    },
    {
      icon: <FaVideo />,
      title: "Video Tutorials",
      description: "Step-by-step visual guides",
      link: "#",
      type: "Videos"
    },
    {
      icon: <FaLightbulb />,
      title: "Best Practices",
      description: "Tips for optimal asset management",
      link: "#",
      type: "Article"
    },
    {
      icon: <FaTicketAlt />,
      title: "API Documentation",
      description: "Developer resources and integration guides",
      link: "#",
      type: "API"
    }
  ];

  const contactOptions = [
    {
      icon: <FaComments />,
      title: "Live Chat",
      description: "Instant support with our team",
      availability: "Available 24/7",
      action: "Start Chat",
      color: "from-primary to-primary/80"
    },
    {
      icon: <FaEnvelopeOpenText />,
      title: "Email Support",
      description: "Detailed assistance via email",
      availability: "Response within 24 hours",
      action: "Send Email",
      color: "from-secondary to-secondary/80"
    },
    {
      icon: <FaPhoneAlt />,
      title: "Phone Support",
      description: "Direct voice assistance",
      availability: "Mon-Fri, 9AM-6PM EST",
      action: "Call Now",
      color: "from-accent to-accent/80"
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Support form submitted:', formData);
  };

  const toggleFAQ = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-50 to-base-100">
      <title>Support | Asset Sync</title>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-transparent to-primary/5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/70 mb-6 shadow-lg">
              <FaHeadset className="text-white text-3xl" />
            </div>
            <SectionTitle title="Support Center" />
            <p className="mt-4 text-lg md:text-xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
              Get the help you need to make the most of Asset Sync. Our comprehensive support 
              resources and dedicated team are here to ensure your success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="py-16 bg-base-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-base-content mb-4">How Can We Help You?</h2>
            <p className="text-base-content/70 max-w-2xl mx-auto text-lg">
              Choose the support option that best fits your needs
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {contactOptions.map((option, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative bg-base-100 rounded-xl p-8 h-full flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${option.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-white text-2xl">{option.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-base-content mb-2">{option.title}</h3>
                  <p className="text-base-content/70 mb-3">{option.description}</p>
                  <div className="flex items-center gap-2 text-sm text-primary mb-4">
                    <FaClock className="text-xs" />
                    <span>{option.availability}</span>
                  </div>
                  <button className={`btn bg-gradient-to-r ${option.color} text-white border-0 hover:opacity-90 transition-opacity duration-300`}>
                    {option.action}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="py-16 bg-gradient-to-br from-base-50 to-base-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-base-content mb-4">Browse by Category</h2>
            <p className="text-base-content/70 max-w-2xl mx-auto text-lg">
              Find targeted help for your specific issue
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {supportCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group bg-base-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-white text-xl">{category.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-base-content mb-2">{category.title}</h3>
                <p className="text-base-content/70 text-sm">{category.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-base-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-base-content mb-4">Frequently Asked Questions</h2>
            <p className="text-base-content/70 max-w-2xl mx-auto text-lg">
              Quick answers to common questions about Asset Sync
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gradient-to-br from-base-50 to-base-100 rounded-lg shadow-md overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-base-200/50 transition-colors duration-200"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FaQuestionCircle className="text-primary text-sm" />
                    </div>
                    <span className="font-medium text-base-content">{faq.question}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-primary/70 bg-primary/10 px-2 py-1 rounded-full">
                      {faq.category}
                    </span>
                    <FaChevronDown 
                      className={`text-primary transition-transform duration-300 ${
                        openFAQIndex === index ? 'rotate-180' : ''
                      }`} 
                    />
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  openFAQIndex === index ? 'max-h-40' : 'max-h-0'
                }`}>
                  <div className="px-6 pb-4">
                    <p className="text-base-content/70 pl-11">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-gradient-to-br from-base-50 to-base-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-base-content mb-4">Help Resources</h2>
            <p className="text-base-content/70 max-w-2xl mx-auto text-lg">
              Comprehensive guides and documentation to help you succeed
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group bg-base-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-primary text-xl">{resource.icon}</span>
                  </div>
                  <span className="text-xs text-primary/70 bg-primary/10 px-2 py-1 rounded-full">
                    {resource.type}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-base-content mb-2">{resource.title}</h3>
                <p className="text-base-content/70 text-sm mb-4">{resource.description}</p>
                <Link 
                  to={resource.link}
                  className="text-primary hover:text-primary/80 flex items-center gap-2 text-sm font-medium"
                >
                  Access Resource
                  <FaExternalLinkAlt className="text-xs" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-base-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-base-content mb-4">Contact Support</h2>
            <p className="text-base-content/70 max-w-2xl mx-auto text-lg">
              Can't find what you're looking for? Send us a message and we'll get back to you soon.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-base-50 to-base-100 rounded-xl shadow-lg p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-base-content mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-base-100"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-base-content mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-base-100"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-base-content mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-base-100"
                >
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Issue</option>
                  <option value="billing">Billing Question</option>
                  <option value="feature">Feature Request</option>
                  <option value="bug">Bug Report</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-base-content mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Brief description of your issue"
                  className="w-full px-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-base-100"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-base-content mb-2">
                  Message
                </label>
                <div className="relative">
                  <FaRegFileAlt className="absolute left-3 top-4 text-base-content/50" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please describe your issue in detail..."
                    rows={5}
                    className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-base-100 resize-none"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-base-content/60">
                  We'll respond within 24 hours
                </p>
                <button
                  type="submit"
                  className="btn bg-gradient-to-r from-primary to-primary/80 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  <FaPaperPlane />
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Emergency Support */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Need Immediate Assistance?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              For urgent issues affecting your business operations, our emergency support team is available 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn bg-white text-primary hover:bg-base-100 px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                <FaPhoneAlt className="mr-2" />
                Emergency Hotline
              </button>
              <button className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                <FaComments className="mr-2" />
                Live Chat Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Support;