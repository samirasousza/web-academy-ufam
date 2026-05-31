export class Carrinho {
    constructor() {
        this.produtos = [];
    }
    adicionar(produto) {
        this.produtos.push(produto);
    }
    remover(indice) {
        this.produtos.splice(indice, 1);
    }
    getProdutos() {
        return this.produtos;
    }
    getTotal() {
        return this.produtos.reduce((acc, produto) => acc + produto.valor, 0);
    }
    getQuantidade() {
        return this.produtos.length;
    }
}
//# sourceMappingURL=Carrinho.js.map