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
  let firstLimit;
  let secondLimit;
  let thirdLimit;
  let firstPercentage;
  let secondPercentage;
  let thirdPercentage;
  const minFee = 400;
  if (category === "common law") {
    firstLimit = 100000;
    secondLimit = 500000;
    thirdLimit = 20000000;
    firstPercentage = 0.015;
    secondPercentage = 0.0075;
    thirdPercentage = 0.005;
  }
  if (propertyValue <= firstLimit) {
    feePayable = `$${
      propertyValue * firstPercentage > minFee
        ? formatNumber(propertyValue * firstPercentage)
        : formatNumber(minFee)
    }`;
  } else if (propertyValue <= secondLimit) {
    let excess = propertyValue - firstLimit;
    feePayable = `$${formatNumber(
      firstLimit * firstPercentage + excess * secondPercentage
    )}`;
  } else if (propertyValue <= thirdLimit) {
    let excess = propertyValue - secondLimit;
    feePayable = `$${formatNumber(
      firstLimit * firstPercentage +
        (secondLimit - firstLimit) * secondPercentage +
        excess * thirdPercentage
    )}`;
  } else {
    feePayable = "See Schedule 3";
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
