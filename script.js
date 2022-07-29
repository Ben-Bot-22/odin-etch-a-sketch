const DEFAULT_CANVAS = 16;
let isErase = false;

const canvas = document.querySelector(".canvas");
let pixelRows = 16;
let color = "#00a6ff";
let lastColor = "#000000";
let eraseColor = "#FFFFFF";
const root = document.documentElement;

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

const slider = document.querySelector(".slider");
const sliderText = document.querySelector(".slide-label");
const colorInput = document.querySelector(".color-picker");
const clearSwitch = document.querySelector("input[type=checkbox]");
const colorHistory = document.querySelector(".color-history");

clearSwitch.addEventListener("change", toggleErase);
colorHistory.addEventListener("click", useLastColor);

// Update the current slider value
slider.oninput = function () {
  sliderText.innerHTML = `${this.value} x ${this.value}`;
  pixelRows = this.value;
  root.style.setProperty("--pixel-rows", pixelRows);
  makePixels();
};

function makePixels() {
  removeAllChildNodes(canvas);
  for (let i = 0; i < pixelRows * pixelRows; i++) {
    const newPixel = document.createElement("div");
    newPixel.classList.add("pixel");
    newPixel.addEventListener("mouseover", fillPixel);
    newPixel.addEventListener("mousedown", fillPixelClick);
    canvas.appendChild(newPixel);
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function fillPixelClick(e) {
  if (isErase) {
    e.target.style.backgroundColor = eraseColor;
    e.target.classList.remove("filled");
  } else {
    e.target.style.backgroundColor = color;
    e.target.classList.add("filled");
  }
}

function fillPixel(e) {
  if (mouseDown) {
    fillPixelClick(e);
  }
}

function toggleErase() {
  isErase = !isErase;
}

function useLastColor(e) {
  //switch colors
  color = lastColor;
  lastColor = colorInput.value;
  colorInput.value = color;
  root.style.setProperty("--color", color);
  root.style.setProperty("--color-history", lastColor);
}

function eraseCanvas() {
  const pixels = document.querySelectorAll(".filled");
  pixels.forEach((pixel) => {
    pixel.style.backgroundColor = eraseColor;
    pixel.classList.remove("filled");
  });
}

function updateColor(e) {
  lastColor = color;
  root.style.setProperty("--color-history", lastColor);
  color = e.target.value;
  root.style.setProperty("--color", color);
}

function toggleErase(e) {
  if (e.target.checked) {
    isErase = true;
  } else {
    isErase = false;
  }
}

function init() {
  makePixels();
  document.querySelector(".clear-btn").addEventListener("click", eraseCanvas);
  root.style.setProperty("--color", color); // Set default color
  colorInput.addEventListener("input", updateColor);
  colorInput.defaultValue = color;
  (document).on("dragstart", function() {
    return false;
});
}

window.onload = () => {
  init();
};

