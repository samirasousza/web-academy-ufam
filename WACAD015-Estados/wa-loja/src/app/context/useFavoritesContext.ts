import { useContext } from "react";
import { FavContext } from "../state/FavoritesProvider";

export function useFavoriteContext() {
  const favoriteContext = useContext(FavContext);

  if (!favoriteContext) {
    throw new Error(
      "useFavoriteContext must be used within a FavoritesProvider",
    );
  }

  return favoriteContext;
}
