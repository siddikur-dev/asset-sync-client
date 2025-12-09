import React from 'react';
import SectionTitle from '../../components/shared/SectionTitle';
import { 
  FaCloudUploadAlt, 
  FaUsers, 
  FaLightbulb, 
  FaRocket, 
  FaShieldAlt, 
  FaHandshake,
  FaSyncAlt,
  FaChartLine,
  FaCog,
  FaLock,
  FaGlobe,
  FaClock,
  FaCheckCircle
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const AboutUs = () => {
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

  const stats = [
    { label: 'Assets Synced', value: 45000, icon: <FaCloudUploadAlt className="text-primary" /> },
    { label: 'Active Users', value: 12000, icon: <FaUsers className="text-primary" /> },
    { label: 'Sync Operations', value: 85000, icon: <FaSyncAlt className="text-primary" /> },
    { label: 'Uptime %', value: 99.9, icon: <FaCheckCircle className="text-primary" /> },
  ];

  const features = [
    {
      icon: <FaCloudUploadAlt />,
      title: "Seamless Syncing",
      description: "Experience effortless asset synchronization across all your devices with our cutting-edge cloud technology."
    },
    {
      icon: <FaShieldAlt />,
      title: "Enterprise Security",
      description: "Bank-level encryption and security protocols ensure your assets remain protected at all times."
    },
    {
      icon: <FaRocket />,
      title: "Lightning Fast",
      description: "Optimized performance delivers instant synchronization, even with large asset collections."
    },
    {
      icon: <FaCog />,
      title: "Smart Automation",
      description: "Intelligent algorithms automatically organize and categorize your assets for maximum efficiency."
    },
    {
      icon: <FaGlobe />,
      title: "Global Infrastructure",
      description: "Worldwide server network ensures reliable access to your assets from anywhere, anytime."
    },
    {
      icon: <FaLock />,
      title: "Privacy First",
      description: "Your data belongs to you. We never compromise on privacy or data ownership."
    }
  ];

  const timeline = [
    {
      year: '2022',
      title: 'Asset Sync Founded',
      description: 'Started with a vision to revolutionize how teams manage and synchronize digital assets.',
      icon: <FaRocket />
    },
    {
      year: '2023',
      title: 'Beta Launch',
      description: 'Released our beta version to select enterprise clients, receiving overwhelming positive feedback.',
      icon: <FaUsers />
    },
    {
      year: '2023',
      title: 'Version 1.0',
      description: 'Official public launch with groundbreaking sync technology and enterprise-grade security.',
      icon: <FaShieldAlt />
    },
    {
      year: '2024',
      title: 'Global Expansion',
      description: 'Expanded infrastructure to 15 countries, serving thousands of organizations worldwide.',
      icon: <FaGlobe />
    },
    {
      year: '2024',
      title: 'AI Integration',
      description: 'Introduced AI-powered asset management and predictive sync capabilities.',
      icon: <FaLightbulb />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-50 to-base-100">
      <title>About Us | Asset Sync</title>
      
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
              <FaSyncAlt className="text-white text-3xl" />
            </div>
            <SectionTitle title="About Asset Sync" />
            <p className="mt-4 text-lg md:text-xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
              Transforming how organizations manage, synchronize, and collaborate on digital assets. 
              Our platform combines cutting-edge technology with intuitive design to deliver 
              unparalleled efficiency and security.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-base-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <FaLightbulb className="text-primary text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-base-content">Our Mission</h2>
              </div>
              <p className="text-base-content/80 leading-relaxed mb-6">
                To empower organizations with seamless asset synchronization solutions that 
                enhance collaboration, boost productivity, and ensure data integrity across 
                all platforms and devices.
              </p>
              <p className="text-base-content/70 leading-relaxed">
                We believe that managing digital assets should be effortless, secure, and 
                intelligent. Our mission is to eliminate the complexities of asset management 
                through innovative technology and user-centric design.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-base-200 rounded-2xl p-8 shadow-lg">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                    <div className="text-sm text-base-content/70">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">{"<1s"}</div>
                    <div className="text-sm text-base-content/70">Sync Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">256-bit</div>
                    <div className="text-sm text-base-content/70">Encryption</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-sm text-base-content/70">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-gradient-to-br from-base-50 to-base-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-base-content mb-4">Our Vision</h2>
            <p className="text-base-content/70 max-w-2xl mx-auto text-lg">
              To become the global standard for asset synchronization, enabling seamless 
              collaboration and innovation across industries.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <FaGlobe />,
                title: "Global Reach",
                description: "Connecting teams worldwide with instant asset synchronization"
              },
              {
                icon: <FaChartLine />,
                title: "Continuous Innovation",
                description: "Pioneering new technologies to stay ahead of evolving needs"
              },
              {
                icon: <FaHandshake />,
                title: "Strategic Partnerships",
                description: "Building alliances to enhance platform capabilities"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-base-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-primary text-xl">{item.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-base-content mb-3 text-center">{item.title}</h3>
                <p className="text-base-content/70 text-center">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-base-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-base-content mb-4">Our Core Values</h2>
            <p className="text-base-content/70 max-w-2xl mx-auto text-lg">
              The principles that guide our decisions and shape our culture
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaShieldAlt />,
                title: "Security First",
                description: "Never compromise on data protection and privacy"
              },
              {
                icon: <FaUsers />,
                title: "Customer Obsessed",
                description: "Every decision starts with our customers' success"
              },
              {
                icon: <FaLightbulb />,
                title: "Innovation Driven",
                description: "Constantly pushing boundaries of what's possible"
              },
              {
                icon: <FaHandshake />,
                title: "Integrity Always",
                description: "Building trust through transparency and honesty"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-base-50 to-base-100 rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-primary text-lg">{value.icon}</span>
                </div>
                <h3 className="font-semibold text-base-content mb-2">{value.title}</h3>
                <p className="text-sm text-base-content/70">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-base-content mb-4">Our Impact</h2>
            <p className="text-base-content/70 max-w-2xl mx-auto text-lg">
              Numbers that reflect our commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-primary text-2xl">{stat.icon}</span>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  <CountUp 
                    end={stat.value} 
                    duration={3} 
                    decimals={stat.label === 'Uptime %' ? 1 : 0}
                    suffix={stat.label === 'Uptime %' ? '%' : '+'}
                  />
                </div>
                <div className="text-sm md:text-base text-base-content/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-base-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-base-content mb-4">Why Choose Asset Sync?</h2>
            <p className="text-base-content/70 max-w-2xl mx-auto text-lg">
              Features that make us the industry leader in asset synchronization
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-gradient-to-br from-base-50 to-base-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-base-content mb-3">{feature.title}</h3>
                <p className="text-base-content/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gradient-to-br from-base-50 to-base-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-base-content mb-4">Our Journey</h2>
            <p className="text-base-content/70 max-w-2xl mx-auto text-lg">
              Milestones that mark our growth and evolution
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary/50 to-primary/20"></div>
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
              >
                <div className="w-1/2"></div>
                <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm">{item.icon}</span>
                </div>
                <div className="w-1/2 px-6">
                  <div className="bg-base-100 rounded-lg p-6 shadow-md">
                    <div className="text-sm font-semibold text-primary mb-2">{item.year}</div>
                    <h3 className="text-xl font-semibold text-base-content mb-2">{item.title}</h3>
                    <p className="text-base-content/70">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Asset Management?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of organizations that have already revolutionized their workflow with Asset Sync.
            </p>
            <button className="btn bg-white text-primary hover:bg-base-100 px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              Get Started Today
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;