import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getSuccessStories } from "../services/userService";

const SuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSuccessStories()
      .then(setStories)
      .catch(() => setStories([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="section-padding">
      <div className="text-center mb-14">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">Success Stories</h1>
        <p className="text-gray-600">Real adoptions, real happiness.</p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading stories...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, i) => (
            <motion.div
              key={story._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1 }}
              className="rounded-xl2 overflow-hidden shadow-soft bg-white"
            >
              <img src={story.images?.[0]} alt={story.title} className="h-52 w-full object-cover" />
              <div className="p-5">
                <h3 className="font-display font-bold text-lg mb-2">{story.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{story.story}</p>
                <p className="text-sm italic text-gray-500 mb-2">"{story.testimonial}"</p>
                <p className="text-xs font-semibold text-primary">— {story.adopterName}, adopted {story.petName}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SuccessStories;