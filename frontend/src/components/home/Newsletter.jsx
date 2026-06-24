import { useState } from "react";
import { motion } from "framer-motion";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="section-padding bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-dark mb-3">Stay in the Loop</h2>
        <p className="text-gray-600 mb-6">Get updates on new pets, success stories, and adoption events.</p>

        {submitted ? (
          <p className="text-accent font-semibold">🎉 Thanks for subscribing!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button type="submit" className="btn-primary">
              Subscribe
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
};

export default Newsletter;