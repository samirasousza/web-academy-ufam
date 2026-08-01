"use client";

import { useQuery } from "@tanstack/react-query";
import { getFavoriteList } from "../services/favorites";

export function useFavoriteList() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["favoriteList"],
    queryFn: getFavoriteList,
  });

  return {
    favoriteList: data ?? [],
    isPending,
    isError,
  };
}
