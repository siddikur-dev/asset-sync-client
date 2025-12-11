import React from 'react';
import Marquee from 'react-fast-marquee';
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
        <div className="text-center mb-12">
          <h2 className='mb-4 text-3xl md:text-4xl font-bold text-gradient'>Sponsored Teams</h2>
          <p className="text-center text-base-content/70 mb-8 text-base md:text-lg max-w-2xl mx-auto">
            Proudly showcasing our partners and teams who support and collaborate with EduSync.
          </p>
        </div>
        
        <div className="space-y-8">
          <Marquee
            gradient={true}
            gradientWidth={80}
            speed={40}
            pauseOnHover={true}
            className="py-6 overflow-y-hidden bg-base-100 rounded-2xl shadow-sm"
          >
            {teamImages.map((img, idx) => (
              <div key={idx} className="mx-6 flex items-center justify-center">
                <div className="p-3 bg-base-200 rounded-xl border border-base-300 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover-lift">
                  <img
                    src={img}
                    alt={`Sponsored team ${idx + 1}`}
                    className="h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
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
              <div key={idx} className="mx-6 flex items-center justify-center">
                <div className="p-3 bg-base-200 rounded-xl border border-base-300 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover-lift">
                  <img
                    src={img}
                    alt={`Sponsored team ${idx + 1}`}
                    className="h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default SponsoredTeams;