export class Turma {
    constructor(id, nome, alunos = []) {
        this.id = id;
        this.nome = nome;
        this.alunos = alunos;
    }
    getNumAlunos() {
        return this.alunos.length;
    }
    getMediaIdades() {
        if (this.alunos.length === 0)
            return 0;
        const soma = this.alunos.reduce((acc, aluno) => acc + aluno.idade, 0);
        return soma / this.alunos.length;
    }
    getMediaAlturas() {
        if (this.alunos.length === 0)
            return 0;
        const soma = this.alunos.reduce((acc, aluno) => acc + aluno.altura, 0);
        return soma / this.alunos.length;
    }
    getMediaPesos() {
        if (this.alunos.length === 0)
            return 0;
        const soma = this.alunos.reduce((acc, aluno) => acc + aluno.peso, 0);
        return soma / this.alunos.length;
    }
}
//# sourceMappingURL=Turma.js.map