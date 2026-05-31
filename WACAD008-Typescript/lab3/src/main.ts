import { Carrinho } from "./model/Carrinho.js";
import { TV } from "./model/TV.js";
import { Celular } from "./model/Celular.js";
import { Bicicleta } from "./model/Bicicleta.js";

const carrinho = new Carrinho();

function atualizarCarrinho(): void {

    const lista = document.getElementById("listaProdutos");

    if (!lista) return;

    lista.innerHTML = "";

    carrinho.getProdutos().forEach((produto) => {

        const item = document.createElement("div");

        item.innerHTML = `
            <p>
                ${produto.modelo}
                - ${produto.fabricante}
                - R$ ${produto.valor.toFixed(2)}
            </p>
        `;

        lista.appendChild(item);
    });

    document.getElementById("quantidade")!.textContent =
        carrinho.getQuantidade().toString();

    document.getElementById("total")!.textContent =
        carrinho.getTotal().toFixed(2);
}

const btnAdicionar =
    document.getElementById("btnAdicionar");

btnAdicionar?.addEventListener("click", () => {

    const tipo =
        (document.getElementById("tipo") as HTMLSelectElement)
        .value;

    const modelo =
        (document.getElementById("modelo") as HTMLInputElement)
        .value;

    const fabricante =
        (document.getElementById("fabricante") as HTMLInputElement)
        .value;

    const valor =
        Number(
            (document.getElementById("valor") as HTMLInputElement)
            .value
        );

    const atributo =
        (document.getElementById("atributo") as HTMLInputElement)
        .value;

    switch (tipo) {

        case "tv":

            carrinho.adicionar(
                new TV(
                    modelo,
                    fabricante,
                    valor,
                    atributo,
                    55
                )
            );

            break;

        case "celular":

            carrinho.adicionar(
                new Celular(
                    modelo,
                    fabricante,
                    valor,
                    Number(atributo)
                )
            );

            break;

        case "bicicleta":

            carrinho.adicionar(
                new Bicicleta(
                    modelo,
                    fabricante,
                    valor,
                    Number(atributo)
                )
            );

            break;
    }

    atualizarCarrinho();
});