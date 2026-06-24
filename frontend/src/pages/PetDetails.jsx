import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyringe, faVenusMars, faPalette, faShareNodes, faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { getPetById } from "../services/petService";
import PetGallery from "../components/pets/PetGallery";
import PetCard from "../components/pets/PetCard";
import useAuth from "../hooks/useAuth";
import { useFavoritesContext } from "../context/FavoritesContext";

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const [pet, setPet] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPetById(id)
      .then((data) => {
        setPet(data.pet);
        setRelated(data.relatedPets);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: pet.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) return <div className="section-padding text-center text-gray-500">Loading pet details...</div>;
  if (!pet) return <div className="section-padding text-center text-gray-500">Pet not found.</div>;

  const fav = isFavorite(pet._id);

  return (
    <div className="section-padding">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <PetGallery images={pet.images} />

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <span className="inline-block bg-accent/15 text-accent text-xs font-semibold px-3 py-1 rounded-full mb-3">
            {pet.status}
          </span>
          <h1 className="text-4xl font-display font-bold text-dark mb-2">{pet.name}</h1>
          <p className="text-gray-500 mb-6">{pet.breed} • {pet.species}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="glass rounded-xl2 p-4">
              <FontAwesomeIcon icon={faVenusMars} className="text-primary mb-1" />
              <p className="text-sm text-gray-600">Gender</p>
              <p className="font-semibold">{pet.gender}</p>
            </div>
            <div className="glass rounded-xl2 p-4">
              <FontAwesomeIcon icon={faPalette} className="text-primary mb-1" />
              <p className="text-sm text-gray-600">Age</p>
              <p className="font-semibold">{pet.age} {pet.age === 1 ? "year" : "years"}</p>
            </div>
            <div className="glass rounded-xl2 p-4">
              <FontAwesomeIcon icon={faSyringe} className="text-primary mb-1" />
              <p className="text-sm text-gray-600">Vaccinated</p>
              <p className="font-semibold">{pet.vaccinated ? "Yes" : "No"}</p>
            </div>
            <div className="glass rounded-xl2 p-4">
              <p className="text-sm text-gray-600 mb-1">Size</p>
              <p className="font-semibold">{pet.size}</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">{pet.description}</p>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Health Information</h3>
            <p className="text-sm text-gray-600">{pet.healthInfo || "No additional health notes provided."}</p>
          </div>

          <div className="mb-8 rounded-xl2 bg-background p-4 border border-gray-100">
            <h3 className="font-semibold mb-1">Shelter Information</h3>
            <p className="text-sm text-gray-600">{pet.shelterName}</p>
            <p className="text-sm text-gray-600">{pet.shelterLocation}</p>
            <p className="text-sm text-gray-600">{pet.shelterContact}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => (user ? navigate(`/adopt/${pet._id}`) : navigate("/login"))}
              disabled={pet.status === "Adopted"}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply for Adoption
            </button>
            <button
              onClick={() => (user ? toggleFavorite(pet._id) : navigate("/login"))}
              className="btn-outline flex items-center gap-2"
            >
              <FontAwesomeIcon icon={fav ? faHeartSolid : faHeartRegular} />
              {fav ? "Saved" : "Add to Favorites"}
            </button>
            <button onClick={handleShare} className="w-12 h-12 rounded-full bg-white shadow-soft flex items-center justify-center text-dark">
              <FontAwesomeIcon icon={faShareNodes} />
            </button>
          </div>
        </motion.div>
      </div>

      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-dark mb-6">Related Pets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <PetCard key={p._id} pet={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PetDetails;