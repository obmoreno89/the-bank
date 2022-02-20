// -----MODAL OPERATION-----
const info1 = document.getElementById("info1");
const info2 = document.getElementById("info2");
const info3 = document.getElementById("info3");

const button1 = document.querySelector(".button-1");
const button2 = document.querySelector(".button-2");
const button3 = document.querySelector(".button-3");

button1.addEventListener("click", function () {
  info1.classList.remove("hide");
  info2.classList.add("hide");
  info3.classList.add("hide");
});

button2.addEventListener("click", function () {
  info2.classList.remove("hide");
  info1.classList.add("hide");
  info3.classList.add("hide");
});

button3.addEventListener("click", function () {
  info1.classList.add("hide");
  info2.classList.add("hide");
  info3.classList.remove("hide");
});
