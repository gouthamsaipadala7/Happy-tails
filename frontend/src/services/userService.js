import api from "./api";

export const updateProfile = (data) => api.put("/users/profile", data).then((res) => res.data);
export const changePassword = (data) => api.put("/users/password", data).then((res) => res.data);
export const addFavorite = (pet) => api.post("/favorites", { pet }).then((res) => res.data);
export const getMyFavorites = () => api.get("/favorites").then((res) => res.data);
export const removeFavorite = (petId) => api.delete(`/favorites/${petId}`).then((res) => res.data);
export const getSuccessStories = () => api.get("/success-stories").then((res) => res.data);
export const getAdminStats = () => api.get("/admin/stats").then((res) => res.data);
export const getAllUsers = () => api.get("/admin/users").then((res) => res.data);
export const deleteUser = (id) => api.delete(`/admin/users/${id}`).then((res) => res.data);