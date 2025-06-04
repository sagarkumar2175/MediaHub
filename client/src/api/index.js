// src/api/index.js
import axios from "axios";

// If your server runs on port 5000:
const BASE_URL = "http://localhost:5000/api";

export const fetchFromAPI = async (endpoint) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${endpoint}`);
    return data;
  } catch (err) {
    console.error("Error in fetchFromAPI:", err);
    throw err;
  }
};
