import axios from "axios";

// You can use environment variable to switch between local and production
const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5003";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
