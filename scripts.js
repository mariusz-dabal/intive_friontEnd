"use strict";

// DOM
const mainHeaderIcon = document.querySelector(".main-logo__icon");
const mainHeaderNav = document.querySelector(".main-header__nav");

const mainLogo = document.querySelector(".main-logo");

const clearDataBase = document.querySelector("#clearDataBase");

const mainContent = document.querySelector("#main-content");

const mainForm = document.querySelector(".main-form");

const newHeroName = document.querySelector("#newHeroName");
const newHeroImg = document.querySelector("#newHeroImg");
const newHeroPrice = document.querySelector("#newHeroPrice");
const newHeroDesc = document.querySelector("#newHeroDesc");

const submit = document.querySelector("#submitBtn");

// Starting Heroes
const defaultHeroes = [
	{
		name: "Sumerman",
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque consectetur sit et ipsam iusto nesciunt, molestiae voluptatum beatae totam. Omnis minus recusandae, odit consequuntur maiores eos nam expedita qui voluptate officia. Autem laboriosam non, tempore laudantium praesentium ad provident? Quidem quo laudantium quibusdam tempora ea dicta. Recusandae, facilis minus. Accusantium!",
		image: "images/superman.jpg",
		price: "3500",
		isAvailable: true
	},
	{
		name: "Hulk",
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque consectetur sit et ipsam iusto nesciunt, molestiae voluptatum beatae totam. Omnis minus recusandae, odit consequuntur maiores eos nam expedita qui voluptate officia. Autem laboriosam non, tempore laudantium praesentium ad provident? Quidem quo laudantium quibusdam tempora ea dicta. Recusandae, facilis minus. Accusantium!",
		image: "images/hulk.jpg",
		price: "250000",
		isAvailable: true
	},
	{
		name: "Thor",
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque consectetur sit et ipsam iusto nesciunt, molestiae voluptatum beatae totam. Omnis minus recusandae, odit consequuntur maiores eos nam expedita qui voluptate officia. Autem laboriosam non, tempore laudantium praesentium ad provident? Quidem quo laudantium quibusdam tempora ea dicta. Recusandae, facilis minus. Accusantium!",
		image: "images/thor.jpg",
		price: "55000",
		isAvailable: true
	},
	{
		name: "Ironman",
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque consectetur sit et ipsam iusto nesciunt, molestiae voluptatum beatae totam. Omnis minus recusandae, odit consequuntur maiores eos nam expedita qui voluptate officia. Autem laboriosam non, tempore laudantium praesentium ad provident? Quidem quo laudantium quibusdam tempora ea dicta. Recusandae, facilis minus. Accusantium!",
		image: "images/ironman.jpeg",
		price: "75000",
		isAvailable: true
	},
	{
		name: "Potter",
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque consectetur sit et ipsam iusto nesciunt, molestiae voluptatum beatae totam. Omnis minus recusandae, odit consequuntur maiores eos nam expedita qui voluptate officia. Autem laboriosam non, tempore laudantium praesentium ad provident? Quidem quo laudantium quibusdam tempora ea dicta. Recusandae, facilis minus. Accusantium!",
		image: "images/harrypotter.jpg",
		price: "125000",
		isAvailable: true
	},
	{
		name: "Batman",
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque consectetur sit et ipsam iusto nesciunt, molestiae voluptatum beatae totam. Omnis minus recusandae, odit consequuntur maiores eos nam expedita qui voluptate officia. Autem laboriosam non, tempore laudantium praesentium ad provident? Quidem quo laudantium quibusdam tempora ea dicta. Recusandae, facilis minus. Accusantium!",
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

	const wrapper = document.createElement("div");
	wrapper.className = "modal__wrapper";

	const title = document.createElement("h2");
	title.className = "modal__title";
	title.textContent = `I'm ${hero.name}!`;

	const para = document.createElement("p");
	para.className = "modal__desc";
	para.textContent = hero.description;

	const price = document.createElement("div");
	price.classList.add("modal__price");
	price.textContent = `WYNAJEM: ${hero.price} ZŁ/H`;

	const addBtn = document.createElement("button");
	addBtn.className = "modal__btn";
	addBtn.textContent = "Dodaj do koszyka";

	const closeBtn = document.createElement("span");
	closeBtn.classList.add("modal__close");
	closeBtn.innerHTML = "&times;";

	modalContent.appendChild(img);
	wrapper.appendChild(title);
	wrapper.appendChild(para);
	wrapper.appendChild(price);
	wrapper.appendChild(addBtn);
	modalContent.appendChild(wrapper);
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
defaultHeroes.forEach(hero => {
	localStorage.setItem(hero.name, JSON.stringify(hero));
});

// Add heroes from Local Storage to the DOM
// ***************** On load probably
// ***************** Make function out of that
if (mainContent) {
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
}

// Adding new hero to Lokal Storage & DOM
// separate JS?
// submit.addEventListener("click", event => {
// 	event.preventDefault();
// 	const mainFormArr = Array.from(mainForm);

// 	mainFormArr.forEach(input => {
// 		if (!input.value) {
// 			console.log(`Missing input: ${input.name}`);
// 		}
// 	});

// 	const newHero = {};
// 	newHero.name = newHeroName.value;
// 	newHero.description = newHeroDesc.value;
// 	newHero.image = newHeroImg.value;
// 	newHero.price = newHeroPrice.value;
// 	newHero.isAvailable = true;

// 	localStorage.setItem(newHero.name, JSON.stringify(newHero));

// 	createHero(newHero);

// 	window.location.href = "index.html";
// });

// Clearing Local Storage
clearDataBase.addEventListener("click", () => {
	localStorage.clear();
});
