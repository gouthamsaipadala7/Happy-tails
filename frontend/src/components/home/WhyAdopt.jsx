import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHandHoldingHeart, faShieldHeart, faHouseChimney } from "@fortawesome/free-solid-svg-icons";

const reasons = [
  { icon: faHeart, title: "Unconditional Love", text: "Pets offer companionship and joy that lasts a lifetime." },
  { icon: faShieldHeart, title: "Health Checked", text: "Every pet is vaccinated and health-screened before adoption." },
  { icon: faHouseChimney, title: "Save a Life", text: "Adopting gives a rescued animal a second chance at a home." },
  { icon: faHandHoldingHeart, title: "Full Support", text: "Our team guides you through every step of the journey." },
];

const WhyAdopt = () => {
  return (
    <section className="section-padding bg-white">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-dark mb-3">Why Adopt With Us</h2>
        <p className="text-gray-600 max-w-xl mx-auto">We make pet adoption simple, transparent, and full of heart.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl2 p-6 text-center bg-background shadow-soft hover:shadow-glow transition-shadow"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl">
              <FontAwesomeIcon icon={r.icon} />
            </div>
            <h3 className="font-display font-bold text-lg mb-2">{r.title}</h3>
            <p className="text-sm text-gray-600">{r.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyAdopt;