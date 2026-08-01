import { useQuery } from "@tanstack/react-query";
import { getProductData } from "../services/products";

export function useProductDetail(id: string) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["productDetail"],
    queryFn: () => getProductData(id),
  });

  return {product: data, isPending, isError};
}
