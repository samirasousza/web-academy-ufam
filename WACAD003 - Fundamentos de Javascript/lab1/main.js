// 1. COMPLETE VARIABLE AND FUNCTION DEFINITIONS

const customName = document.getElementById("customname");
const randomize = document.querySelector(".randomize");
const story = document.querySelector(".story");

function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

// 2. RAW TEXT STRINGS

const storyText =
  "Apostaram R$100,00 que Bob, :insertx:, não conseguiria :inserty:. Bob aceitou a aposta, mas não esperava que :insertz:.";

const insertXAtaque = ["o center", "o wide receiver", "o quarterback"];
const insertXDefesa = ["o blitzer", "o safety", "o cornerback"];

const insertYAtaque = [
  "fazer o snap",
  "fazer o catch",
  "fazer a rota",
  "fazer o passe",
];
const insertYDefesa = [
  "fazer o tackle",
  "fazer a interceptação",
  "fazer o desvio de passe",
];

const insertZ = [
  "a bola escapasse de suas mãos no último segundo",
  "um defensor aparecesse do nada e acabasse com a jogada",
  "Bob tropeçasse sozinho antes de completar a jogada",
  "o árbitro anulasse tudo por falta",
  "a jogada desse completamente errado",
  "Bob caísse imediatamente após começar",
];

// 3. EVENT LISTENER AND PARTIAL FUNCTION DEFINITION

randomize.addEventListener("click", result);

function result() {
  let newStory = storyText;

  const position = document.getElementById("ataque").checked
    ? "ataque"
    : "defesa";

  let xItem, yItem;

  if (position === "ataque") {
    xItem = randomValueFromArray(insertXAtaque);
    yItem = randomValueFromArray(insertYAtaque);
  } else {
    xItem = randomValueFromArray(insertXDefesa);
    yItem = randomValueFromArray(insertYDefesa);
  }

  newStory = newStory.replace(":insertx:", xItem);
  newStory = newStory.replace(":inserty:", yItem);

  const zItem = randomValueFromArray(insertZ);
  newStory = newStory.replace(":insertz:", zItem);

  if (customName.value !== "") {
    const name = customName.value;
    newStory = newStory.replace("Bob", name);
    newStory = newStory.replace("Bob", name);
    newStory = newStory.replace("Bob", name);
  }

  if (document.getElementById("dolar").checked) {
    const dolar = "$" + Math.round(100 / 4.96);

    newStory = newStory.replace("R$100,00", dolar);
  }

  story.textContent = newStory;
  story.style.visibility = "visible";
}
