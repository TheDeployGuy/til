document.getElementById("app").innerHTML = `
<h1>Hello Parcel!</h1>
<div>
  Look
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>
  for more info about Parcel.
</div>
`;

function myFunction(e) {
  e.preventDefault();
  console.log("blah");
}

document.getElementsByTagName("form")[0].addEventListener("submit", myFunction);
