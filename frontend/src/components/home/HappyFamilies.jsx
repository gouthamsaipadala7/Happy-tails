import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getSuccessStories } from "../../services/userService";

const HappyFamilies = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    getSuccessStories()
      .then((data) => setStories(data.slice(0, 3)))
      .catch(() => setStories([]));
  }, []);

  if (!stories.length) return null;

  return (
    <section className="section-padding bg-white">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-dark mb-3">Happy Families</h2>
        <p className="text-gray-600">Real stories from real adopters.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map((story, i) => (
          <motion.div
            key={story._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl2 overflow-hidden shadow-soft bg-background"
          >
            <img src={story.images?.[0]} alt={story.title} className="h-48 w-full object-cover" />
            <div className="p-5">
              <h3 className="font-display font-bold text-lg mb-1">{story.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{story.story?.slice(0, 100)}...</p>
              <p className="text-xs font-semibold text-primary">— {story.adopterName}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HappyFamilies;