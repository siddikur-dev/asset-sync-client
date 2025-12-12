import HeroBanner from "../../components/homePage/HeroBanner";
import AboutSection from "../../components/homePage/AboutSection";
import FeaturesSection from "../../components/homePage/FeaturesSection";
import TestimonialsSection from "../../components/homePage/TestimonialsSection";
import HowItWorks from "../../components/homePage/HowItWorks";
import FAQSection from "../../components/homePage/FAQSection";
import ContactCTA from "../../components/homePage/ContactCTA";
import DeviceSupport from "../../components/homePage/DeviceSupport";

const Home = () => {
  return (
    <>
      <HeroBanner />
      <AboutSection />
      <FeaturesSection />
      <TestimonialsSection />
      <HowItWorks />
      <FAQSection />
      <DeviceSupport></DeviceSupport>
      <ContactCTA />
    </>
  );
};

export default Home;
