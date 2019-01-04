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

const addHeroBtn = document.querySelector("#addToCartBtn");
const cart = document.querySelector(".cart");
const price = document.querySelector(".cart__total--red");

// Cart
let heroesCart = [];

// Starting Heroes
const defaultHeroes = [
  {
    name: "Superman",
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

// create hero
class Hero {
  constructor(name, description, image, price) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
    this.isAvailable = true;
  }
}

// create hero card
function createHeroCard(hero) {
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
  modalContent.classList.add("modal__content--ef");

  const img = document.createElement("img");
  img.className = "modal__img";
  img.setAttribute("src", hero.image);
  img.setAttribute("alt", `Hero ${hero.name}`);

  const wrapper = document.createElement("div");
  wrapper.className = "modal__wrapper";

  const title = document.createElement("h2");
  title.className = "modal__title";
  title.textContent = `I'm the ${hero.name}!`;

  const para = document.createElement("p");
  para.className = "modal__desc";
  para.textContent = hero.description;

  const price = document.createElement("div");
  price.classList.add("modal__price");
  price.textContent = `WYNAJEM: ${hero.price} ZŁ/H`;

  const addBtn = document.createElement("button");
  addBtn.className = "modal__btn";
  addBtn.id = "addToCartBtn";
  addBtn.textContent = "Dodaj do koszyka";
  if (hero.isAvailable === false) {
    addBtn.classList.add("modal__btn--disable");
    addBtn.textContent = "NIEDOSTĘPNY";
  }

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

// Add hero to cart
function addHeroToCart(hero) {
  cart.style.display = "flex";

  const cartItem = document.createElement("div");
  cartItem.className = "cart__item";
  cartItem.id = `${hero.name}Cart`;

  const cartImg = document.createElement("img");
  cartImg.className = "cart__img";
  cartImg.setAttribute("src", hero.image);
  cartImg.setAttribute("alt", "Hero Thumbnail");

  const cartWrapper = document.createElement("div");
  cartWrapper.className = "cart__wrapper";

  const cartTitle = document.createElement("h3");
  cartTitle.className = "cart__title";
  cartTitle.textContent = hero.name;

  const cartDesc = document.createElement("div");
  cartDesc.className = "cart__desc";
  cartDesc.textContent = hero.description;

  const cartBtn = document.createElement("button");
  cartBtn.className = "cart__btn";
  cartBtn.innerHTML = "Usuń z koszyka | &times;";

  cartWrapper.appendChild(cartTitle);
  cartWrapper.appendChild(cartDesc);
  cartWrapper.appendChild(cartBtn);

  cartItem.appendChild(cartImg);
  cartItem.appendChild(cartWrapper);

  cart.appendChild(cartItem);

  hero.isAvailable = false;
  heroesCart.push(hero);
  localStorage.setItem("heroesCart", JSON.stringify(heroesCart));
  localStorage.setItem(hero.name, JSON.stringify(hero));

  updatePrice();
}

function getPriceSum(cart) {
  return cart.reduce((sum, hero) => {
    sum += parseInt(hero.price);
    return sum;
  }, 0);
}

function updatePrice() {
  let localCart = JSON.parse(localStorage.getItem("heroesCart"));
  price.textContent = `${getPriceSum(localCart).toFixed(2)} zł`;
}

// Remove hero from cart
if (cart) {
  cart.addEventListener("click", event => {
    if (event.target.tagName === "BUTTON") {
      const hero = JSON.parse(
        localStorage.getItem(
          event.target.parentNode.parentNode.id.replace("Cart", "")
        )
      );
      event.target.parentNode.parentNode.remove();

      heroesCart = JSON.parse(localStorage.getItem("heroesCart"));
      heroesCart = heroesCart.filter(item => {
        if (item.name !== hero.name) {
          return item;
        }
      });

      localStorage.setItem("heroesCart", JSON.stringify(heroesCart));
      hero.isAvailable = true;
      localStorage.setItem(hero.name, JSON.stringify(hero));

      updatePrice();

      if (heroesCart.length === 0) {
        cart.style.display = "none";
      }
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

// Load Cart from Local Storage
let localCart = JSON.parse(localStorage.getItem("heroesCart"));
if (cart && localCart) {
  localCart.forEach(hero => {
    if (hero.isAvailable === false) {
      addHeroToCart(hero);
    }
  });
  updatePrice();
}

// Add heroes from Local Storage to the DOM
if (mainContent) {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) !== "heroesCart") {
      let hero = localStorage.getItem(localStorage.key(i));
      hero = JSON.parse(hero);

      createHeroCard(hero);
    }
  }

  // Opening modal window
  mainContent.addEventListener("click", event => {
    if (event.target.className === "card__img") {
      const hero = JSON.parse(localStorage.getItem(event.target.id));
      createModal(hero);

      const modal = document.querySelector(".modal");
      const modalContent = document.querySelector(".modal__content");

      modalContent.addEventListener("click", event => {
        if (event.target.tagName === "BUTTON" && hero.isAvailable === true) {
          addHeroToCart(hero);
          modal.remove();
        }
      });
    }
  });
}

// Adding new hero to Local Storage & DOM
if (submit) {
  submit.addEventListener("click", event => {
    event.preventDefault();
    const mainFormArr = Array.from(mainForm);

    let formError = false;
    mainFormArr.forEach(input => {
      if (!input.value) {
        input.classList.add("main-form--alert");
        formError = true;
      } else {
        input.classList.remove("main-form--alert");
      }
    });

    if (!formError) {
      const newHero = new Hero(
        newHeroName.value,
        newHeroDesc.value,
        newHeroImg.value,
        newHeroPrice.value
      );

      localStorage.setItem(newHero.name, JSON.stringify(newHero));

      window.location.href = "index.html";

      createHeroCard(newHero);
    }
  });
}

// Clearing Local Storage
clearDataBase.addEventListener("click", () => {
  localStorage.clear();
});
