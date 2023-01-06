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
  const feeAffidavits = 10;
  const feeExhibits = 2.5;
  const numAffidavits = Number(document.querySelector("#affidavits").value);
  const numExhibits = Number(document.querySelector("#exhibits").value);
  const feePayable = feeAffidavits * numAffidavits + feeExhibits * numExhibits;
  document.querySelector("#num-affidavits").textContent = numAffidavits;
  document.querySelector("#num-exhibits").textContent = numExhibits;
  calculationResults.textContent = `$${formatNumber(feePayable)}`;
  document.querySelector("#results-container").style.display = "block";
  document.querySelector("#affidavits").value = "";
  document.querySelector("#exhibits").value = "";
});

copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(calculationResults.textContent);
  copyButton.textContent = "Copied!";
  setTimeout(() => {
    copyButton.textContent = "Copy Results";
  }, 1000);
});
