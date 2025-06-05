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
  const deedInstrumentType = document.querySelector(
    "input[name='deed-instrument-type']:checked"
  ).value;
  const scope =
    document.querySelector("input[name='scope']:checked").value;
  const titleInvestigated =
    document.querySelector("input[name='title-investigated']:checked").value ===
      "yes"
      ? true
      : false;
  const formattedPropertyValue = formatNumber(propertyValueInput.value);
  const propertyValue = Number(propertyValueInput.value);
  let feePayable;
  let firstLimit;
  let secondLimit;
  let thirdLimit;
  let firstPercentage;
  let secondPercentage;
  let thirdPercentage;
  const minFee = category === "common law" ? 400 : category === "real property act" ? 500 : 0;
  if (category === "common law") {
    firstLimit = 100000;
    secondLimit = 500000;
    thirdLimit = 20000000;
    firstPercentage =
      titleInvestigated && scope === "preparing" && (deedInstrumentType === "conveyance" || deedInstrumentType === "gift")
        ? 0.015
        : (!titleInvestigated && scope === "preparing" && (deedInstrumentType === "conveyance" || deedInstrumentType === "gift")) ||
          (titleInvestigated && scope === "revising" && deedInstrumentType === "conveyance") || deedInstrumentType === "assent"
          ? 0.0075
          : 0.00375;
    secondPercentage =
      titleInvestigated && scope === "preparing" && (deedInstrumentType === "conveyance" || deedInstrumentType === "gift")
        ? 0.0075
        : (!titleInvestigated && scope === "preparing" && (deedInstrumentType === "conveyance" || deedInstrumentType === "gift")) ||
          (titleInvestigated && scope === "revising" && deedInstrumentType === "conveyance") || deedInstrumentType === "assent"
          ? 0.00375
          : 0.001875;
    thirdPercentage =
      titleInvestigated && scope === "preparing" && (deedInstrumentType === "conveyance" || deedInstrumentType === "gift")
        ? 0.005
        : (!titleInvestigated && scope === "preparing" && (deedInstrumentType === "conveyance" || deedInstrumentType === "gift")) ||
          (titleInvestigated && scope === "revising" && deedInstrumentType === "conveyance") || deedInstrumentType === "assent"
          ? 0.0025
          : 0.00125;
  } else if (category === "real property act") {
    firstLimit = 25000;
  }
  if (propertyValue <= firstLimit && category === "common law") {
    feePayable = `$${propertyValue * firstPercentage > minFee
      ? formatNumber(propertyValue * firstPercentage)
      : formatNumber(minFee)
      }`;
  } else if (propertyValue <= secondLimit && category === "common law") {
    const excess = propertyValue - firstLimit;
    feePayable = `$${formatNumber(
      firstLimit * firstPercentage + excess * secondPercentage
    )}`;
  } else if (propertyValue <= thirdLimit && category === "common law") {
    const excess = propertyValue - secondLimit;
    feePayable = `$${formatNumber(
      firstLimit * firstPercentage +
      (secondLimit - firstLimit) * secondPercentage +
      excess * thirdPercentage
    )}`;
  } else if (propertyValue > thirdLimit && category === "common law") {
    feePayable = "See Schedule 3";
  } else if (propertyValue <= firstLimit && category === "real property act") {
    const scopeMultiplier = scope === "preparing" ? 1 : 0.25;
    const deedInstrumentTypeMultiplier = deedInstrumentType === "transfer" ? 1 : 0.5;
    feePayable = `$${formatNumber(minFee * scopeMultiplier * deedInstrumentTypeMultiplier)}`;
  } else if (propertyValue > firstLimit && category === "real property act") {
    const scopeMultiplier = scope === "preparing" ? 1 : 0.25;
    const deedInstrumentTypeMultiplier = deedInstrumentType === "transfer" ? 1 : 0.5;
    const excess = propertyValue - firstLimit;
    feePayable = `$${formatNumber(
      (minFee + ((excess / 5000) * 30)) * scopeMultiplier * deedInstrumentTypeMultiplier
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
