import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Browse Pets", text: "Explore our gallery of pets waiting for a home." },
  { num: "02", title: "Apply Online", text: "Fill out our simple multi-step adoption form." },
  { num: "03", title: "Get Reviewed", text: "Our team reviews your application carefully." },
  { num: "04", title: "Bring Them Home", text: "Get approved and welcome your new friend." },
];

const AdoptionProcess = () => {
  return (
    <section className="section-padding">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-dark mb-3">The Adoption Process</h2>
        <p className="text-gray-600 max-w-xl mx-auto">Four simple steps to bringing your new companion home.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="relative text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-white flex items-center justify-center font-display font-bold text-xl shadow-glow">
              {s.num}
            </div>
            <h3 className="font-display font-bold text-lg mb-2">{s.title}</h3>
            <p className="text-sm text-gray-600">{s.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AdoptionProcess;