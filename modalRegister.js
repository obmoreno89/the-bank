modalForm = document.querySelector(".container-modal");
overlay = document.querySelector(".overlay");

buttonCloser = document.getElementById("closer");
buttonForm = document.getElementById("footer-button");

buttonMenuOpen = document.querySelector(".menu");
modalMenu = document.querySelector(".container-nav-menu-list");

buttonCloser.addEventListener("click", function () {
  modalForm.classList.add("hidden");
  overlay.classList.add("hidden");
});

buttonForm.addEventListener("click", function () {
  modalForm.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

//MENU
buttonMenuOpen.addEventListener("click", function (e) {
  e.preventDefault();
  modalMenu.classList.toggle("menu-list");
});
