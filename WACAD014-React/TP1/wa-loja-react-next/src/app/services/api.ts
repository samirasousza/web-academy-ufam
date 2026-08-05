import axios from "axios";

export const productsApi = axios.create({
  baseURL: "https://ranekapi.origamid.dev/json/api",
});

export const favoriteApi = axios.create({
  baseURL: "https://favorites-json-server-g2hq2vo1l-wa-d60b.vercel.app",
});
