import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getPets } from "../services/petService";
import PetGrid from "../components/pets/PetGrid";
import PetFilters from "../components/pets/PetFilters";

const Pets = () => {
  const [searchParams] = useSearchParams();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [filters, setFilters] = useState({
    species: searchParams.get("species") || "",
  });

  useEffect(() => {
    setLoading(true);
    getPets({ ...filters, page: pagination.page, limit: 9 })
      .then((data) => {
        setPets(data.pets);
        setPagination({ page: data.page, pages: data.pages, total: data.total });
      })
      .catch(() => setPets([]))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, pagination.page]);

  return (
    <div className="section-padding">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-2">Browse Pets</h1>
        <p className="text-gray-600">{pagination.total} pets are waiting for a home.</p>
      </motion.div>

      <PetFilters filters={filters} setFilters={(f) => { setFilters(f); setPagination((p) => ({ ...p, page: 1 })); }} />

      <PetGrid pets={pets} loading={loading} />

      {pagination.pages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: pagination.pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPagination((p) => ({ ...p, page: i + 1 }))}
              className={`w-10 h-10 rounded-full font-medium ${
                pagination.page === i + 1 ? "bg-primary text-white" : "bg-white text-dark shadow-soft"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pets;