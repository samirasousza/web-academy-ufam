import ProductCard from "../ProductCard/ProductCard";
import { Product } from "@/app/types/product";

interface ProductListProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

export default function ProductList({ products, addToCart }: ProductListProps) {
  return (
    <>
      <h5 className="mb-3">Produtos disponíveis:</h5>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </>
  );
}
