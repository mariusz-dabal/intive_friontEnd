"use strict";

// DOM
const mainHeaderIcon = document.querySelector(".main-logo__icon");
const mainHeaderNav = document.querySelector(".main-header__nav");

const mainLogo = document.querySelector(".main-logo");

const mainContent = document.querySelector("#main-content");

// Starting Heroes
const heroes = [
	{
		name: "Sumerman",
		description:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem totam voluptatibus ullam dolore dolor eligendi molestiae autem eaque in neque?",
		image: "images/superman.jpg",
		price: "3500",
		isAvailable: true
	},
	{
		name: "Hulk",
		description:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem totam voluptatibus ullam dolore dolor eligendi molestiae autem eaque in neque?",
		image: "images/hulk.jpg",
		price: "250000",
		isAvailable: true
	},
	{
		name: "Thor",
		description:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem totam voluptatibus ullam dolore dolor eligendi molestiae autem eaque in neque?",
		image: "images/thor.jpg",
		price: "55000",
		isAvailable: true
	},
	{
		name: "Ironman",
		description:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem totam voluptatibus ullam dolore dolor eligendi molestiae autem eaque in neque?",
		image: "images/ironman.jpeg",
		price: "75000",
		isAvailable: true
	},
	{
		name: "Potter",
		description:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem totam voluptatibus ullam dolore dolor eligendi molestiae autem eaque in neque?",
		image: "images/harrypotter.jpg",
		price: "125000",
		isAvailable: true
	},
	{
		name: "Batman",
		description:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem totam voluptatibus ullam dolore dolor eligendi molestiae autem eaque in neque?",
		image: "images/batman.jpg",
		price: "2000",
		isAvailable: true
	}
];

// create hero card
function createHero(hero) {
	const card = document.createElement("div");
	card.classList.add("card");

	const img = document.createElement("img");
	img.classList.add("card__img");
	img.setAttribute("src", hero.image);
	img.setAttribute("alt", `Hero ${hero.name}`);
	img.id = hero.name;

	const title = document.createElement("h3");
	title.classList.add("card__title");
	title.textContent = hero.name;

	const price = document.createElement("p");
	price.classList.add("card__price");
	price.textContent = `Cena wynajmu: ${hero.price}zł/h`;

	card.appendChild(img);
	card.appendChild(title);
	card.appendChild(price);
	mainContent.appendChild(card);
}

// create modal window
function createModal(hero) {
	const modal = document.createElement("div");
	modal.classList.add("modal");

	const modalContent = document.createElement("div");
	modalContent.classList.add("modal__content");

	const img = document.createElement("img");
	img.className = "modal__img";
	img.setAttribute("src", hero.image);
	img.setAttribute("alt", `Hero ${hero.name}`);

	const title = document.createElement("h2");
	title.className = "modal__title";
	title.textContent = `I'm ${hero.name}`;

	const para = document.createElement("p");
	para.className = "modal__desc";
	para.textContent = hero.description;

	const price = document.createElement("p");
	price.classList.add("card__price");
	price.textContent = `WYNAJEM: ${hero.price}ZŁ/H`;

	const addBtn = document.createElement("button");
	addBtn.className = "modal__btn";
	addBtn.textContent = "Dodaj do koszyka";

	const closeBtn = document.createElement("span");
	closeBtn.classList.add("modal__close");
	closeBtn.innerHTML = "&times;";

	modalContent.appendChild(img);
	modalContent.appendChild(title);
	modalContent.appendChild(para);
	modalContent.appendChild(addBtn);
	modalContent.appendChild(closeBtn);
	modal.appendChild(modalContent);

	mainContent.appendChild(modal);

	modal.addEventListener("click", event => {
		if (event.target === closeBtn || event.target === modal) {
			modal.remove();
		}
	});
}

// Hamburger menu toggle
mainHeaderIcon.addEventListener("click", () => {
	mainHeaderIcon.classList.toggle("main-logo__icon--active");
	mainHeaderNav.classList.toggle("main-header__nav--active");
});

// Sticky navbar
window.onscroll = function() {
	if (window.pageYOffset >= 1) {
		mainLogo.classList.add("main-logo--sticky");
	} else {
		mainLogo.classList.remove("main-logo--sticky");
	}
};

// Add starting heroes to Local Storage
heroes.forEach(hero => {
	localStorage.setItem(hero.name, JSON.stringify(hero));
});

// Add heroes from Local Storage to the DOM
for (let i = 0; i < localStorage.length; i++) {
	let hero = localStorage.getItem(localStorage.key(i));
	hero = JSON.parse(hero);

	if (hero.isAvailable) {
		createHero(hero);
	}
}

// Opening modal window
mainContent.addEventListener("click", event => {
	if (event.target.className === "card__img") {
		let hero = JSON.parse(localStorage.getItem(event.target.id));
		createModal(hero);
	}
});
