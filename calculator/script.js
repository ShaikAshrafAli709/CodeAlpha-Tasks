/* ================= STATE ================= */
let display = document.getElementById("display");
let currentInput = "";
/* ================= UPDATE DISPLAY ================= */
function updateDisplay(value) {
  display.textContent = value || "0";
}
/* ================= INPUT HANDLER ================= */
function handleInput(value) {
  if (value === "." && currentInput.includes(".")) return;
  currentInput += value;
  updateDisplay(currentInput);
}
/* ================= CALCULATE ================= */
function calculate() {
  try {
    if (currentInput === "") return;
    let result = eval(currentInput);
    if (!isFinite(result)) {
      throw Error("Math Error");
    }
    currentInput = result.toString();
    updateDisplay(currentInput);
  } catch {
    updateDisplay("Error");
    currentInput = "";
  }
}
/* ================= CLEAR ================= */
function clearAll() {
  currentInput = "";
  updateDisplay("0");
}
/* ================= DELETE ================= */
function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput);
}
/* ================= CLICK EVENTS ================= */
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;
    const action = btn.dataset.action;
    // visual feedback
    btn.style.filter = "brightness(1.3)";
    setTimeout(() => btn.style.filter = "brightness(1)", 100);
    if (value) handleInput(value);
    if (action === "calculate") calculate();
    if (action === "clear") clearAll();
    if (action === "delete") deleteLast();
  });
});
/* ================= KEYBOARD SUPPORT ================= */
document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key) || ["+", "-", "*", "/", "."].includes(e.key)) {
    handleInput(e.key);
  } else if (e.key === "Enter") {
    calculate();
  } else if (e.key === "Backspace") {
    deleteLast();
  } else if (e.key.toLowerCase() === "c") {
    clearAll();
  }
});