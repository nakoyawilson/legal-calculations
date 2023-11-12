const calculationForm = document.querySelector("#calculation-form");
const calculationResults = document.querySelector("#result");
const copyButton = document.querySelector("#copy-btn");

const formatNumber = (numToFormat) => {
  return Number(numToFormat)
    .toFixed(2)
    .split(".")
    .map((num, idx) =>
      idx === 0 ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : num
    )
    .join(".");
};

calculationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const propertyValueInput = document.querySelector("#property-value");
  const formattedPropertyValue = formatNumber(propertyValueInput.value);
  const propertyValue = Number(propertyValueInput.value);
  const tax = 0.005;
  const taxPayable = `$${formatNumber(propertyValue * tax)}`;
  document.querySelector("#value-of-property").textContent =
    formattedPropertyValue;
  calculationResults.textContent = taxPayable;
  document.querySelector("#results-container").style.display = "block";
  propertyValueInput.value = "";
});

copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(calculationResults.textContent);
  copyButton.textContent = "Copied!";
  setTimeout(() => {
    copyButton.textContent = "Copy Results";
  }, 1000);
});
