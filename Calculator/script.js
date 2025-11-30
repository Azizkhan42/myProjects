const display = document.getElementById("display");

function append(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function deleteChar() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = "Error";
  }
}

document.addEventListener("keydown", function (e) {
  if (
    (e.key >= "0" && e.key <= "9") ||
    ["+", "-", "*", "/", "."].includes(e.key)
  ) {
    append(e.key);
  }
  if (e.key === "Enter") calculate();
  if (e.key === "Backspace") deleteChar();
  if (e.key === "Escape") clearDisplay();
});
