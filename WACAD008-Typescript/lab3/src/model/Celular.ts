import { Produto } from "./Produto.js";

export class Celular implements Produto {

    constructor(
        public modelo: string,
        public fabricante: string,
        public valor: number,
        public memoria: number
    ) {}
}