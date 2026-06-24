import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <motion.div
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ duration: 1.2, repeat: Infinity }}
        className="text-6xl"
      >
        🐾
      </motion.div>
    </div>
  );
};

export default LoadingScreen;