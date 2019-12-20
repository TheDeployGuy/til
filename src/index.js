// @ts-check
function addTil(e) {
  e.preventDefault();
  const inputVal = document.querySelector("input");
  //  1. Get the table body of the table
  const tableRow = document.querySelector("body");
  const newRow = generateNewTilRow(inputVal.value);
  //  2. Append the new row to the table
  tableRow.appendChild(newRow);
  inputVal.value = "";
}

function generateNewTilRow(tilSummary) {
  //  1. Create a TR for the new row
  const newRow = document.createElement("div");
  newRow.className = "row";
  //  2. Create a new TD for the date
  const newDate = document.createElement("time");
  //  3. Add text to the date cell
  newDate.innerHTML = new Intl.DateTimeFormat("en-GB").format(new Date());
  //  4. Create a new TD for the title
  const newTitle = document.createElement("p");
  //  5. Add text to the date cell
  newTitle.innerHTML = tilSummary;
  //  6. Append both cells to row
  newRow.appendChild(newDate);
  newRow.appendChild(newTitle);

  return newRow;
}

document.querySelector("form").addEventListener("submit", addTil);

// Only register the service worker if its available in the browser.
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("../sw.js").then(_ => {
    console.log("Service worker registered");
  });
}
