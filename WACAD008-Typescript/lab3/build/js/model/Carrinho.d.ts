import { Produto } from "./Produto.js";
export declare class Carrinho {
    private produtos;
    adicionar<T extends Produto>(produto: T): void;
    remover(indice: number): void;
    getProdutos(): Produto[];
    getTotal(): number;
    getQuantidade(): number;
}
//# sourceMappingURL=Carrinho.d.ts.map