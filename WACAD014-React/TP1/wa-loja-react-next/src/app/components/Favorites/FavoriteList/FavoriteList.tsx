import { Product } from "@/app/types/product";
import FavoriteItem from "../FavoriteItem/FavoriteItem";

interface FavoriteListProps {
  favoriteItems: Product[];
  removeItemFromFavorite: (id: string) => void;
}

export default function FavoriteList({
  favoriteItems,
  removeItemFromFavorite,
}: FavoriteListProps) {
  return (
    <div className="card mb-4">
      <div className="row card-body">
        <h5 className="card-title mb-4 fw-light">Produtos selecionados</h5>
        <div className="table-responsive">
          <table className="table ">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Valor Unitário</th>
                <th>Quantidade</th>
                <th>Valor Total</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {favoriteItems.map((item) => (
                <FavoriteItem
                  key={item.id}
                  favoriteItem={item}
                  removeItemFromFavorite={removeItemFromFavorite}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
