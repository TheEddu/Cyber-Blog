document.addEventListener("DOMContentLoaded", () => {
  const disclaimerDiv = document.getElementById("disclaimer");
  if (disclaimerDiv) {
    fetch("../components/disclaimer.html")
      .then(res => res.text())
      .then(html => {
        disclaimerDiv.innerHTML = html;
      });
  }
});