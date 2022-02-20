const toggleButton = document.getElementById("toggle--button");

toggleButton.addEventListener("change", function () {
  document.body.classList.toggle("dark");
});
