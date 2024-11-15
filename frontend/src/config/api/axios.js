import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:3500", 
  baseURL: "https://automatex-leechers.onrender.com",
  headers: { "Content-Type": "application/json" },
});
