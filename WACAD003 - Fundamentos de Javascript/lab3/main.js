// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to get the color option
function getColorOption() {
  const color = document.querySelector("input[name=color]:checked");
  return color.id;
}

// function to get the shape option
function getShapeOption() {
  const color = document.querySelector("input[name=shape]:checked");
  return color.id;
}

// function to get the rgb by color option
function getColorByOption(option) {
  switch (option) {
    case "azul":
      return `rgb(${random(0, 100)}, ${random(0, 100)}, ${random(0, 255)})`;
    case "vermelho":
      return `rgb(${random(100, 255)}, ${random(0, 100)}, ${random(0, 100)})`;
    case "verde":
      return `rgb(${random(0, 100)}, ${random(100, 255)}, ${random(0, 100)})`;
    default:
      return randomRGB;
  }
}

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Ball constructor
function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
  this.shape = this.shape;
}

Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;

  if (this.shape === "circulo") {
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  if (this.shape === "triangulo") {
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.size, this.y + this.size * 2);
    ctx.lineTo(this.x - this.size, this.y + this.size * 2);
    ctx.closePath();
    ctx.fill();
  }

  if (this.shape === "quadrado") {
    ctx.fillRect(this.x, this.y, this.size * 2, this.size * 2);
  }
};

Ball.prototype.update = function () {
  if (this.x + this.size >= width) {
    this.velX = -this.velX;
  }

  if (this.x - this.size <= 0) {
    this.velX = -this.velX;
  }

  if (this.y + this.size >= height) {
    this.velY = -this.velY;
  }

  if (this.y - this.size <= 0) {
    this.velY = -this.velY;
  }

  this.x += this.velX;
  this.y += this.velY;
};

Ball.prototype.collisionDetect = function () {
  const colorOption = document.getColorOption();
  const shapeOption = document.getShapeOption();

  for (let j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = getColorByOption(colorOption)
      }
    }
  }
};

let balls = [];

while (balls.length < 25) {
  const colorOption = document.getColorOption();
  const shapeOption = document.getShapeOption();

  let size = random(10, 20);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    getColorByOption(colorOption),
    size
  );

  ball.shape(shapeOption);

  balls.push(ball);
}

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();
