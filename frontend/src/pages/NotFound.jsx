import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center section-padding">
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-7xl mb-6">
        🐾
      </motion.div>
      <h1 className="text-4xl font-display font-bold mb-3">404 - Lost Like a Stray</h1>
      <p className="text-gray-600 mb-8">This page wandered off. Let's get you back home.</p>
      <Link to="/" className="btn-primary">Go Home</Link>
    </div>
  );
};

export default NotFound;