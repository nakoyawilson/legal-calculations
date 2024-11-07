const calculationForm = document.querySelector("#calculation-form");
const calculationResults = document.querySelector("#result");
const copyButton = document.querySelector("#copy-btn");

calculationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const estateValueInput = document.querySelector("#estate-value");
  const formattedEstateValue = Number(estateValueInput.value)
    .toFixed(2)
    .split(".")
    .map((num, idx) =>
      idx === 0 ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : num
    )
    .join(".");
  const estateValue = Number(estateValueInput.value);
  let feePayable;
  if (estateValue <= 50000) {
    feePayable = "Twenty-Five Dollars ($25.00)";
  } else if (estateValue <= 100000) {
    feePayable = "Fifty Dollars ($50.00)";
  } else if (estateValue <= 250000) {
    feePayable = "Seventy-Five Dollars ($75.00)";
  } else if (estateValue <= 400000) {
    feePayable = "One Hundred Dollars ($100.00)";
  } else if (estateValue <= 500000) {
    feePayable = "Two Hundred Dollars ($200.00)";
  } else if (estateValue <= 750000) {
    feePayable = "Three Hundred Dollars ($300.00)";
  } else if (estateValue <= 1000000) {
    feePayable = "Four Hundred Dollars ($400.00)";
  } else {
    feePayable = "Five Hundred Dollars ($500.00)";
  }
  document.querySelector("#value-of-estate").textContent = formattedEstateValue;
  calculationResults.textContent = feePayable;
  document.querySelector("#results-container").style.display = "block";
  estateValueInput.value = "";
});

copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(calculationResults.textContent);
  copyButton.textContent = "Copied!";
  setTimeout(() => {
    copyButton.textContent = "Copy Results";
  }, 1000);
});
