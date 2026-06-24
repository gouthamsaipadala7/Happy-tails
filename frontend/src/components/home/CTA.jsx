import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-xl3 bg-primary text-white text-center p-12 md:p-20 relative overflow-hidden"
      >
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Ready to Meet Your New Best Friend?</h2>
        <p className="text-white/90 max-w-xl mx-auto mb-8">
          Thousands of pets are waiting for someone like you. Start browsing today and change a life forever.
        </p>
        <Link to="/pets" className="inline-block bg-white text-primary font-semibold px-8 py-4 rounded-full shadow-soft hover:scale-105 transition-transform">
          Browse Available Pets
        </Link>
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/10 rounded-full" />
      </motion.div>
    </section>
  );
};

export default CTA;