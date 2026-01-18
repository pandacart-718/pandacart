const API_BASE =
  import.meta.env.PROD
    ? "https://pandacart-backend-89ll.onrender.com"
    : "http://localhost:5000";

export default API_BASE;
