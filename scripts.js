"use strict";

// DOM
const mainHeaderIcon = document.querySelector(".main-logo__icon");
const mainHeaderNav = document.querySelector(".main-header__nav");

const mainLogo = document.querySelector(".main-logo");

const mainContent = document.querySelector("#main-content");

// Heroes
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

// Add heroes to the DOM
heroes.forEach(hero => {
	if (hero.isAvailable) {
		const card = document.createElement("div");
		card.classList.add("card");

		const img = document.createElement("img");
		img.classList.add("card__img");
		img.setAttribute("src", hero.image);
		img.setAttribute("alt", `Hero ${hero.name}`);

		const title = document.createElement("h3");
		title.classList.add("card__title");
		title.textContent = hero.name;

		const price = document.createElement("p");
		price.classList.add("card__price");
		price.textContent = `Cena wynajmu: ${hero.price}zł/h`;

		mainContent.appendChild(card);
		card.appendChild(img);
		card.appendChild(title);
		card.appendChild(price);
	}
});
