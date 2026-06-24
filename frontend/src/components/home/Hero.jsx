import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  return (
    <section className="relative overflow-hidden section-padding !pt-28 !pb-20 flex flex-col lg:flex-row items-center gap-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex-1 z-10"
      >
        <span className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full text-sm mb-6">
          <FontAwesomeIcon icon={faPaw} /> Over 500 Happy Adoptions
        </span>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-dark leading-tight mb-6">
          Find a Friend.<br />
          <span className="text-primary">Give a Home.</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md">
          Happy Tails connects loving families with pets who are ready for their forever home. Start your adoption journey today.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/pets" className="btn-primary">
            Browse Pets <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </Link>
          <Link to="/about" className="btn-outline">
            Learn More
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-1 relative z-10"
      >
        <div className="relative rounded-xl3 overflow-hidden shadow-glow animate-float max-w-md mx-auto">
          <img
            src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1"
            alt="Happy adopted dog"
            className="w-full h-[420px] object-cover"
          />
        </div>
        <div className="absolute -bottom-6 -left-6 glass rounded-xl2 p-4 shadow-soft hidden md:block">
          <p className="text-2xl font-display font-bold text-primary">1,200+</p>
          <p className="text-xs text-gray-600">Pets Adopted</p>
        </div>
      </motion.div>

      <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/20 rounded-full blur-3xl -z-0" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl -z-0" />
    </section>
  );
};

export default Hero;