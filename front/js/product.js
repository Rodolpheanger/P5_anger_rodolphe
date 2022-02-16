/** récupération de l'id produit dans l'URL */

const string = window.location.href;
const url = new URL(string);
const itemId = url.searchParams.get("id");

/** Pointage des divers éléments du DOM à modifier */
const itemImageContainer = document.querySelector(".item__img");
const itemNameContainer = document.getElementById("title");
const itemPriceContainer = document.getElementById("price");
const itemDescriptionContainer = document.getElementById("description");
const itemColorsContainer = document.getElementById("colors");

/** variable qui va contenir le résultat de fetchItemData sous forme d'object */
let item;

/** fonction fetch pour récupérer les données de l'item dans l'API via son id */
const fetchItemData = async () => {
  await fetch("http://localhost:3000/api/products/" + itemId)
    .then((response) => response.json())
    .then((data) => (item = data))
    .catch((error) => {
      alert(error);
    });
  console.log(item);
};
fetchItemData();

/** ajout de l'image dans le DOM */
const itemImage = async () => {
  await fetchItemData();
  let image = document.createElement("img");
  image.setAttribute("src", item.imageUrl);
  image.setAttribute("alt", item.altTxt);
  itemImageContainer.appendChild(image);
};
itemImage();

/** ajout du nom dans le DOM */
const itemName = async () => {
  await fetchItemData();
  itemNameContainer.textContent = item.name;
};
itemName();

/** ajout du prix dans le DOM */
const itemPrice = async () => {
  await fetchItemData();
  itemPriceContainer.textContent = item.price;
};
itemPrice();

/** ajout de la description dans le DOM */
const itemDescription = async () => {
  await fetchItemData();
  itemDescriptionContainer.textContent = item.description;
};
itemDescription();

/** ajout des couleurs dans le DOM */
const itemColors = async () => {
  await fetchItemData();
  for (let color of item.colors) {
    let colorOption = document.createElement("option");
    colorOption.setAttribute = ("value", color);
    colorOption.textContent = color;
    itemColorsContainer.appendChild(colorOption);
  }
};
itemColors();
