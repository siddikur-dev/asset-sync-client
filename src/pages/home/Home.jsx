import HeroBanner from "../../components/homePage/HeroBanner";
import AboutSection from "../../components/homePage/AboutSection";
import PackagesSection from "../../components/homePage/PackagesSection";
import FeaturesSection from "../../components/homePage/FeaturesSection";
import SponsoredTeams from "../../components/homePage/SponsoredTeams";
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
      <SponsoredTeams />
      <TestimonialsSection />
      <HowItWorks />
      <FAQSection />
      <DeviceSupport></DeviceSupport>
      <ContactCTA />
    </>
  );
};

export default Home;
