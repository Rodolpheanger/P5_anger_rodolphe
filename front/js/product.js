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

/** Pointage de l'input quantité */
const itemQuantityContainer = document.getElementById("quantity");

/** Pointage du bouton "ajouter au panier" */
const cartAddButton = document.getElementById("addToCart");

/** variable qui va contenir le résultat de fetchItemData sous forme d'object */
let item;

/** variable du contenu du local storage si trouvé*/
let localStorageData;

/** objet qui va recevoir les données du choix utilisateur (id, couleur et quantité) pour envoi au local storage */
let customerChoices;

/** fonction fetch pour récupérer les données de l'item dans l'API via son id */
const fetchItemData = async () => {
  await fetch("http://localhost:3000/api/products/" + itemId)
    .then((response) => response.json())
    .then((data) => (item = data))
    .catch((error) => {
      alert(error);
    });
};
fetchItemData();

/** ajout des données du produit dans le DOM (plusieurs fonctions)*/

// /** ajout de l'image dans le DOM */
// const itemImage = async () => {
//   await fetchItemData();
//   let image = document.createElement("img");
//   image.setAttribute("src", item.imageUrl);
//   image.setAttribute("alt", item.altTxt);
//   itemImageContainer.appendChild(image);
// };
// itemImage();

// /** ajout du nom dans le DOM */
// const itemName = async () => {
//   await fetchItemData();
//   itemNameContainer.textContent = item.name;
// };
// itemName();

// /** ajout du prix dans le DOM */
// const itemPrice = async () => {
//   await fetchItemData();
//   itemPriceContainer.textContent = item.price;
// };
// itemPrice();

// /** ajout de la description dans le DOM */
// const itemDescription = async () => {
//   await fetchItemData();
//   itemDescriptionContainer.textContent = item.description;
// };
// itemDescription();

// /** ajout des couleurs dans le DOM */
// const itemColors = async () => {
//   await fetchItemData();
//   for (let color of item.colors) {
//     let colorOption = document.createElement("option");
//     colorOption.setAttribute = ("value", color);
//     colorOption.textContent = color;
//     itemColorsContainer.appendChild(colorOption);
//   }
// };
// itemColors();

/** ajout des données du produit dans le DOM (une seule fonction)*/
const itemDataAdd = async () => {
  await fetchItemData();
  let image = document.createElement("img");
  image.setAttribute("src", item.imageUrl);
  image.setAttribute("alt", item.altTxt);
  itemImageContainer.appendChild(image);
  itemNameContainer.textContent = item.name;
  itemPriceContainer.textContent = item.price;
  itemDescriptionContainer.textContent = item.description;

  for (let color of item.colors) {
    let colorOption = new Option(color, color);

    // let colorOption = document.createElement("option");
    // /* voir pourquoi le setAttribute ne fonctionne pas pour value de option */
    // colorOption.setAttribute = ("value", color);
    // /* ******************************************************************** */
    // colorOption.textContent = color;

    itemColorsContainer.appendChild(colorOption);
  }
};
itemDataAdd();

/** Fonction pour importer le contenu du local storage en fonction de l'id et de la couleur choisie par l'utilisateur.
 * @return null si la clé "id-color" n'existe pas
 * @return l'objet {id, color, quantity} si existe déjà
 */
const getLocalStorage = () => {
  localStorageData = JSON.parse(
    window.localStorage.getItem(itemId + "-" + itemColorsContainer.value)
  );
};

/** Fonction pour envoyer le contenu du choix utilisateur dans le local storage */
const setLocalStorage = () => {
  customerChoices = JSON.stringify(customerChoices);
  window.localStorage.setItem(
    itemId + "-" + itemColorsContainer.value,
    customerChoices
  );
};

/** Fonction qui cherche si la paire id + color est déjà présente dans le local storage:
 *  - si non: crée la clé "id-color" et lui ajoute l'objet contenant les données choisies par l'utilisateur
 *  - si oui: modifie la quantity dans l'objet
 * Envoi le tout dans le local storage
 */
const customerChoicesAdd = () => {
  getLocalStorage();
  if (localStorageData === null) {
    customerChoices = {
      id: itemId,
      color: itemColorsContainer.value,
      quantity: itemQuantityContainer.value,
    };
  } else {
    customerChoices = localStorageData;
    customerChoices.quantity = itemQuantityContainer.value;
  }
  setLocalStorage();
};

/** Pop-up de confirmation du modèle, de la couleur et de la quantité du produit ajouté au panier + demande redirection vers acceuil ou panier */
const validation = () => {
  if (
    confirm(
      `Vous venez d'ajouter ${itemQuantityContainer.value} "${item.name}" de couleur ${itemColorsContainer.value} à votre panier. \nCliquez sur OK pour y accéder maintenant \nou sur ANNULER pour continuer vos achats.`
    )
  ) {
    window.location.href = "../html/cart.html";
  } else {
    window.location.href = "../html/index.html";
  }
};

/** Vérification que la couleur et la quantité sont bien renseignées avant validation */
const checkValidity = () => {
  if (itemColorsContainer.value == "") {
    alert(`Veuillez séléctionner une couleur pour votre "${item.name}"`);
    return;
  } else if (itemQuantityContainer.value == 0) {
    alert(
      `Veuillez indiquer le nombre de "${item.name}" que vous souhaitez ajouter au panier`
    );
    return;
  } else {
    customerChoicesAdd();
    validation();
  }
};

/** Execute la fonction customerchoicesAdd au click sur le bouton "ajouter au panier" */
cartAddButton.addEventListener("click", () => {
  checkValidity();
});
