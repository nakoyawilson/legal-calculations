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
  const firstTimeOwner =
    document.querySelector("input[name='first-time-owner']:checked").value ===
    "yes"
      ? true
      : false;
  let feePayable;
  let exemptValue;
  let firstLimit;
  let secondLimit;
  let firstPercentage;
  let secondPercentage;
  let thirdPercentage;
  if (category === "residential house and land") {
    exemptValue = firstTimeOwner ? 1500000 : 850000;
    firstLimit = exemptValue + 400000;
    secondLimit = firstLimit + 500000;
    console.log({ exemptValue, firstLimit, secondLimit });
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
  } else if (category === "non residential") {
    firstLimit = 300000;
    secondLimit = 400000;
    firstPercentage = 0.02;
    secondPercentage = 0.05;
    thirdPercentage = 0.07;
  }
  if (category === "non residential" && propertyValue <= firstLimit) {
    feePayable = `$${formatNumber(propertyValue * firstPercentage)}`;
  } else if (category === "non residential" && propertyValue <= secondLimit) {
    feePayable = `$${formatNumber(propertyValue * secondPercentage)}`;
  } else if (category === "non residential" && propertyValue > secondLimit) {
    feePayable = `$${formatNumber(propertyValue * thirdPercentage)}`;
  } else if (propertyValue <= exemptValue) {
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
