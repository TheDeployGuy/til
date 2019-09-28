function addTil(e) {
  e.preventDefault();
  const inputVal = document.querySelector("input").value;
  //  1. Get the table body of the table
  const tableRow = document.querySelector("tbody");
  const newRow = generateNewTableRow(inputVal);
  //  8. Append the new row to the table
  tableRow.appendChild(newRow);
}

function generateNewTableRow(tilSummary: string) {
  //  1. Create a TR for the new row
  const newRow = document.createElement("tr");
  //  2. Create a new TD for the date
  const newDate = document.createElement("td");
  //  3. Add text to the date cell
  newDate.innerHTML = new Date().toISOString();
  //  4. Create a new TD for the title
  const newTitle = document.createElement("td");
  //  5. Add text to the date cell
  newTitle.innerHTML = tilSummary;
  //  6. Append both cells to row
  newRow.appendChild(newDate);
  newRow.appendChild(newTitle);

  return newRow;
}

document.querySelector("form").addEventListener("submit", addTil);
