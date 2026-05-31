import { Aluno } from "./Aluno.js";
export declare class Turma {
    id: number;
    nome: string;
    alunos: Aluno[];
    constructor(id: number, nome: string, alunos?: Aluno[]);
    getNumAlunos(): number;
    getMediaIdades(): number;
    getMediaAlturas(): number;
    getMediaPesos(): number;
}
//# sourceMappingURL=Turma.d.ts.map