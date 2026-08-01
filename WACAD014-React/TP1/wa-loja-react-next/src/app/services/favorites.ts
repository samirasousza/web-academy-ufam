import { Product } from "../types/product";
import { favoriteApi } from "./api";

export async function addFavorite(product: Product) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return favoriteApi
    .post("/favoritos", product)
    .then((response) => response.data);
}

export async function getFavoriteList() {
  return favoriteApi.get("/favoritos").then((response) => response.data);
}

export async function removeFavoriteProduct(id: string) {
  return favoriteApi.delete<Product>(`/favoritos/${id}`);
}
