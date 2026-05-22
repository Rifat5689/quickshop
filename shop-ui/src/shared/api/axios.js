import axios from "axios";

const base =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:4000";

const api = axios.create({
  baseURL: base,
});

export { api };
