const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");

const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

/* Declaring the array of image filenames */
const imageFilenames = [];
for (let i = 1; i <= 8; i++) {
  imageFilenames.push(`imagens/macaco${i}.jpg`);
}

/* Declaring the alternative text for each image file */
const altTexts = ["i dont speak macacokkj", "macaco sabio", "macaco im just a girl", "macaco ouvindo musica", "macaco na privada", "macaco em duvida", "macaco joao frango", "macacco por mim"];

/* Looping through images */

for (let i = 1; i <= 8; i++) {
  const newImage = document.createElement("img");

  const src = imageFilenames[i - 1];
  newImage.setAttribute("src", src);
  newImage.setAttribute("alt", altTexts[i - 1]);

  thumbBar.appendChild(newImage);

  newImage.addEventListener("click", (e) => {
    displayedImage.setAttribute("src", e.target.getAttribute("src"));
  })
}

const srcValue = (src) => {
    const filename = src.split("/").pop();
}

/* Wiring up the Darken/Lighten button */

btn.addEventListener("click", () => {
  const btnClass = btn.getAttribute("class");
  if (btnClass === "dark") {
    btn.setAttribute("class", "light");
    btn.textContent = "Lighten";
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
  } else {
    btn.setAttribute("class", "dark");
    btn.textContent = "Darken";
    overlay.style.backgroundColor = "rgba(0,0,0,0)";
  }
});