import axios from "axios";

// Create a common Axios instance for your API requests
const api = axios.create({
  baseURL: "http://localhost:5000", // Set your backend API base URL here
});

// Login API function
export const login = async (formData) => {
  try {
    const response = await api.post("/login", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Registration API function
export const register = async (formData) => {
  try {
    const response = await api.post("/register", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const upload = async (formData) => {
  try {
    const response = await api.post("/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Important for file upload
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};