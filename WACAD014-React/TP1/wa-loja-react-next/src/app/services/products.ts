import { productsApi } from "./api";

export function getProductList() {
  return productsApi.get("/produto").then((response) => response.data);
}

export function getProductData(id: string) {
  return productsApi.get(`/produto/${id}`).then((response) => response.data);
}
