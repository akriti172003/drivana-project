import axios from "axios";

// 🌍 Dynamic Base URL: Pehle env check karega, fallback to live Render server in production
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL}/api` 
    : "https://drivana-project-1.onrender.com/api",
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

// Path matches app.post("/api/ai/chat") in backend index.js
export const sendChatMessage = (chatPayload) => API.post("/ai/chat", chatPayload);

// Get AI-powered comparison analysis
export const getAIComparison = (carIds) => API.post("/cars/compare-ai", { carIds });

/* =============================================
   👤 AUTH ENDPOINTS
   ============================================= */

// Login and Register wrappers
export const loginUser = (formData) => API.post("/auth/login", formData);
export const registerUser = (formData) => API.post("/auth/register", formData);

export default API;