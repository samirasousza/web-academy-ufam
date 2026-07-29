import { useFavoriteProduct } from "@/app/hooks/useFavorite";
import { Product } from "@/app/types/product";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

export default function ProductCard(props: ProductCardProps) {
  const { product, addToCart } = props;

  const { addFavorite, isPending } = useFavoriteProduct();

  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        <Image
          src={product.fotos[0].src}
          className="card-img-top"
          alt={product.fotos[0].titulo}
          width={300}
          height={320}
        />
        <div className="card-body bg-light">
          <h5 className="card-title">{product.nome}</h5>
          <p className="card-text text-secondary">R$ {product.preco}</p>
          <button
            className="btn btn-dark d-block w-100"
            type="button"
            onClick={() => addToCart(product)}
          >
            Adicionar no carrinho
          </button>
          <button
            className="btn border border-dark d-block w-100 mt-2"
            type="button"
            onClick={() => addFavorite(product)}
          >
            {isPending ? "Favoritando..." : "Favoritar"}
          </button>
        </div>
      </div>
    </div>
  );
}
