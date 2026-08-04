"use client";

import { Product } from "../types/product";
import { createContext, ReactNode, useState } from "react";

type FavContextType = {
  favorites: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
};

export const FavContext = createContext<FavContextType>({
  favorites: [],
  setFavorites: () => {},
});

interface FavoritesProviderProps {
  children: ReactNode;
}

const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const values = {
    favorites,
    setFavorites,
  };

  return <FavContext.Provider value={values}>{children}</FavContext.Provider>;
};

export default FavoritesProvider;
