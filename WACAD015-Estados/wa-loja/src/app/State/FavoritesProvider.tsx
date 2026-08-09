"use client";

import { Product } from "../types/product";
import { createContext, ReactNode, useState } from "react";

type FavContextType = {
  favorites: Product[];
  checkIsFavorite: (id: string) => boolean;
  addFavorite: (product: Product) => void;
  removeFavorite: (id: string) => void;
  totalPrice: number;
};

export const FavContext = createContext<FavContextType>({
  favorites: [],
  checkIsFavorite: () => false,
  addFavorite: () => {},
  removeFavorite: () => {},
  totalPrice: 0,
});

interface FavoritesProviderProps {
  children: ReactNode;
}

const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const saveLocalStorage = (newFavorites: Product[]) => {
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }

  const checkIsFavorite = (id: string) => {
    return favorites.some((item) => item.id === id);
  };

  const addFavorite = (product: Product) => {
    setFavorites((current) => [...current, product]);
  };

  const removeFavorite = (id: string) => {
    setFavorites((current) => current.filter((item) => (item.id = id)));
  };

  const totalPrice = favorites.reduce(
    (total, product) => total + Number(product.preco),
    0,
  );

  const values = {
    favorites,
    checkIsFavorite,
    addFavorite,
    removeFavorite,
    totalPrice,
  };

  return <FavContext.Provider value={values}>{children}</FavContext.Provider>;
};

export default FavoritesProvider;
