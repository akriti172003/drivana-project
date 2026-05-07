import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🛡️ AUTH INTERCEPTOR
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

/* =============================================
    🚗 CAR ENDPOINTS
   ============================================= */

// Fetch all cars
export const getCars = () => API.get("/cars");

// Fetch a single car detail
export const fetchCarById = (id) => API.get(`/cars/details/${id}`);

// Admin: Add a new car (Handles Image Uploads)
export const addCar = (carData) => 
  API.post("/cars", carData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Admin: Update car
export const updateCar = (id, carData) => 
  API.put(`/cars/${id}`, carData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Admin: Delete car
export const deleteCar = (id) => API.delete(`/cars/${id}`);

/* =============================================
    🤖 AI & CHAT ENDPOINTS
   ============================================= */

// UPDATED: Path matches app.post("/api/ai/chat") in your index.js
export const sendChatMessage = (chatPayload) => API.post("/ai/chat", chatPayload);

// Get AI-powered comparison analysis
export const getAIComparison = (carIds) => API.post("/cars/compare-ai", { carIds });

/* =============================================
    👤 AUTH ENDPOINTS
   ============================================= */

// login and register functions for use in your Login.jsx and Signup.jsx
export const loginUser = (formData) => API.post("/auth/login", formData);
export const registerUser = (formData) => API.post("/auth/register", formData);

export default API;