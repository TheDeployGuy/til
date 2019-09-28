function addTil(e) {
  e.preventDefault();
  //  1. Get the table body of the table
  const tableRow = document.querySelector("tbody");
  //  2. Create a TR for the new row
  const newRow = document.createElement("tr");
  //  3. Create a new TD for the date
  const newDate = document.createElement("td");
  //  4. Add text to the date cell
  newDate.innerHTML = new Date().toISOString();
  //  5. Create a new TD for the title
  const newTitle = document.createElement("td");
  //  6. Add text to the date cell
  newTitle.innerHTML = "New row from JS";
  //  7. Append both cells to row
  newRow.appendChild(newDate);
  newRow.appendChild(newTitle);
  //  8. Append the new row to the table
  tableRow.appendChild(newRow);
}

document.getElementsByTagName("form")[0].addEventListener("submit", addTil);
