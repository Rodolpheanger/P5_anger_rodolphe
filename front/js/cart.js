//------------------------------------------------------------------------------------
//                          Affichage du contenu du panier
//------------------------------------------------------------------------------------

/** Récupération des données du local storage. */
const getLocalStorage = () => {
  return (localStorageData = JSON.parse(window.localStorage.getItem("cart")));
};

/** Envoi du contenu du tableau dans le local storage dans la clé "cart". */
const setLocalStorage = (cartData) => {
  const cartDataToStringnify = JSON.stringify(cartData);
  window.localStorage.setItem("cart", cartDataToStringnify);
};

/** Récupérations des données de l'API par id. */
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

/** Affichage des items contenus dans le panier. */
const cartDisplay = async () => {
  getLocalStorage();

  //--------------- voir pour déclarer les tableaux dans leur fonction respéctive -------
  let itemQuantityArray = [];
  let itemsTotalPriceArray = [];
  for (let entry of localStorageData) {
    const itemId = getItemId(entry.id);
    const itemData = await fetchItemData(itemId);
    itemsDisplay(entry, itemId, itemData);
    createItemQuantityArray(itemQuantityArray, entry.quantity);
    calculateTotalItemsQuantity(itemQuantityArray);
    totalItemsQuantityDisplay(sumItemsQuantity);
    calculateTotalPriceByItem(entry.quantity, itemData.price);
    createItemsTotalPriceArray(itemsTotalPriceArray, totalPriceByItem);
    calculateItemsTotalPrice(itemsTotalPriceArray);
    totalItemsPriceDisplay(sumItemsPrice);
  }
  modifyItemQuantity();
  deleteItem();
};

/** Récupération de l'id de chaque item du panier.
 * @param {string} entryId
 * @return {string}
 */

const getItemId = (entryId) => {
  const itemId = entryId;
  return itemId;
};

/** Pointage de la section HTML qui contient tous les items et ajout à l'intérieur des articles HTML contenant les items du panier.
 * @param {HTMLElement} article
 * @return {HTMLElement} section
 */
const getCartItemsContainer = (article) => {
  return document.getElementById("cart__items").appendChild(article);
};

/** Création de l'article HTML qui contient un item et ajout à l'intérieur de la div contenant l'image et de celle contenat les détails de l'item (nom, couleur, prix unitaire, quantité) et bouton "supprimer".
 * @param {string} itemId
 * @param {string} itemColor
 * @param {HTMLElement} divImage
 * @param {HTMLElement} divItemContentContainer
 * @return {HTMLElement} article
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
 * @return {HTMLElement} div
 */
const createItemImageContainer = (cartItemImage) => {
  const divImage = document.createElement("div");
  divImage.classList.add("cart__item__img");
  divImage.appendChild(cartItemImage);
  return divImage;
};

/** Création et affichage de l'image de l'item.
 * @param {string} itemImageUrl
 * @param {string} itemAltTxt
 * @return {HTMLElement} img
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
 * @return {HTMLElement} div
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
 * @return {HTMLElement} div
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

/** Création et affichage du nom de l'item:
 * @param {string} itemDataName
 * @return {HTMLElement} h2
 * @return {string} name of item
 */
const itemNameDisplay = (itemDataName) => {
  const cartItemName = document.createElement("h2");
  cartItemName.textContent = itemDataName;
  return cartItemName;
};

/** Création et affichage de la couleur de l'item:
 * @param {string} itemDataColor
 * @return {HTMLElement} p
 * @return {string} color of item
 */
const itemColorDisplay = (itemDataColor) => {
  const cartItemColor = document.createElement("p");
  cartItemColor.textContent = itemDataColor;
  return cartItemColor;
};

/** Création et affichage du prix de l'item
 * @param {string} itemDataPrice
 * @return {HTMLElement} p
 * @return {string} price of item

*/
const itemPriceDisplay = (itemDataPrice) => {
  const cartItemPrice = document.createElement("p");
  cartItemPrice.textContent = itemDataPrice + " €";
  return cartItemPrice;
};

/** Création de la div qui contient les 2 div qui contiennent la quantité de l'item  et le button "supprimer" et ajout de celles-ci à l'intérieur.
 * @param {HTMLElement} divItemContentSettingsQuantityContainer
 * @param {HTMLElement} divItemContentSettingsQuantityContainer
 * @return {HTMLElement} div
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
 * @return {HTMLElement} div
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

/** Création et affichage du pré-texte pour la quantité de l'item.
 * @return {HTMLElement} p
 * @return {String} "Qté : "
 */
const itemQuantityPreTextDisplay = () => {
  const preTextItemQuantity = document.createElement("p");
  preTextItemQuantity.textContent = "Qté : ";
  return preTextItemQuantity;
};

/** Création et affichage de l'input pour la quantité de l'item.
 * @param {string} itemDataQuantity
 * @return {HTMLElement} input
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
 * @return {HTMLElement} div
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

/** Création et affichage du button "supprimer" */
const itemContentSettingsDeleteButtonDisplay = () => {
  const itemContentSettingsDeleteButton = document.createElement("p");
  itemContentSettingsDeleteButton.classList.add("deleteItem");
  itemContentSettingsDeleteButton.textContent = "Supprimer";
  return itemContentSettingsDeleteButton;
};

/** Affichade des items du panier
 * @param {object} entry
 * @param {string} itemId
 * @param {string} itemData
 * @returns {HTMLElements}
 */

const itemsDisplay = (entry, itemId, itemData) => {
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

//----------------- voir pour déclarer le tableau ici -------------------------------
/** Push de la quantité définie pour chaque item du panier dans le tableau en la convertissant en "number". */
const createItemQuantityArray = (itemQuantityArray, itemDataQuantity) => {
  return (
    (itemDataQuantityToNumber = Number.parseInt(itemDataQuantity)),
    itemQuantityArray.push(itemDataQuantityToNumber)
  );
};

/** Calcul de la somme du tableau contenant les quantité d'item. */
const calculateTotalItemsQuantity = (itemQuantityArray) => {
  return (
    (sumItemsQuantity = 0),
    (sumItemsQuantity = itemQuantityArray.reduce((a, b) => a + b))
  );
};

/** Affichage du nombre total d'item du panier dans la span correspondante. */
const totalItemsQuantityDisplay = (sumItemsQuantity) => {
  return (document.getElementById("totalQuantity").textContent =
    sumItemsQuantity);
};

/** Calcul du prix total par item du panier (quantité * prix unitaire). */
const calculateTotalPriceByItem = (itemQuantity, itemPrice) => {
  return (totalPriceByItem = itemQuantity * itemPrice);
};

//----------------- voir pour déclarer le tableau ici -------------------------------
/** Push du prix total pour chaque item du panier dans le tableau. */
const createItemsTotalPriceArray = (
  itemsTotalPriceArray,
  totolaPriceByItem
) => {
  return itemsTotalPriceArray.push(totolaPriceByItem);
};

/** Calcul du montant total de tous les items du panier. */
const calculateItemsTotalPrice = (itemsTotalPriceArray) => {
  return (
    (sumItemsPrice = 0),
    (sumItemsPrice = itemsTotalPriceArray.reduce((a, b) => a + b))
  );
};

/** Affichage du montant total de tous les items du panier dans la span correspondante. */
const totalItemsPriceDisplay = (sumItemsPrice) => {
  return (document.getElementById("totalPrice").textContent = sumItemsPrice);
};

//------------------------------------------------------------------------------------
//                             Modification quantité
//------------------------------------------------------------------------------------

const modifyItemQuantity = () => {
  let itemQuantityButton = document.querySelectorAll(".itemQuantity");
  itemQuantityButton.forEach((button) => {
    let itemArticle = button.closest("section > article");
    let itemId = itemArticle.dataset.id;
    let itemColor = itemArticle.dataset.color;
    button.addEventListener("change", () => {
      for (let entry of localStorageData) {
        if (entry.id === itemId && entry.color === itemColor) {
          return (
            (entry.quantity = button.value),
            setLocalStorage(localStorageData),
            location.reload()
          );
        }
      }
    });
  });
};

//------------------------------------------------------------------------------------
//                                Suppression article
//------------------------------------------------------------------------------------
const deleteItem = () => {
  let deleteItemButton = document.querySelectorAll(".deleteItem");
  deleteItemButton.forEach((button) => {
    let itemArticle = button.closest("section > article");
    let itemId = itemArticle.dataset.id;
    let itemColor = itemArticle.dataset.color;
    button.addEventListener("click", () => {
      for (let entry of localStorageData) {
        if (entry.id === itemId && entry.color === itemColor) {
          if (
            confirm(
              `Vous allez supprimer cet article de votre panier. \nOK pour confirmer \nANNULER pour revenir au panier`
            )
          ) {
            localStorageData.splice(localStorageData.indexOf(entry), 1),
              setLocalStorage(localStorageData),
              location.reload();
          }
        }
      }
    });
  });
};

//------------------------------------------------------------------------------------
//                                  Formulaire
//------------------------------------------------------------------------------------

/** Lancement de l'affichage des items du panier. */
cartDisplay();
