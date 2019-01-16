"use strict";

// DOM
const mainHeaderIcon = document.querySelector(".main-logo__icon");
const mainHeaderNav = document.querySelector(".main-header__nav");

const mainLogo = document.querySelector(".main-logo");

const clearDataBase = document.querySelector("#clearDataBase");

const mainContent = document.querySelector("#main-content");
const formContent = document.querySelector("#form-content");

const mainForm = document.querySelector(".main-form");

const newHeroName = document.querySelector("#newHeroName");
const newHeroImg = document.querySelector("#newHeroImg");
const newHeroPrice = document.querySelector("#newHeroPrice");
const newHeroDesc = document.querySelector("#newHeroDesc");
const submit = document.querySelector("#mainForm");

const addHeroBtn = document.querySelector("#addToCartBtn");
const cart = document.querySelector(".cart");
const price = document.querySelector(".cart__total--red");

const loadHeroes = document.querySelector("#loadHeroes");

const deleteForm = document.querySelector("#deleteForm");
const select = document.querySelector(".main-form__select");

const editForm = document.querySelector("#editForm");

const loader = document.querySelector(".loader");

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

// fetch
function wait(response) {
  loader.classList.toggle("loader--show");
  return response;
}

function fetchHero(url) {
  wait();
  return fetch(url)
    .then(wait)
    .then(checkStatus)
    .then(res => res.json())
    .catch(error => {
      wait();
      alert("Brak połączenia z serverem");
      console.log(error);
    });
}

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function postHero(hero) {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(hero)
  };

  return fetch("http://localhost:3000/heroes", config)
    .then(checkStatus)
    .then(res => res.json());
}

function updateHero(hero) {
  const config = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(hero)
  };

  fetch(`http://localhost:3000/heroes/${hero.name}`, config)
    .then(checkStatus)
    .then(res => res.json());
}

function deleteHero(heroName) {
  const config = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
    // body: JSON.stringify(hero)
  };

  fetch(`http://localhost:3000/heroes/${heroName}`, config)
    .then(checkStatus)
    .then(res => res.json());
}

function deleteAllHeroes() {
  const config = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  };

  fetch(`http://localhost:3000/heroes/`, config)
    .then(checkStatus)
    .then(res => res.json());
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
  const modal = document.querySelector(".modal");

  const modalContent = document.querySelector(".modal__content");

  const img = document.querySelector(".modal__img");
  img.setAttribute("src", hero.image);
  img.setAttribute("alt", `Hero ${hero.name}`);

  const wrapper = document.querySelector(".modal__wrapper");

  const title = document.querySelector(".modal__title");
  title.textContent = `I'm the ${hero.name}!`;

  const para = document.querySelector(".modal__desc");
  para.textContent = hero.description;

  const price = document.querySelector(".modal__price");
  price.textContent = `WYNAJEM: ${hero.price} ZŁ/H`;

  const addBtn = document.querySelector(".modal__btn");
  if (hero.isAvailable === false) {
    addBtn.classList.add("modal__btn--disable");
    addBtn.textContent = "NIEDOSTĘPNY";
  } else {
    addBtn.classList.remove("modal__btn--disable");
    addBtn.textContent = "Dodaj do koszyka";
  }

  const closeBtn = document.querySelector(".modal__close");

  modal.classList.add("modal--show");

  modal.addEventListener("click", event => {
    if (event.target === closeBtn || event.target === modal) {
      modal.classList.remove("modal--show");
    }
  });

  modalContent.addEventListener("click", event => {
    if (event.target.tagName === "BUTTON" && hero.isAvailable === true) {
      addHeroToCart(hero);
      modal.classList.remove("modal--show");
    }
  });
}

// info modal
function infoModal(text) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.classList.add("modal--show");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal__content");
  modalContent.classList.add("modal__content--ef");

  const title = document.createElement("h2");
  title.classList.add("modal__title");
  title.classList.add("modal__title--info");
  title.textContent = text;

  const closeBtn = document.createElement("span");
  closeBtn.classList.add("modal__close");
  closeBtn.innerHTML = "&times;";

  modalContent.appendChild(title);
  modalContent.appendChild(closeBtn);
  modal.appendChild(modalContent);

  formContent.appendChild(modal);

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

  let heroesCart = [];

  if (localStorage.getItem("heroesCart")) {
    heroesCart = JSON.parse(localStorage.getItem("heroesCart"));
  }

  if (!heroesCart.some(item => item.name === hero.name)) {
    heroesCart.push(hero);

    localStorage.setItem("heroesCart", JSON.stringify(heroesCart));
    updateHero(hero);

    updatePrice();
  }
}

// Load Cart from Local Storage
const localCart = JSON.parse(localStorage.getItem("heroesCart"));
if (cart && localCart) {
  fetchHero("http://localhost:3000/heroes")
    .then(heroes => heroes.map(hero => hero.name))
    .then(heroName => {
      localStorage.clear();
      localCart.forEach(hero => {
        if (hero.isAvailable === false && heroName.includes(hero.name)) {
          addHeroToCart(hero);
        }
      });
      updatePrice();
    });
}

// Remove hero from cart
if (cart) {
  cart.addEventListener("click", event => {
    if (event.target.tagName === "BUTTON") {
      const hero = event.target.parentNode.parentNode.id.replace("Cart", "");
      fetchHero(`http://localhost:3000/heroes/${hero}`).then(hero => {
        event.target.parentNode.parentNode.remove();

        const heroesCart = JSON.parse(
          localStorage.getItem("heroesCart")
        ).filter(item => {
          if (item.name !== hero.name) {
            return item;
          }
        });

        localStorage.setItem("heroesCart", JSON.stringify(heroesCart));
        hero.isAvailable = true;
        updateHero(hero);
        updatePrice();

        if (heroesCart.length === 0) {
          cart.style.display = "none";
          localStorage.removeItem("heroesCart");
        }
      });
    }
  });
}

function getPriceSum(cart) {
  return cart.reduce((sum, hero) => {
    sum += parseInt(hero.price);
    return sum;
  }, 0);
}

function updatePrice() {
  const heroesCart = JSON.parse(localStorage.getItem("heroesCart"));
  price.textContent = `${getPriceSum(heroesCart).toFixed(2)} zł`;
}

// Add heroes from server to the DOM
if (mainContent) {
  fetchHero("http://localhost:3000/heroes").then(heroes => {
    heroes.forEach(hero => {
      createHeroCard(hero);
    });
  });

  // Opening modal window
  mainContent.addEventListener("click", event => {
    if (event.target.className === "card__img") {
      const hero = event.target.id;
      fetchHero(`http://localhost:3000/heroes/${hero}`).then(hero => {
        createModal(hero);
      });
    }
  });
}

// Adding new hero to Server & DOM
if (submit) {
  submit.addEventListener("submit", event => {
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

      fetchHero(`http://localhost:3000/heroes`)
        .then(heroes => heroes.map(hero => hero.name))
        .then(hero => {
          if (hero.includes(newHero.name)) {
            infoModal(`${newHero.name} już istnieje w bazie danych.`);
          } else {
            postHero(newHero).then(
              infoModal(`${newHero.name} został dodany do bazy danych.`)
            );
          }
        });
    }
  });
}

// Clearing Local Storage
clearDataBase.addEventListener("click", () => {
  localStorage.clear();
  deleteAllHeroes();
});

// Delete hero
function populateSelect() {
  const selectArr = Array.from(select.children).map(child => child.innerText);

  fetchHero("http://localhost:3000/heroes").then(heroes => {
    heroes.forEach(hero => {
      if (!selectArr.includes(hero.name)) {
        const option = document.createElement("option");
        option.textContent = hero.name;
        select.appendChild(option);
      }
    });
  });
}

if (deleteForm) {
  populateSelect();

  deleteForm.addEventListener("submit", event => {
    event.preventDefault();
    deleteHero(select.value);

    if (localStorage.getItem("heroesCart")) {
      const heroesCart = JSON.parse(localStorage.getItem("heroesCart")).filter(
        item => {
          if (item.name !== select.value) {
            return item;
          }
        }
      );

      localStorage.setItem("heroesCart", JSON.stringify(heroesCart));

      if (heroesCart.length === 0) {
        localStorage.removeItem("heroesCart");
      }
    }

    infoModal(`${select.value} został usunięty z bazy.`);
    Array.from(select.children).forEach((child, index) => {
      if (select.selectedIndex === index && select.selectedIndex !== 0) {
        child.remove();
      }
    });
  });
}

// Edit hero
if (editForm) {
  populateSelect();

  select.addEventListener("change", event => {
    const heroEdit = select.value;

    fetchHero(`http://localhost:3000/heroes/${heroEdit}`).then(hero => {
      newHeroDesc.value = hero.description;
      newHeroImg.value = hero.image;
      newHeroPrice.value = hero.price;
    });
  });

  editForm.addEventListener("submit", event => {
    event.preventDefault();
    const editFormArr = Array.from(editForm);

    let formError = false;
    editFormArr.forEach(input => {
      if (!input.value) {
        input.classList.add("main-form--alert");
        formError = true;
      } else {
        input.classList.remove("main-form--alert");
      }
    });

    if (!formError) {
      const newHero = new Hero(
        select.value,
        newHeroDesc.value,
        newHeroImg.value,
        newHeroPrice.value
      );

      const heroesCart = JSON.parse(localStorage.getItem("heroesCart")).map(
        hero => {
          if (hero.name === select.value) {
            newHero.isAvailable = false;
            hero = newHero;
          }
          return hero;
        }
      );

      localStorage.setItem("heroesCart", JSON.stringify(heroesCart));

      updateHero(newHero);
      infoModal(`Zmiany zostały wprowadzone do bazy danych.`);
    }
  });
}

// load heroes from local file
loadHeroes.addEventListener("click", event => {
  event.preventDefault();
  fetchHero("heroes.json").then(heroes => {
    heroes.forEach(hero => {
      postHero(hero);
    });
  });
  location.assign("index.html");
});
