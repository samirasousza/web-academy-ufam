"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getFavoriteList } from "../services/favorite";

export function useFavoriteList() {
  const { mutate, isPending } = useMutation({
    mutationFn: () => getFavoriteList(),

    onSuccess: () => {
      toast.success("Lista de Produto!");
    },

    onError: () => {
      toast.error("Erro ao carregar favoritos.");
    },
  });

  return { getFavoriteList: mutate, isPending };
}
