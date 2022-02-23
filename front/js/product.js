//------------------------------------------------------------------------------------
//                            Affichage du produit séléctionné
//------------------------------------------------------------------------------------

/** Récupération de l'id du produit dans l'URL de la page. */
const getItemId = () => {
  return new URL(window.location.href).searchParams.get("id");
};

/** Récupération des données de l'item en cours dans l'API via son id */
const fetchItemData = async () => {
  try {
    const itemId = getItemId();
    const response = await fetch(
      "http://localhost:3000/api/products/" + itemId
    );
    return (data = await response.json());
  } catch (error) {
    alert(error);
  }
};

/** Affichage des divers éléments sur la page pour le produit séléctionné
 * Puis initialisation pour ajout au panier. */
const productPageInit = async () => {
  const item = await fetchItemData();
  pageTitle(item.name);
  itemImage(item.imageUrl, item.altTxt);
  itemName(item.name);
  itemPrice(item.price);
  itemDescription(item.description);
  itemColors(item.colors);
  addToCartInit();
};

/** Ajoute le nom du produit dans la balise <title> de la page. */
const pageTitle = (itemName) => {
  document.title = itemName;
};

// /** ajout de l'image dans le DOM. */
const itemImage = (itemUrl, itemAltTxt) => {
  let image = document.createElement("img");
  image.setAttribute("src", itemUrl);
  image.setAttribute("alt", itemAltTxt);
  document.querySelector(".item__img").appendChild(image);
};

// /** ajout du nom dans le DOM. */
const itemName = (itemName) => {
  document.getElementById("title").textContent = itemName;
};

/** ajout du prix dans le DOM. */
const itemPrice = (itemPrice) => {
  document.getElementById("price").textContent = itemPrice;
};

// /** ajout de la description dans le DOM. */
const itemDescription = (itemDescription) => {
  document.getElementById("description").textContent = itemDescription;
};

/** ajout des couleurs dans le DOM. */
const itemColors = (itemColors) => {
  for (let color of itemColors) {
    let colorOption = new Option(color, color);
    document.getElementById("colors").appendChild(colorOption);
  }
};

//------------------------------------------------------------------------------------
//                                   Ajout au panier
//------------------------------------------------------------------------------------

/** Initialisation du listener et lancement des fonctions necessaires au click sur le bouton "ajouter au panier". */
const addToCartInit = () => {
  document.getElementById("addToCart").addEventListener("click", () => {
    const itemNameContainer = document.getElementById("title");
    const itemColorsContainer = document.getElementById("colors");
    const itemQuantityContainer = document.getElementById("quantity");
    checkValidity(
      itemColorsContainer.value,
      itemNameContainer.textContent,
      itemQuantityContainer.value
    );
  });
};

/** Vérification de la séléction d'une couleur et d'une quantité par l'utilisateur avant ajout au panier:
 * - si non ok: renvoi un message d'alerte.
 * - si ok: lance l'ajout au panier et l'affichage du message de validation. */
const checkValidity = (itemColor, itemName, itemQuantity) => {
  if (itemColor == "") {
    alert(`Veuillez séléctionner une couleur pour votre "${itemName}"`);
  } else if (itemQuantity == 0) {
    alert(
      `Veuillez indiquer le nombre de "${itemName}" que vous souhaitez ajouter au panier`
    );
  } else {
    addToCart(itemColor, itemQuantity);
    validation(itemQuantity, itemName, itemColor);
  }
};

/** Interrogation du contenu du local storage:
 * - Si première utilisation (localeStorageData === null) crée un tableau vide (?? []).
 * - Sinon renvoi le contenu du locale storage sous forme de tableau contenant des objets. */
const getLocalStorage = () => {
  return (localStorageData =
    JSON.parse(window.localStorage.getItem("cart")) ?? []);
};

/** Récupération de l'id du produit séléctionné et du local storage.
 * Création du "modèle" pour l'objet à envoyer dans le local storage.
 * Lancement de la fonction qui crée un nouvel objet ou en modifie un déjà existant. */
const addToCart = (itemColor, itemQuantity) => {
  const itemId = getItemId();
  localStorageData = getLocalStorage(itemId, itemColor);
  const newProduct = {
    id: itemId,
    color: itemColor,
    quantity: itemQuantity,
  };
  createOrModifyEntry(localStorageData, itemId, newProduct);
};

/** Comparaison entre le contenu du local storage et les choix utilisateurs.
 * - Si même id et même couleur existe: modification de la quantité de l'objet existant et envoi au local storage.
 * - Sinon lancement de la fonction pour push un nouvel objet avec les choix utilisateur dans le tableau du local storage. */
const createOrModifyEntry = (localStorageData, itemId, newProduct) => {
  for (let entry of localStorageData) {
    if (entry.id === itemId && entry.color === newProduct.color) {
      return (
        (entry.quantity = newProduct.quantity),
        setLocalStorage(localStorageData)
      );
    }
  }
  newEntryPush(localStorageData, newProduct);
};

/** Push des choix de l'utilisateur dans le tableau et envoi dans le local storage. */
const newEntryPush = (localStorageData, productToPush) => {
  localStorageData.push({
    id: productToPush.id,
    color: productToPush.color,
    quantity: productToPush.quantity,
  }),
    setLocalStorage(localStorageData);
};

/** Envoi du contenu du tableau dans le local storage dans la clé "cart". */
const setLocalStorage = (cartData) => {
  const cartDataToStringnify = JSON.stringify(cartData);
  window.localStorage.setItem("cart", cartDataToStringnify);
};

/** Pop-up de confirmation du modèle, de la couleur et de la quantité du produit ajouté au panier et demande si redirection vers acceuil ou panier */
const validation = (itemQuantity, itemName, itemColor) => {
  if (
    confirm(
      `Vous venez d'ajouter ${itemQuantity} "${itemName}" de couleur ${itemColor} à votre panier. \nCliquez sur OK pour y accéder  \nou sur ANNULER pour continuer vos achats.`
    )
  ) {
    window.location.href = "../html/cart.html";
  } else {
    window.location.href = "../html/index.html";
  }
};

/** Initialisation de la page */
productPageInit();
