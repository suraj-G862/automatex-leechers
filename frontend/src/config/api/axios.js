import axios from "axios";

export default axios.create({
  baseURL: "https://automatex-leechers.onrender.com",
  headers: { "Content-Type": "application/json" },
});
