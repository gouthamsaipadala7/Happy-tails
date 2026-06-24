import { useFavoritesContext } from "../../context/FavoritesContext";
import PetCard from "../pets/PetCard";

const FavoritesList = () => {
  const { favorites } = useFavoritesContext();

  if (!favorites.length) {
    return <p className="text-gray-500 text-sm">You haven't saved any favorites yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {favorites.map((fav) => (
        <PetCard key={fav._id} pet={fav.pet} />
      ))}
    </div>
  );
};

export default FavoritesList;