import { Aluno } from "./model/Aluno.js";
import { Turma } from "./model/Turma.js";

const turma = new Turma(1, "Educação Física");

function adicionarAluno(
  nome: string,
  idade: number,
  altura: number,
  peso: number,
): void {
  const aluno = new Aluno(Date.now(), nome, idade, altura, peso);

  turma.alunos.push(aluno);

  renderizarAlunos();
  atualizarEstatisticas();
}

function editarAluno(id: number): void {
  const aluno = turma.alunos.find((a) => a.id === id);

  if (!aluno) return;

  const nome = prompt("Nome:", aluno.nomeCompleto);

  const idade = prompt("Idade:", aluno.idade.toString());

  const altura = prompt("Altura:", aluno.altura.toString());

  const peso = prompt("Peso:", aluno.peso.toString());

  aluno.nomeCompleto = nome ?? aluno.nomeCompleto;

  aluno.idade = idade ? Number(idade) : aluno.idade;

  aluno.altura = altura ? Number(altura) : aluno.altura;

  aluno.peso = peso ? Number(peso) : aluno.peso;

  renderizarAlunos();
  atualizarEstatisticas();
}

function removerAluno(id: number): void {
  turma.alunos = turma.alunos.filter((aluno) => aluno.id !== id);

  renderizarAlunos();
  atualizarEstatisticas();
}

function atualizarEstatisticas(): void {
  document.getElementById("numAlunos")!.textContent = turma
    .getNumAlunos()
    .toString();

  document.getElementById("mediaIdades")!.textContent = turma
    .getMediaIdades()
    .toFixed(1);

  document.getElementById("mediaAlturas")!.textContent = turma
    .getMediaAlturas()
    .toFixed(2);

  document.getElementById("mediaPesos")!.textContent = turma
    .getMediaPesos()
    .toFixed(1);
}

function renderizarAlunos(): void {
  const container = document.getElementById("listaAlunos");

  if (!container) return;

  container.innerHTML = "";

  turma.alunos.forEach((aluno) => {
    const card = document.createElement("div");

    card.innerHTML = `
            <h3>${aluno.nomeCompleto}</h3>

            <p>Idade: ${aluno.idade} anos</p>
            <p>Altura: ${aluno.altura} m</p>
            <p>Peso: ${aluno.peso} kg</p>

            <button
                class="editar-btn"
                data-id="${aluno.id}">
                Editar
            </button>

            <button
                class="remover-btn"
                data-id="${aluno.id}">
                Remover
            </button>

            <hr>
        `;

    container.appendChild(card);
  });

  adicionarBotoes();
}

function adicionarBotoes(): void {
  document.querySelectorAll(".remover-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number((btn as HTMLElement).getAttribute("data-id"));

      removerAluno(id);
    });
  });

  document.querySelectorAll(".editar-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number((btn as HTMLElement).getAttribute("data-id"));

      editarAluno(id);
    });
  });
}

const addBtn = document.getElementById("addBtn");

addBtn?.addEventListener("click", () => {
  const nomeInput = document.getElementById("nome") as HTMLInputElement;

  const idadeInput = document.getElementById("idade") as HTMLInputElement;

  const alturaInput = document.getElementById("altura") as HTMLInputElement;

  const pesoInput = document.getElementById("peso") as HTMLInputElement;

  const nome = nomeInput.value.trim();

  if (!nome) {
    alert("Informe o nome do aluno");
    return;
  }

  adicionarAluno(
    nome,
    Number(idadeInput.value),
    Number(alturaInput.value),
    Number(pesoInput.value),
  );

  nomeInput.value = "";
  idadeInput.value = "";
  alturaInput.value = "";
  pesoInput.value = "";
});

renderizarAlunos();
atualizarEstatisticas();