import axios from "axios";

const base = "http://localhost:4000"

const api = axios.create({
  baseURL: base
 
});

export { api };