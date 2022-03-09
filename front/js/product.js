//------------------------------------------------------------------------------------
//                            Affichage du produit séléctionné
//------------------------------------------------------------------------------------

/** Récupération de l'id du produit dans l'URL de la page.
 * @returns {string} product id
 */
const getItemId = () => {
  return new URL(window.location.href).searchParams.get("id");
};

/** Récupération des données du produit choisi dans l'API via son id
 * @returns {object} data of product
 */
const fetchItemData = async () => {
  try {
    const itemId = getItemId();
    const response = await fetch(
      "http://localhost:3000/api/products/" + itemId
    );
    return response.json();
  } catch (error) {
    console.log(error);
    alert(
      "Nous rencontrons actuellement des difficultés pour accéder à cet article.\nMerci de réessayer ultèrieurement.\nVeuillez nous excuser pour la gêne occasionnée."
    );
  }
};

/** Affichage des divers éléments sur la page pour le produit séléctionné, puis initialisation pour ajout au panier.
 */
const productPageInit = async () => {
  const item = await fetchItemData();
  pageTitleDisplay(item.name);
  itemImageDisplay(item.imageUrl, item.altTxt);
  itemNameDisplay(item.name);
  itemPriceDisplay(item.price);
  itemDescriptionDisplay(item.description);
  itemColorsDisplay(item.colors);
  addToCartInit();
};

/** Ajout du nom du produit dans la balise <title> de la page.
 * @param {string} itemName
 * @returns {HTMLElement} title
 */
const pageTitleDisplay = (itemName) => {
  document.title = itemName;
};

/** Ajout de l'image dans le DOM.
 * @param {string} itemUrl
 * @param {string} itemAltTxt
 * @returns {HTMLElement} img
 */
const itemImageDisplay = (itemUrl, itemAltTxt) => {
  let image = document.createElement("img");
  image.setAttribute("src", itemUrl);
  image.setAttribute("alt", itemAltTxt);
  document.querySelector(".item__img").appendChild(image);
};

/** Ajout du nom dans le DOM.
 * @param {string} itemName
 * @returns {HTMLElement} text
 */
const itemNameDisplay = (itemName) => {
  document.getElementById("title").textContent = itemName;
};

/** Ajout du prix dans le DOM.
 * @param {string} itemPrice
 * @returns {HTMLElement} text
 */
const itemPriceDisplay = (itemPrice) => {
  document.getElementById("price").textContent = itemPrice;
};

/** Ajout de la description dans le DOM.
 * @param {string} itemDescription
 * @returns {HTMLElement} text
 */
const itemDescriptionDisplay = (itemDescription) => {
  document.getElementById("description").textContent = itemDescription;
};

/** Ajout des couleurs dans le DOM.
 * @param {array} itemColors
 * @returns {HTMLElement} option
 */
const itemColorsDisplay = (itemColors) => {
  for (const color of itemColors) {
    let colorOption = new Option(color, color);
    document.getElementById("colors").appendChild(colorOption);
  }
};

//------------------------------------------------------------------------------------
//                                   Ajout au panier
//------------------------------------------------------------------------------------

/** Mise en place du listener et lancement des fonctions necessaires au click sur le bouton "ajouter au panier". */
const addToCartInit = () => {
  document.getElementById("addToCart").addEventListener("click", () => {
    const itemNameContainer = document.getElementById("title");
    const itemColorsContainer = document.getElementById("colors");
    const itemQuantityContainer = document.getElementById("quantity");
    const itemQuantityContainerValue = Number.parseInt(
      itemQuantityContainer.value
    );
    checkValidity(
      itemColorsContainer.value,
      itemNameContainer.textContent,
      itemQuantityContainerValue
    );
  });
};

/** Vérification de la séléction d'une couleur et d'une quantité comprise entre 1 et 100 par l'utilisateur avant ajout au panier:
 * - si non ok: renvoi un message d'alerte.
 * - si ok: lance l'ajout au panier et l'affichage du message de validation.
 * @param {string} itemColor
 * @param {string} itemName
 * @param {number} itemQuantity
 */
const checkValidity = (itemColor, itemName, itemQuantity) => {
  const itemId = getItemId();
  const localStorageData = getLocalStorage(itemId, itemColor);
  const totalCartQuantityIsOverTheMax = checkTotalCartQuantity(
    localStorageData,
    itemId,
    itemColor,
    itemQuantity,
    itemName
  );
  if (totalCartQuantityIsOverTheMax) {
    return;
  } else if (itemColor == "") {
    alert(`Veuillez séléctionner une couleur pour votre ${itemName}`);
  } else if ((itemQuantity <= 0) | isNaN(itemQuantity)) {
    alert(
      `Veuillez indiquer le nombre de ${itemName} que vous souhaitez ajouter au panier (minimum 1 et maximum 100)`
    );
  } else if (itemQuantity > 100) {
    alert(
      `Vous dépassez le nombre maximum de ${itemName} que vous pouvez ajouter au panier (maximum autorisé 100)`
    );
  } else {
    addToCart(localStorageData, itemId, itemColor, itemQuantity);
    validationMessage(itemQuantity, itemName, itemColor);
  }
};

/** Interrogation du contenu du local storage:
 * - Si première utilisation (localeStorageData === null) crée un tableau vide (?? []).
 * - Sinon renvoi le contenu du locale storage sous forme de tableau contenant des objets.
 * @returns {array} local storage content
 */
const getLocalStorage = () => {
  let localStorageData = JSON.parse(window.localStorage.getItem("cart"));
  console.log(localStorageData);
  if (localStorageData == null) {
    return (localStorageData = []);
  } else {
    return localStorageData;
  }
};

/** Vérification si la quantité totale d'un article déjà existant à ajouter au panier va dépasser 100.
 * Si oui: message alerte
 * @param {array} localStorageData
 * @param {string} itemId
 * @param {string} itemColor
 * @param {number} itemQuantity
 * @param {string} itemName
 * @returns {boolean} true
 */
const checkTotalCartQuantity = (
  localStorageData,
  itemId,
  itemColor,
  itemQuantity,
  itemName
) => {
  for (const entry of localStorageData) {
    if (
      entry.id === itemId &&
      entry.color === itemColor &&
      entry.quantity + itemQuantity > 100
    ) {
      const maxToAdd = 100 - entry.quantity;
      alert(
        `Vous dépassez le nombre maximum de ${itemName} ${itemColor} que vous pouvez avoir dans votre panier (ajout maximum possible ${maxToAdd})`
      );
      return true;
    }
  }
};

/** Récupération de l'id du produit séléctionné et du local storage.
 * Création du "modèle" pour l'objet à envoyer dans le local storage.
 * Lancement de la fonction qui crée un nouvel objet ou en modifie un déjà existant.
 * @param {string} itemColor
 * @param {number} itemQuantity
 */
const addToCart = (localStorageData, itemId, itemColor, itemQuantity) => {
  const newProduct = {
    id: itemId,
    color: itemColor,
    quantity: itemQuantity,
  };
  createOrModifyEntry(localStorageData, itemId, newProduct);
};

/** Comparaison entre le contenu du local storage et les choix utilisateurs.
 * - Si même id et même couleur existe: modification de la quantité de l'objet existant et envoi au local storage.
 * - Sinon lancement de la fonction pour push un nouvel objet avec les choix utilisateur dans le tableau du local storage.
 * @param {array} localStorageData
 * @param {string} itemId
 * @param {object} newProduct
 * @returns {array} datas to set to local storage
 */
const createOrModifyEntry = (localStorageData, itemId, newProduct) => {
  for (const entry of localStorageData) {
    if (
      entry.id === itemId &&
      entry.color === newProduct.color &&
      entry.quantity + newProduct.quantity <= 100
    ) {
      return (
        (entry.quantity += newProduct.quantity),
        setLocalStorage(localStorageData)
      );
    }
  }
  newEntryPush(localStorageData, newProduct);
};

/** Push des choix de l'utilisateur dans le tableau et lancement de la fonction pour envoi dans le local storage.
 * @param {array} localStorageData
 * @param {object} productToPush
 * @returns {array} datas to set to local storage
 */
const newEntryPush = (localStorageData, productToPush) => {
  localStorageData.push({
    id: productToPush.id,
    color: productToPush.color,
    quantity: productToPush.quantity,
  }),
    setLocalStorage(localStorageData);
};

/** Trie du contenu du tableau par id puis envoi vers le local storage dans la clé "cart".
 * @param {object} cartData
 */
const setLocalStorage = (cartData) => {
  cartData.sort((a, b) => {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  });
  const cartDataToStringnify = JSON.stringify(cartData);
  window.localStorage.setItem("cart", cartDataToStringnify);
};

/** Pop-up de confirmation du modèle, de la couleur et de la quantité du produit ajouté au panier et demande si redirection vers acceuil ou panier
 * @param {number} itemQuantity
 * @param {string} itemName
 * @param {string} itemColor
 */
const validationMessage = (itemQuantity, itemName, itemColor) => {
  if (
    confirm(
      `Vous venez d'ajouter ${itemQuantity} ${itemName} ${itemColor} à votre panier. \nCliquez sur OK pour y accéder  \nou sur ANNULER pour continuer vos achats.`
    )
  ) {
    location.href = "../html/cart.html";
  } else {
    location.href = "../html/index.html";
  }
};

//------------------------------------------------------------------------------------
//                                  Initialisation
//------------------------------------------------------------------------------------

/** Lancement de l'initialisation de la page */
productPageInit();
