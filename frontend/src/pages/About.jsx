import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faEye, faCode, faPaw } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  return (
    <div className="section-padding">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">About Happy Tails</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We're on a mission to connect every adoptable pet with a loving home, using technology to make adoption simple and joyful.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="glass rounded-xl2 p-8 shadow-soft">
          <FontAwesomeIcon icon={faBullseye} className="text-3xl text-primary mb-4" />
          <h3 className="text-xl font-display font-bold mb-2">Our Mission</h3>
          <p className="text-gray-600">
            To reduce shelter overcrowding and pet homelessness by making adoption accessible, transparent, and emotionally rewarding for every family.
          </p>
        </div>
        <div className="glass rounded-xl2 p-8 shadow-soft">
          <FontAwesomeIcon icon={faEye} className="text-3xl text-primary mb-4" />
          <h3 className="text-xl font-display font-bold mb-2">Our Vision</h3>
          <p className="text-gray-600">
            A world where every companion animal has a safe, loving home — and where adopting is always the first choice.
          </p>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-display font-bold text-center mb-8">Platform Features</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {["Smart Pet Search", "Multi-Step Applications", "Request Tracking", "Admin Dashboard"].map((f) => (
            <div key={f} className="bg-white rounded-xl2 p-5 shadow-soft">
              <FontAwesomeIcon icon={faPaw} className="text-primary mb-2" />
              <p className="text-sm font-medium">{f}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-display font-bold text-center mb-8">Technology Stack</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {["React", "Vite", "Tailwind CSS", "Node.js", "Express", "MongoDB", "JWT", "Framer Motion"].map((t) => (
            <span key={t} className="bg-primary/10 text-primary font-medium text-sm px-4 py-2 rounded-full">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="text-center glass rounded-xl2 p-8 max-w-lg mx-auto">
        <FontAwesomeIcon icon={faCode} className="text-3xl text-primary mb-3" />
        <h3 className="text-xl font-display font-bold mb-2">Developer Information</h3>
        <p className="text-gray-600 text-sm">
          Happy Tails was built as a full-stack mini project demonstrating the MERN stack, modern UI/UX practices, and real-world adoption workflows.
        </p>
      </div>
    </div>
  );
};

export default About;