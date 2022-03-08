//------------------------------------------------------------------------------------
//                          Affichage du contenu du panier
//------------------------------------------------------------------------------------

/** Affichage des items contenus dans le panier, de la quantité total et du prix total + initialisation pour la modification de quantité, la suppression de produit et l'envoi de la commande.
 */
const cartInit = async () => {
  const localStorageData = getLocalStorage();
  if (localStorageData.length === 0) {
    alert(
      `Malheureusement votre panier est vide pour l'instant, mais vous pouvez y ajouter des articles.`
    );
    location.href = "../html/index.html";
  } else {
    await itemsDisplay(localStorageData);
    setOrderInit(localStorageData);
    totalItemsQuantityDisplay(localStorageData);
    totalItemsPriceDisplay(localStorageData);
    modifyItemQuantityInit(localStorageData);
    deleteItemInit(localStorageData);
  }
};

/** Récupération des données du local storage.
 * @returns {array} array of products in local storage
 */
const getLocalStorage = () => {
  const localStorageData =
    JSON.parse(window.localStorage.getItem("cart")) ?? [];
  return localStorageData;
};

/** Envoi du contenu du tableau dans le local storage dans la clé "cart".
 * @param {array} cartData
 * @returns {array} array of products to set in local storage
 */
const setLocalStorage = (cartData) => {
  const cartDataToStringnify = JSON.stringify(cartData);
  window.localStorage.setItem("cart", cartDataToStringnify);
};

/** Récupérations des données de l'API par id.
 * @param {string} itemId
 * @returns {object} product data from the API
 */
const fetchItemData = async (itemId) => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/products/" + itemId
    );
    return (data = await response.json());
  } catch (error) {
    alert(error);
  }
};

/** Récupération de l'id de chaque item du panier.
 * @param {string} entryId
 * @returns {string}
 */
const getItemId = (entryId) => {
  const itemId = entryId;
  return itemId;
};

/** Pointage de la section HTML qui contient tous les items et ajout à l'intérieur des articles HTML contenant les items du panier.
 * @param {HTMLElement} article
 * @returns {HTMLElement} section
 */
const getCartItemsContainer = (article) => {
  return document.getElementById("cart__items").appendChild(article);
};

/** Création de l'article HTML qui contient un item et ajout à l'intérieur de la div contenant l'image et de celle contenat les détails de l'item (nom, couleur, prix unitaire, quantité) et bouton "supprimer".
 * @param {string} itemId
 * @param {string} itemColor
 * @param {HTMLElement} divImage
 * @param {HTMLElement} divItemContentContainer
 * @returns {HTMLElement} article
 */
const createItemContainer = (
  itemId,
  itemColor,
  divImage,
  divItemContentContainer
) => {
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = `${itemId}`;
  article.dataset.color = `${itemColor}`;
  article.appendChild(divImage);
  article.appendChild(divItemContentContainer);
  return article;
};

/** Création de la div qui contient l'image de l'item et ajout de celle-ci à l'intérieur.
 * @param {HTMLElement}cartItemImage
 * @returns {HTMLElement} div
 */
const createItemImageContainer = (cartItemImage) => {
  const divImage = document.createElement("div");
  divImage.classList.add("cart__item__img");
  divImage.appendChild(cartItemImage);
  return divImage;
};

/** Création pour affichage de l'image de l'item.
 * @param {string} itemImageUrl
 * @param {string} itemAltTxt
 * @returns {HTMLElement} img
 */
const itemImageDisplay = (itemImageUrl, itemAltTxt) => {
  const cartItemImage = document.createElement("img");
  cartItemImage.setAttribute("src", itemImageUrl);
  cartItemImage.setAttribute("alt", itemAltTxt);
  return cartItemImage;
};

/** Création de la div qui contient les 2 div qui contiennent les détails de l'item (nom, couleur, prix unitaire, quantité) et le bouton "supprimer" et ajout de celles-ci à l'intérieur.
 * @param {HTMLElement} divItemContentDescriptionContainer
 * @param {HTMLElement} divItemContentSettingsContainer
 * @returns {HTMLElement} div
 */
const createItemContentContainer = (
  divItemContentDescriptionContainer,
  divItemContentSettingsContainer
) => {
  const divItemContentContainer = document.createElement("div");
  divItemContentContainer.classList.add("cart__item__content");
  divItemContentContainer.appendChild(divItemContentDescriptionContainer);
  divItemContentContainer.appendChild(divItemContentSettingsContainer);
  return divItemContentContainer;
};

/** Création de la div qui contient les détails non modifiables de l'item (nom, couleur, prix unitaire) et ajout de ceux-ci à l'intérieur.
 * @param {string} cartItemName
 * @param {string} cartItemColor
 * @param {string} cartItemPrice
 * @returns {HTMLElement} div
 */
const createItemContentDescriptionContainer = (
  cartItemName,
  cartItemColor,
  cartItemPrice
) => {
  const divItemContentDescriptionContainer = document.createElement("div");
  divItemContentDescriptionContainer.classList.add(
    "cart__item__content__description"
  );
  divItemContentDescriptionContainer.appendChild(cartItemName);
  divItemContentDescriptionContainer.appendChild(cartItemColor);
  divItemContentDescriptionContainer.appendChild(cartItemPrice);
  return divItemContentDescriptionContainer;
};

/** Création pour affichage du nom de l'item:
 * @param {string} itemDataName
 * @returns {HTMLElement} h2
 * @returns {string} name of item
 */
const itemNameDisplay = (itemDataName) => {
  const cartItemName = document.createElement("h2");
  cartItemName.textContent = itemDataName;
  return cartItemName;
};

/** Création pour affichage de la couleur de l'item:
 * @param {string} itemDataColor
 * @returns {HTMLElement} p
 * @returns {string} color of item
 */
const itemColorDisplay = (itemDataColor) => {
  const cartItemColor = document.createElement("p");
  cartItemColor.textContent = itemDataColor;
  return cartItemColor;
};

/** Création pour affichage du prix de l'item
 * @param {string} itemDataPrice
 * @returns {HTMLElement} p
 * @returns {string} price of item

*/
const itemPriceDisplay = (itemDataPrice) => {
  const cartItemPrice = document.createElement("p");
  cartItemPrice.textContent = itemDataPrice + " €";
  return cartItemPrice;
};

/** Création de la div qui contient les 2 div qui contiennent la quantité de l'item  et le button "supprimer" et ajout de celles-ci à l'intérieur.
 * @param {HTMLElement} divItemContentSettingsQuantityContainer
 * @param {HTMLElement} divItemContentSettingsQuantityContainer
 * @returns {HTMLElement} div
 */
const createItemContentSettingsContainer = (
  divItemContentSettingsQuantityContainer,
  divItemContentSettingsDeleteContainer
) => {
  const divItemContentSettingsContainer = document.createElement("div");
  divItemContentSettingsContainer.classList.add(
    "cart__item__content__settings"
  );
  divItemContentSettingsContainer.appendChild(
    divItemContentSettingsQuantityContainer
  );
  divItemContentSettingsContainer.appendChild(
    divItemContentSettingsDeleteContainer
  );
  return divItemContentSettingsContainer;
};

/** Création de la div qui contient le pré-texte et l'input de la quantité de l'item et ajout de ceux-ci à l'interieur.
 * @param {HTMLElement} preTextItemQuantity
 * @param {HTMLElement} itemQuantityInput
 * @returns {HTMLElement} div
 */
const createItemContentSettingsQuantityContainer = (
  preTextItemQuantity,
  itemQuantityInput
) => {
  const divItemContentSettingsQuantityContainer = document.createElement("div");
  divItemContentSettingsQuantityContainer.classList.add(
    "cart__item__content__settings__quantity"
  );
  divItemContentSettingsQuantityContainer.appendChild(preTextItemQuantity);
  divItemContentSettingsQuantityContainer.appendChild(itemQuantityInput);
  return divItemContentSettingsQuantityContainer;
};

/** Création pour affichage du pré-texte pour la quantité de l'item.
 * @returns {HTMLElement} p
 * @returns {String} "Qté : "
 */
const itemQuantityPreTextDisplay = () => {
  const preTextItemQuantity = document.createElement("p");
  preTextItemQuantity.textContent = "Qté : ";
  return preTextItemQuantity;
};

/** Création pour affichage de l'input pour la quantité de l'item.
 * @param {string} itemDataQuantity
 * @returns {HTMLElement} input
 */
const itemQuantityInputDisplay = (itemDataQuantity) => {
  const itemQuantityInput = document.createElement("input");
  itemQuantityInput.classList.add("itemQuantity");
  itemQuantityInput.setAttribute("type", "number");
  itemQuantityInput.setAttribute("name", "itemQuantity");
  itemQuantityInput.setAttribute("min", "1");
  itemQuantityInput.setAttribute("max", "100");
  itemQuantityInput.setAttribute("value", itemDataQuantity);
  return itemQuantityInput;
};
/** Création de la div qui contient le button "supprimer" et ajout de celui-ci à l'interieur.
 * @param {HTMLElement} itemContentSettingsDeleteButton
 * @returns {HTMLElement} div
 */
const createItemContentSettingsDeleteContainer = (
  itemContentSettingsDeleteButton
) => {
  const divItemContentSettingsDeleteContainer = document.createElement("div");
  divItemContentSettingsDeleteContainer.classList.add(
    "cart__item__content__settings__delete"
  );
  divItemContentSettingsDeleteContainer.appendChild(
    itemContentSettingsDeleteButton
  );
  return divItemContentSettingsDeleteContainer;
};

/** Création pour affichage du button "supprimer" */
const itemContentSettingsDeleteButtonDisplay = () => {
  const itemContentSettingsDeleteButton = document.createElement("p");
  itemContentSettingsDeleteButton.classList.add("deleteItem");
  itemContentSettingsDeleteButton.textContent = "Supprimer";
  return itemContentSettingsDeleteButton;
};

/** Création pour affichage des items du panier
 * @param {object} entry
 * @param {string} itemId
 * @param {string} itemData
 * @returns {HTMLElements}
 */

const itemDisplay = (entry, itemId, itemData) => {
  const itemQuantityPreText = itemQuantityPreTextDisplay();
  const itemQuantityInput = itemQuantityInputDisplay(entry.quantity);
  const itemContentSettingsDeleteButton =
    itemContentSettingsDeleteButtonDisplay();
  const itemContentSettingsDeleteContainer =
    createItemContentSettingsDeleteContainer(itemContentSettingsDeleteButton);
  const itemContentSettingsQuantityContainer =
    createItemContentSettingsQuantityContainer(
      itemQuantityPreText,
      itemQuantityInput
    );
  const itemContentSettingsContainer = createItemContentSettingsContainer(
    itemContentSettingsQuantityContainer,
    itemContentSettingsDeleteContainer
  );

  const itemPrice = itemPriceDisplay(itemData.price);
  const itemColor = itemColorDisplay(entry.color);
  const itemName = itemNameDisplay(itemData.name);
  const itemContentDescriptionContainer = createItemContentDescriptionContainer(
    itemName,
    itemColor,
    itemPrice
  );
  const itemContentContainer = createItemContentContainer(
    itemContentDescriptionContainer,
    itemContentSettingsContainer
  );
  const itemImage = itemImageDisplay(itemData.imageUrl, itemData.altTxt);
  const itemImageContainer = createItemImageContainer(itemImage);
  const itemContainer = createItemContainer(
    itemId,
    entry.color,
    itemImageContainer,
    itemContentContainer
  );
  getCartItemsContainer(itemContainer);
};

/** Lancement de l'affichage des items
 * @param {object} localStorageData
 */
const itemsDisplay = async (localStorageData) => {
  for (const entry of localStorageData) {
    const itemId = getItemId(entry.id);
    const itemData = await fetchItemData(itemId);
    itemDisplay(entry, itemId, itemData);
  }
};

//------------------------------------------------------------------------------------
//                    Affichage quantité total d'article du panier
//------------------------------------------------------------------------------------

/** Push de la quantité définie pour chaque item du panier dans le tableau en la convertissant en "number".
 * @param {string} itemQuantityArray
 * @param {string} itemDataQuantity
 * @returns {array} contain all the items individual quantity
 */
const pushInEmptyItemQuantityArray = (itemQuantityArray, itemDataQuantity) => {
  const itemDataQuantityToNumber = Number.parseInt(itemDataQuantity);
  itemQuantityArray.push(itemDataQuantityToNumber);
  return itemQuantityArray;
};

/** Calcul de la somme du tableau contenant les quantité d'item.
 * @param {array} itemQuantityArray
 * @returns {number} sum of itemQuantityArray values
 */
const calculateTotalItemsQuantity = (itemQuantityArray) => {
  let sumItemsQuantity = 0;
  sumItemsQuantity = itemQuantityArray.reduce((a, b) => a + b);
  document.getElementById("totalQuantity").textContent = sumItemsQuantity;
  return sumItemsQuantity;
};

/** Affichage du nombre total d'item du panier dans la span correspondante.
 * @param {object} localStorageData
 */
const totalItemsQuantityDisplay = (localStorageData) => {
  let itemQuantityArray = [];
  for (const entry of localStorageData) {
    itemQuantityArray = pushInEmptyItemQuantityArray(
      itemQuantityArray,
      entry.quantity
    );
  }
  calculateTotalItemsQuantity(itemQuantityArray);
};

//------------------------------------------------------------------------------------
//                    Affichage prix total des articles du panier
//------------------------------------------------------------------------------------

/** Calcul du prix total par item du panier (quantité * prix unitaire).
 * @param {string} itemQuantity
 * @param {number} itemPrice
 * @returns {number} total price by item of the cart
 */
const calculateTotalPriceByItem = (itemQuantity, itemPrice) => {
  const totalPriceByItem = itemQuantity * itemPrice;
  return totalPriceByItem;
};

/** Push du prix total pour chaque item du panier dans le tableau.
 * @param {array} itemsTotalPriceArray
 * @param {number} totalaPriceByItem
 * @returns {array} contain all the items total price
 */
const createItemsTotalPriceArray = (
  itemsTotalPriceArray,
  totalaPriceByItem
) => {
  itemsTotalPriceArray.push(totalaPriceByItem);
  return itemsTotalPriceArray;
};

/** Calcul du montant total de tous les items du panier.
 * @param {array} itemsTotalPriceArray
 * @returns {number} total of items cart price
 */
const calculateItemsTotalPrice = (itemsTotalPriceArray) => {
  let itemsTotalPrice = 0;
  itemsTotalPrice = itemsTotalPriceArray.reduce((a, b) => a + b);
  return itemsTotalPrice;
};

/** Affichage du montant total de tous les items du panier dans la span correspondante.
 * @param {number} itemsTotalPrice
 * @returns {HTMLElement} total of items cart price
 */
const totalPriceDisplay = (itemsTotalPrice) => {
  return (document.getElementById("totalPrice").textContent = itemsTotalPrice);
};

/** Lancement de l'affichage du montant total de tous les items du panier dans la span correspondante.
 * @param {object} localStorageData
 * @returns {HTMLElement} total of items cart price
 */
const totalItemsPriceDisplay = async (localStorageData) => {
  let itemsTotalPriceArray = [];
  for (const entry of localStorageData) {
    const itemId = getItemId(entry.id);
    const itemData = await fetchItemData(itemId);
    const totalPriceByItem = calculateTotalPriceByItem(
      entry.quantity,
      itemData.price
    );
    itemsTotalPriceArray = createItemsTotalPriceArray(
      itemsTotalPriceArray,
      totalPriceByItem
    );
  }
  const itemsTotalPrice = calculateItemsTotalPrice(itemsTotalPriceArray);
  totalPriceDisplay(itemsTotalPrice);
};

//------------------------------------------------------------------------------------
//                Modification quantité et suppression d'un article
//------------------------------------------------------------------------------------

/** Récupère l'article HTML qui contient l'article dont l'utilisateur souhaite modifier la quantité ou supprimer et renvoi son id et sa couleur.
 * @param {HTMLElement} button
 * @returns {string} item's id
 * @returns {string} item's color
 */
const getSelectedItemArticle = (button) => {
  const itemArticle = button.closest("section > article");
  const itemId = itemArticle.dataset.id;
  const itemColor = itemArticle.dataset.color;
  return { itemId, itemColor };
};

//------------------------------------
// Modification quantité d'un article
//------------------------------------

/** Modification de la quantité d'un article par l'utilisateur avec mise à jour du nombre total d'articles, du montant total du panier et du local storage. Si quantité saisie manuellement à 0, affichage d'un message d'erreur et recopie,dans l'input, de la quantité présente dans le local storage.
 * @param {HTMLElement} button
 * @param {object} localStorageData
 * @param {string} itemId
 * @param {string} itemColor
 * @returns {object} updated local storage
 * @returns {HTMLElement} span new items total quantity
 * @returns {HTMLElement} span new items total price
 */
const modifyItemQuantity = (button, localStorageData, itemId, itemColor) => {
  button.addEventListener("change", () => {
    itemQuantitySetAtZero(button, localStorageData);
    setNewItemQuantity(localStorageData, itemId, itemColor, button);
  });
};

/** Mise à jour de la quantité affichée, du local storage, de la quantité total d'articles et du montant total du panier suite à modification par l'ultilisateur.
 * @param {HTMLElement} button
 * @param {object} localStorageData
 * @param {string} itemId
 * @param {string} itemColor
 * @returns {object} updated local storage
 * @returns {HTMLElement} span new items total quantity
 * @returns {HTMLElement} span new items total price
 */
const setNewItemQuantity = (localStorageData, itemId, itemColor, button) => {
  for (const entry of localStorageData) {
    if (entry.id === itemId && entry.color === itemColor && button.value > 0) {
      entry.quantity = Number.parseInt(button.value);
      setLocalStorage(localStorageData);
      totalItemsQuantityDisplay(localStorageData);
      totalItemsPriceDisplay(localStorageData);
    }
  }
};

/** Affichage message d'erreur si quantité saisie manuellement à 0 par l'utilisateur avec recopie, dans l'input, de la quantité présente dans le local storage.
 * @param {HTMLElement} button
 * @param {object} localStorageData
 */
const itemQuantitySetAtZero = (button, localStorageData) => {
  if (button.value == 0) {
    alert(
      'La quantité minimum autorisée est de 1. Si vous souhaitez supprimer cet article, merci de cliquer sur "Supprimer"'
    );
    setQuantityToLocalStorageValue(localStorageData, button);
  } else if (button.value > 100) {
    alert("La quantité maximum autorisée est de 100.");
    setQuantityToLocalStorageValue(localStorageData, button);
  }
};

const setQuantityToLocalStorageValue = (localStorageData, button) => {
  for (const entry of localStorageData) {
    button.value = entry.quantity;
    return;
  }
};

/** Initialisation de la modification de la quantité d'un article par l'utilisateur.
 * @param {object} localStorageData
 * @returns {HTMLElement} input for quantity change
 * @returns {string} item's id
 * @returns {string} item's color
 */
const modifyItemQuantityInit = (localStorageData) => {
  document.querySelectorAll(".itemQuantity").forEach((button) => {
    const { itemId, itemColor } = getSelectedItemArticle(button);
    modifyItemQuantity(button, localStorageData, itemId, itemColor);
  });
};

//-------------------------
//Suppression d'un article
//-------------------------

/** Suppression d'un article par l'utilisateur avec mise à jour quantité et prix total du panier.
 * @param {HTMLElement} button
 * @param {object} localStorageData
 * @param {string} itemId
 * @param {string} itemColor
 * @returns {object} updated local storage
 */
const deleteItem = (button, localStorageData, itemId, itemColor) => {
  button.addEventListener("click", () => {
    for (const entry of localStorageData) {
      if (entry.id === itemId && entry.color === itemColor) {
        if (
          confirm(
            `Vous allez supprimer cet article de votre panier. \nOK pour confirmer \nANNULER pour revenir au panier`
          )
        ) {
          localStorageItemRemove(localStorageData, entry);
          itemRemove(itemId, entry);
          setLocalStorage(localStorageData);
          totalItemsQuantityDisplay(localStorageData);
          totalItemsPriceDisplay(localStorageData);
        }
      }
    }
  });
};

/** Supprime l'objet de l'article du panier que l'utilisateur veut supprimer dans le local storage
 * @param {array} localStorageData
 * @param {object} entry
 */
const localStorageItemRemove = (localStorageData, entry) => {
  localStorageData.splice(localStorageData.indexOf(entry), 1);
};

/** Supprime l'élément HTML <article> qui contient l'article du panier que l'utilisateur veut supprimer.
 * @param {string} itemId
 * @param {object} entry
 */
const itemRemove = (itemId, entry) => {
  document
    .querySelector(`article[data-id="${itemId}"][data-color="${entry.color}"]`)
    .remove();
};

/** Initialisation de la suppression d'un item par l'utilisateur
 * @param {object} localStorageData
 * @returns {HTMLElement} button for item delete
 * @returns {string} item's id
 * @returns {string} item's color
 */
const deleteItemInit = (localStorageData) => {
  document.querySelectorAll(".deleteItem").forEach((button) => {
    const { itemId, itemColor } = getSelectedItemArticle(button);
    deleteItem(button, localStorageData, itemId, itemColor);
  });
};

//------------------------------------------------------------------------------------
//                         Formulaire + envoi de la commande
//------------------------------------------------------------------------------------

/** Mise en place d'un listener sur les inputs du formulaire pour vérifier la validité de la saisie
 * @returns {boolean} true if valid else false
 */
const formChecker = () => {
  firstName.addEventListener("input", () => {
    firstNameChecker();
  });
  lastName.addEventListener("input", () => {
    lastNameChecker();
  });
  address.addEventListener("input", () => {
    addressChecker();
  });
  city.addEventListener("input", () => {
    cityChecker();
  });
  email.addEventListener("input", () => {
    emailChecker();
  });
};

/** Vérification de la validité de la saise du champs Prénom ou Nom, avec affichage du message d'erreur sous l'input si non valide.
 * @param {HTMLElement} inputId
 * @param {HTMLElement} errorMessageInput
 * @returns {boolean} true if valid else false
 */
const firstAndLastNameCondition = (inputId, errorMessageInput) => {
  /*RegEx prénom, nom: accepte lettres majuscules, minuscules, les caractères accentués, le tiret et l'espace */
  if (/^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ-\s]+$/i.test(inputId.value)) {
    errorMessageInput.textContent = "";
    return true;
  }
  errorMessageInput.textContent =
    "Saisie non valide: les chiffres et caractères spéciaux ne sont pas autorisés";
  return false;
};

/** Lancement de la vérification de la validité de la saise du champ Prénom
 * @returns {boolean} true if valid else false
 */
const firstNameChecker = () => {
  const firstNameErrorMsgInput = document.getElementById("firstNameErrorMsg");
  return firstAndLastNameCondition(firstName, firstNameErrorMsgInput);
};

/** Lancement de la vérification de la validité de la saise du champ Nom
 * @returns {boolean} true if valid else false
 */
const lastNameChecker = () => {
  const lastNameErrorMsgInput = document.getElementById("lastNameErrorMsg");
  return firstAndLastNameCondition(lastName, lastNameErrorMsgInput);
};

/** Vérification de la validité de la saise du champ Adresse, avec affichage du message d'erreur sous l'input si non valide.
 * @returns {boolean} true if valid else false
 */
const addressChecker = () => {
  const addressErrorMsg = document.getElementById("addressErrorMsg");
  /*RegEx addresse: accepte lettres majuscules, minuscules,les chiffres, les caractères accentués, le tiret, la virgule et l'espace */
  if (/^[a-z0-9,áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ-\s]+$/i.test(address.value)) {
    addressErrorMsg.textContent = "";
    return true;
  }
  addressErrorMsg.textContent =
    "Saisie non valide: les caractères spéciaux ne sont pas autorisés";
  return false;
};

/** Vérification de la validité de la saise du champ Ville, avec affichage du message d'erreur sous l'input si non valide.
 * @returns {boolean} true if valid else false
 */
const cityChecker = () => {
  /*RegEx ville: commence par le code postale à 5 chiffres puis un espace puis accepte les lettres majuscules, minuscules, les caractères accentués, le tiret et l'espace */
  const cityErrorMsg = document.getElementById("cityErrorMsg");
  if (/^[0-9]{5}\s[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\-\s]+$/i.test(city.value)) {
    cityErrorMsg.textContent = "";
    return true;
  }
  cityErrorMsg.textContent =
    "Saisie non valide: saisir le code postal (5 chiffres), suivi du nom de la ville. Les caractères spéciaux ne sont pas autorisés";
  return false;
};

/** Vérification de la validité de la saise du champ Email, avec affichage du message d'erreur sous l'input si non valide.
 * @returns {boolean} true if valid else false
 */
const emailChecker = () => {
  const emailErrorMsg = document.getElementById("emailErrorMsg");
  if (
    /*RegEx email: la partie locale accepte n'importe quel caractère (quantité: minimum 1 et sans limite) sauf <>()[\]\\.,;:\s@\", puis il peut y avoir un point qui sépare une autre suite de caractères qui reprend les mêmes caractèristiques et ainsi de suite jusqu'à l'arobase |OU| si la partie locale est entourée de guillements, accepte n'importe quel caractère à l'intèrieur de ces guillements. Après l'arobase, une addresse ip |OU| un nom de domaine qui accepte lettres, chiffres, tiret et caractères accentués suivi d'un point (peut se répéter plusieurs fois), puis le domaine composé de lettres (minimum 2 et sans limite) */
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-z\-0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]+\.)+[a-z]{2,}))$/i.test(
      email.value
    )
  ) {
    emailErrorMsg.textContent = "";
    return true;
  }
  emailErrorMsg.textContent = "Format Email non valide";
  return false;
};

/** Récupération du booleen généré par les fonctions de vérification.
 * @returns {boolean} true if valid else false
 */
const formValidity = () => {
  return (
    firstNameChecker() &&
    lastNameChecker() &&
    addressChecker() &&
    cityChecker() &&
    emailChecker()
  );
};

/** Récupération des informations saisies par l'utilisateur.
 * @returns {object} firstName, lastName, address, city and email
 */
const getUserData = () => {
  return {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };
};

/** Récupération des id des produits présents dans le panier.
 * @param {array} localStorageData
 * @returns {array} id of cart's products
 */
const getProductsId = (localStorageData) => {
  const productsId = [];
  for (const entry of localStorageData) {
    productsId.push(entry.id);
  }
  return productsId;
};

/** Mise en place du listener sur le formulaire pour l'action "submit" avec récupération du booléen de validation, des infos saisies par l'utilisateur et des id des produits du panier puis lancement de la fonction précédente.
 * @param {array} localStorageData
 */
const formSubmit = (localStorageData) => {
  document
    .querySelector(".cart__order__form")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const formIsValid = formValidity();
      if (formIsValid) {
        setOrder(localStorageData);
      } else {
        alert("Veuillez corriger le ou les champs non valides");
      }
    });
};

/** Envoi de la requete API pour récupérer l'order id.
 * @param {array} localStorageData
 * @returns {string} order id
 */
const fetchPostOrder = async (localStorageData) => {
  const productsId = getProductsId(localStorageData);
  const userData = getUserData();
  try {
    const response = await fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contact: userData, products: productsId }),
    });
    return response.json();
  } catch (error) {
    alert(error);
  }
};

/** Vérifications de la validité des infos saisies par l'utilisateur et si tous les champs sont valides, envoi de la requête à l'API , récupération de l'order id, suppression du contenu du local storage et redirection vers la page confirmation avec ajout de l'order id dans l'url. Si non valides affichage message erreur.
 * @param {array} localStorageData
 */
const setOrder = async (localStorageData) => {
  const orderId = await fetchPostOrder(localStorageData);
  localStorage.clear();
  location.href = `../html/confirmation.html?orderId=${orderId.orderId}`;
};

/** Initialisation des fonctions de vérification du formulaire et de l'envoi de la commande.
 * @param {array} localStorageData
 */
const setOrderInit = (localStorageData) => {
  formChecker();
  formSubmit(localStorageData);
};

//------------------------------------------------------------------------------------
//                                  Initialisation
//------------------------------------------------------------------------------------

/** Lancement de l'initialisation de la page.*/
cartInit();
