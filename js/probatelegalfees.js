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
  const estateValueInput = document.querySelector("#estate-value");
  const formattedEstateValue = formatNumber(estateValueInput.value);
  const estateValue = Number(estateValueInput.value);
  let feePayable;
  const firstLimit = 10000;
  const secondLimit = 250000;
  const firstPercentage = 0.05;
  const secondPercentage = 0.03;
  const thirdPercentage = 0.01;
  const minFee = 500;
  if (estateValue <= firstLimit) {
    feePayable = `$${formatNumber(minFee)}`;
  } else if (estateValue <= secondLimit) {
    let excess = estateValue - firstLimit;
    feePayable = `$${formatNumber(
      firstLimit * firstPercentage + excess * secondPercentage
    )}`;
  } else {
    let excess = estateValue - secondLimit;
    feePayable = `$${formatNumber(
      firstLimit * firstPercentage +
        (secondLimit - firstLimit) * secondPercentage +
        excess * thirdPercentage
    )}`;
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
