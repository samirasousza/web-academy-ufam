import { productsApi } from "./api";

export function getProductList() {
  return productsApi.get("/produto").then((response) => response.data);
}
