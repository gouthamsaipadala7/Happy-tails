import Hero from "../components/home/Hero";
import FeaturedPets from "../components/home/FeaturedPets";
import WhyAdopt from "../components/home/WhyAdopt";
import AdoptionProcess from "../components/home/AdoptionProcess";
import HappyFamilies from "../components/home/HappyFamilies";
import Statistics from "../components/home/Statistics";
import CTA from "../components/home/CTA";
import Newsletter from "../components/home/Newsletter";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedPets />
      <WhyAdopt />
      <AdoptionProcess />
      <HappyFamilies />
      <Statistics />
      <CTA />
      <Newsletter />
    </>
  );
};

export default Home;