"use strict";

// DOM
const mainHeaderIcon = document.querySelector(".main-header__icon");
const mainHeaderNav = document.querySelector(".main-header__nav");

// Hamburger menu toggle
mainHeaderIcon.addEventListener("click", () => {
  mainHeaderIcon.classList.toggle("main-header__icon--active");
  mainHeaderNav.classList.toggle("main-header__nav--active");
});
