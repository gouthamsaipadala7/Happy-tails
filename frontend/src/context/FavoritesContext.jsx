import { createContext, useContext, useState, useEffect, useCallback } from "react";
import * as userService from "../services/userService";
import { useAuthContext } from "./AuthContext";

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [favorites, setFavorites] = useState([]);

  const refreshFavorites = useCallback(async () => {
    if (!user) {
      setFavorites([]);
      return;
    }
    try {
      const data = await userService.getMyFavorites();
      setFavorites(data);
    } catch {
      setFavorites([]);
    }
  }, [user]);

  useEffect(() => {
    refreshFavorites();
  }, [refreshFavorites]);

  const isFavorite = (petId) => favorites.some((f) => f.pet?._id === petId);

  const toggleFavorite = async (petId) => {
    if (!user) return;
    if (isFavorite(petId)) {
      await userService.removeFavorite(petId);
    } else {
      await userService.addFavorite(petId);
    }
    await refreshFavorites();
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite, refreshFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => useContext(FavoritesContext);
export default FavoritesContext;