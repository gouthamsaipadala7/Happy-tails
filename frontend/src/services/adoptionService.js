import api from "./api";

export const submitAdoptionRequest = (data) => api.post("/adoptions", data).then((res) => res.data);
export const getMyAdoptionRequests = () => api.get("/adoptions/my").then((res) => res.data);
export const getAdoptionRequestById = (id) => api.get(`/adoptions/${id}`).then((res) => res.data);
export const getAllAdoptionRequests = (params) => api.get("/adoptions", { params }).then((res) => res.data);
export const updateAdoptionStatus = (id, data) => api.put(`/adoptions/${id}/status`, data).then((res) => res.data);