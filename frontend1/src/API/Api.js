import axios from "axios";

const API = axios.create({
  // baseURL: "https://updated-inventory.onrender.com",
  //baseURL: "https://updated-inventory-hrhg.onrender.com/",
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // Ensures cookies/session handling
});

export default API;
