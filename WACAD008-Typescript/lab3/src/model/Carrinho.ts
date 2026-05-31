import { Produto } from "./Produto.js";

export class Carrinho {

    private produtos: Produto[] = [];

    adicionar<T extends Produto>(
        produto: T
    ): void {

        this.produtos.push(produto);
    }

    remover(indice: number): void {

        this.produtos.splice(indice, 1);
    }

    getProdutos(): Produto[] {

        return this.produtos;
    }

    getTotal(): number {

        return this.produtos.reduce(
            (acc, produto) => acc + produto.valor,
            0
        );
    }

    getQuantidade(): number {

        return this.produtos.length;
    }
}