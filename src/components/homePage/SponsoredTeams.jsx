import React from 'react';
import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import img1 from '../../assets/sponsoredAndTeams/1.webp';
import img2 from '../../assets/sponsoredAndTeams/2.webp';
import img3 from '../../assets/sponsoredAndTeams/3.webp';
import img4 from '../../assets/sponsoredAndTeams/4.webp';
import img5 from '../../assets/sponsoredAndTeams/5.webp';
import img6 from '../../assets/sponsoredAndTeams/6.webp';
import img7 from '../../assets/sponsoredAndTeams/7.webp';
import img8 from '../../assets/sponsoredAndTeams/8.webp';
import img9 from '../../assets/sponsoredAndTeams/9.webp';
import img10 from '../../assets/sponsoredAndTeams/10.webp';
import img11 from '../../assets/sponsoredAndTeams/11.webp';
import img12 from '../../assets/sponsoredAndTeams/12.webp';
import img13 from '../../assets/sponsoredAndTeams/13.webp';
import img14 from '../../assets/sponsoredAndTeams/14.webp';

const teamImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14];
const teamImages2 = [img14, img13, img12, img11, img10, img9, img8, img7, img6, img5, img4, img3, img2, img1];

const SponsoredTeams = () => {
  return (
    <section className="py-16 bg-base-200 overflow-y-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className='mb-4 text-3xl md:text-4xl font-bold text-gradient'>Trusted by Industry Leaders</h2>
          <p className="text-center text-base-content/70 mb-8 text-base md:text-lg max-w-2xl mx-auto">
            Join the hundreds of companies that rely on AssetSync for efficient asset management and tracking solutions.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <Marquee
            gradient={true}
            gradientWidth={80}
            speed={40}
            pauseOnHover={true}
            className="py-6 overflow-y-hidden bg-base-100 rounded-2xl shadow-sm"
          >
            {teamImages.map((img, idx) => (
              <motion.div
                key={idx}
                className="mx-6 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="p-3 bg-base-200 rounded-xl border border-base-300 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover-lift">
                  <img
                    src={img}
                    alt={`Partner company ${idx + 1}`}
                    className="h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </motion.div>
            ))}
          </Marquee>
          
          <Marquee
            direction="right"
            gradient={true}
            gradientWidth={80}
            speed={40}
            pauseOnHover={true}
            className="py-6 overflow-y-hidden bg-base-100 rounded-2xl shadow-sm"
          >
            {teamImages2.map((img, idx) => (
              <motion.div
                key={idx}
                className="mx-6 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="p-3 bg-base-200 rounded-xl border border-base-300 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover-lift">
                  <img
                    src={img}
                    alt={`Partner company ${idx + 1}`}
                    className="h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </motion.div>
            ))}
          </Marquee>
        </motion.div>
      </div>
    </section>
  );
};

export default SponsoredTeams;