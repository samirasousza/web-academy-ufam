import { Produto } from "./Produto.js";

export class TV implements Produto {

    constructor(
        public modelo: string,
        public fabricante: string,
        public valor: number,
        public resolucao: string,
        public tamanhoPolegadas: number
    ) {}
}