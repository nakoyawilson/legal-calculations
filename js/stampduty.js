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
  const category = document.querySelector(
    "input[name='category']:checked"
  ).value;
  const formattedPropertyValue = formatNumber(propertyValueInput.value);
  const propertyValue = Number(propertyValueInput.value);
  let feePayable;
  let exemptValue;
  let firstLimit;
  let secondLimit;
  let firstPercentage;
  let secondPercentage;
  let thirdPercentage;
  if (category === "residential house and land") {
    exemptValue = 850000;
    firstLimit = 1250000;
    secondLimit = 1750000;
    firstPercentage = 0.03;
    secondPercentage = 0.05;
    thirdPercentage = 0.075;
  } else if (category === "residential land only") {
    exemptValue = 450000;
    firstLimit = 650000;
    secondLimit = 850000;
    firstPercentage = 0.02;
    secondPercentage = 0.05;
    thirdPercentage = 0.07;
  }
  if (propertyValue <= exemptValue) {
    feePayable = "Stamp Duty Exempt";
  } else if (propertyValue <= firstLimit) {
    let excess = propertyValue - exemptValue;
    feePayable = `$${formatNumber(excess * firstPercentage)}`;
  } else if (propertyValue <= secondLimit) {
    let excess = propertyValue - firstLimit;
    feePayable = `$${formatNumber(
      (firstLimit - exemptValue) * firstPercentage + excess * secondPercentage
    )}`;
  } else {
    let excess = propertyValue - secondLimit;
    feePayable = `$${formatNumber(
      (firstLimit - exemptValue) * firstPercentage +
        (secondLimit - firstLimit) * secondPercentage +
        excess * thirdPercentage
    )}`;
  }
  document.querySelector("#value-of-property").textContent =
    formattedPropertyValue;
  calculationResults.textContent = feePayable;
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
