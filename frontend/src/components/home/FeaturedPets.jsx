import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getFeaturedPets } from "../../services/petService";
import PetCard from "../pets/PetCard";
import SkeletonLoader from "../common/SkeletonLoader";

const FeaturedPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedPets()
      .then(setPets)
      .catch(() => setPets([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-2">Featured Pets</h2>
          <p className="text-gray-600">Meet a few friends looking for their forever home.</p>
        </div>
        <Link to="/pets" className="hidden sm:inline text-primary font-semibold hover:underline">
          View All →
        </Link>
      </div>

      {loading ? (
        <SkeletonLoader count={6} />
      ) : (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {pets.map((pet) => (
            <motion.div
              key={pet._id}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            >
              <PetCard pet={pet} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default FeaturedPets;