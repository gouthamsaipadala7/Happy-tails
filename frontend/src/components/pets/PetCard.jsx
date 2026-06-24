import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid, faVenus, faMars } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import useAuth from "../../hooks/useAuth";
import { useFavoritesContext } from "../../context/FavoritesContext";

const statusColors = {
  Available: "bg-accent/15 text-accent",
  Pending: "bg-secondary/20 text-yellow-700",
  Adopted: "bg-gray-200 text-gray-500",
};

const PetCard = ({ pet }) => {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const fav = isFavorite(pet._id);

  const handleFavClick = (e) => {
    e.preventDefault();
    if (!user) return;
    toggleFavorite(pet._id);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="rounded-xl2 overflow-hidden bg-white shadow-soft group"
    >
      <Link to={`/pets/${pet._id}`} className="block">
        <div className="relative h-52 overflow-hidden">
          <img
            src={pet.images?.[0] || "https://images.unsplash.com/photo-1558788353-f76d92427f16"}
            alt={pet.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${statusColors[pet.status]}`}>
            {pet.status}
          </span>
          <button
            onClick={handleFavClick}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-primary hover:scale-110 transition-transform"
          >
            <FontAwesomeIcon icon={fav ? faHeartSolid : faHeartRegular} />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-display font-bold text-lg text-dark">{pet.name}</h3>
            <FontAwesomeIcon icon={pet.gender === "Female" ? faVenus : faMars} className="text-primary" />
          </div>
          <p className="text-sm text-gray-500 mb-3">{pet.breed} • {pet.age} {pet.age === 1 ? "yr" : "yrs"}</p>
          <span className="inline-block text-xs font-medium text-primary border border-primary/30 rounded-full px-3 py-1">
            View Details →
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default PetCard;