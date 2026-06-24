import api from "./api";

export const getPets = (params) => api.get("/pets", { params }).then((res) => res.data);
export const getPetById = (id) => api.get(`/pets/${id}`).then((res) => res.data);
export const getFeaturedPets = () => api.get("/pets/featured").then((res) => res.data);
export const createPet = (data) => api.post("/pets", data).then((res) => res.data);
export const updatePet = (id, data) => api.put(`/pets/${id}`, data).then((res) => res.data);
export const deletePet = (id) => api.delete(`/pets/${id}`).then((res) => res.data);