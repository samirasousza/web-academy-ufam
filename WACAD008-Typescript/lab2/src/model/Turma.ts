import { Aluno } from "./Aluno.js";

export class Turma {

    constructor(
        public id: number,
        public nome: string,
        public alunos: Aluno[] = []
    ) {}

    private calcularMedia(
        seletor: (aluno: Aluno) => number
    ): number {

        if (this.alunos.length === 0) {
            return 0;
        }

        const soma = this.alunos.reduce(
            (acc, aluno) => acc + seletor(aluno),
            0
        );

        return soma / this.alunos.length;
    }

    getNumAlunos(): number {
        return this.alunos.length;
    }

    getMediaIdades(): number {
        return this.calcularMedia(
            aluno => aluno.idade
        );
    }

    getMediaAlturas(): number {
        return this.calcularMedia(
            aluno => aluno.altura
        );
    }

    getMediaPesos(): number {
        return this.calcularMedia(
            aluno => aluno.peso
        );
    }
}