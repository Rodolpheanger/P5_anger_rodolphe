/** fonction fetch pour récupérer les données de l'item dans l'API via son id */
const fetchItemData = async () => {
  try {
    // récupération de l'id produit dans l'URL
    const url = new URL(window.location.href);
    const itemId = url.searchParams.get("id");

    const response = await fetch(
      "http://localhost:3000/api/products/" + itemId
    );
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
  }
};

/** Fonction d'affichage des divers éléments de la page */
const productDisplay = async () => {
  const item = await fetchItemData();
  pageTitle(item);
  itemImage(item);
  itemName(item);
  itemPrice(item);
  itemDescription(item);
  itemColors(item);
};
productDisplay();

/**Ajoute le nom du produit dans la balise <title> de la page*/
const pageTitle = (item) => {
  document.title = item.name;
};

// /** ajout de l'image dans le DOM */
const itemImage = (item) => {
  let image = document.createElement("img");
  image.setAttribute("src", item.imageUrl);
  image.setAttribute("alt", item.altTxt);
  document.querySelector(".item__img").appendChild(image);
};

// /** ajout du nom dans le DOM */
const itemName = (item) => {
  document.getElementById("title").textContent = item.name;
};

/** ajout du prix dans le DOM */
const itemPrice = (item) => {
  document.getElementById("price").textContent = item.price;
};

// /** ajout de la description dans le DOM */
const itemDescription = (item) => {
  document.getElementById("description").textContent = item.description;
};

/** ajout des couleurs dans le DOM */
const itemColors = (item) => {
  for (let color of item.colors) {
    let colorOption = new Option(color, color);
    document.getElementById("colors").appendChild(colorOption);
  }
};
//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Logique du panier à revoir !!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
let localStorageData;
let customerChoices;

/** Execute les fonctions necessaires au click sur le bouton "ajouter au panier" */
document.getElementById("addToCart").addEventListener("click", () => {
  const url = new URL(window.location.href);
  const itemId = url.searchParams.get("id");
  const itemNameContainer = document.getElementById("title");
  const itemColorsContainer = document.getElementById("colors");
  const itemQuantityContainer = document.getElementById("quantity");
  checkValidity(itemColorsContainer, itemNameContainer, itemQuantityContainer);
  getLocalStorage(itemId, itemColorsContainer);
  customerChoicesAdd(itemId, itemColorsContainer, itemQuantityContainer);
  setLocalStorage(itemId, itemColorsContainer);
  validation(itemQuantityContainer, itemNameContainer, itemColorsContainer);
});

/** variable du contenu du local storage si trouvé*/
/** Fonction pour importer le contenu du local storage en fonction de l'id et de la couleur choisie par l'utilisateur.
 * @return null si la clé "id-color" n'existe pas
 * @return l'objet {id, color, quantity} si existe déjà
 */
const getLocalStorage = (itemId, itemColorsContainer) => {
  localStorageData = JSON.parse(
    window.localStorage.getItem(itemId + "-" + itemColorsContainer.value)
  );
};

/** Fonction pour envoyer le contenu du choix utilisateur dans le local storage */
const setLocalStorage = (itemId, itemColorsContainer) => {
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
const customerChoicesAdd = (
  itemId,
  itemColorsContainer,
  itemQuantityContainer
) => {
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
};

/** Pop-up de confirmation du modèle, de la couleur et de la quantité du produit ajouté au panier + demande redirection vers acceuil ou panier */
const validation = (
  itemQuantityContainer,
  itemNameContainer,
  itemColorsContainer
) => {
  if (
    confirm(
      `Vous venez d'ajouter ${itemQuantityContainer.value} "${itemNameContainer.textContent}" de couleur ${itemColorsContainer.value} à votre panier. \nCliquez sur OK pour y accéder  \nou sur ANNULER pour continuer vos achats.`
    )
  ) {
    window.location.href = "../html/cart.html";
  } else {
    window.location.href = "../html/index.html";
  }
};

/** Vérification que la couleur et la quantité sont bien renseignées avant validation */
const checkValidity = (
  itemColorsContainer,
  itemNameContainer,
  itemQuantityContainer
) => {
  if (itemColorsContainer.value == "") {
    alert(
      `Veuillez séléctionner une couleur pour votre "${itemNameContainer.textContent}"`
    );
    return;
  } else if (itemQuantityContainer.value == 0) {
    alert(
      `Veuillez indiquer le nombre de "${itemNameContainer.textContent}" que vous souhaitez ajouter au panier`
    );
    return;
  }
};
