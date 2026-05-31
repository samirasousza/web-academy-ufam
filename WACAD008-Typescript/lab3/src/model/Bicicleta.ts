import { Produto } from "./Produto.js";

export class Bicicleta implements Produto {

    constructor(
        public modelo: string,
        public fabricante: string,
        public valor: number,
        public tamanhoAro: number
    ) {}
}