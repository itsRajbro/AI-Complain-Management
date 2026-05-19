// src/services/api.js
// Centralized Axios instance with auth token injection

import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Attach JWT token to every request automatically
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// ── Auth APIs ──────────────────────────────────────
export const signupUser = (data) => API.post("/auth/signup", data);
export const loginUser = (data) => API.post("/auth/login", data);

// ── Complaint APIs ─────────────────────────────────
export const createComplaint = (data) => API.post("/complaints", data);
export const getComplaints = (params) => API.get("/complaints", { params });
export const updateComplaint = (id, data) => API.put(`/complaints/${id}`, data);
export const deleteComplaint = (id) => API.delete(`/complaints/${id}`);
export const searchComplaints = (location) =>
  API.get(`/complaints/search?location=${location}`);

// ── AI APIs ────────────────────────────────────────
export const analyzeWithAI = (data) => API.post("/ai/analyze", data);

export default API;
