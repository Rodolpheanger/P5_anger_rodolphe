//------------------------------------------------------------------------------------
//                          Affichage du contenu du panier
//------------------------------------------------------------------------------------

/** Récupération des données du local storage. */
const getLocalStorage = () => {
  return (localStorageData = JSON.parse(window.localStorage.getItem("cart")));
};

/** Récupérations des données de l'API par id. */
const fetchItemData = async () => {
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
    getItemId(entry.id);
    const itemData = await fetchItemData();
    itemImageDisplay(itemData.imageUrl, itemData.altTxt);
    itemNameDisplay(itemData.name);
    itemColorDisplay(entry.color);
    itemPriceDisplay(itemData.price);
    itemQuantityPreTextDisplay();
    itemQuantityInputDisplay(entry.quantity);
    itemContentSettingsDeleteButtonDisplay();
    createItemQuantityArray(itemQuantityArray, entry.quantity);
    calculateTotalItemsQuantity(itemQuantityArray);
    totalItemsQuantityDisplay(sumItemsQuantity);
    calculateTotalPriceByItem(entry.quantity, itemData.price);
    createItemsTotalPriceArray(itemsTotalPriceArray, totalPriceByItem);
    calculateItemsTotalPrice(itemsTotalPriceArray);
    totalItemsPriceDisplay(sumItemsPrice);
    itemContentSettingsDeleteContainer();
    itemContentSettingsQuantityContainer();
    itemContentSettingsContainer();
    itemContentDescriptionContainer();
    itemContentContainer();
    itemImageContainer();
    itemContainer(itemId, entry.color);
    getCartItemsContainer();
  }
  modifyItemQuantity();
  deleteItem();
};

/** Récupération de l'id de chaque item du panier. */
const getItemId = (entryId) => {
  return (itemId = entryId);
};

/** Pointage de la section HTML qui contient tous les items et ajout à l'intérieur des articles HTML contenant les items du panier. */
const getCartItemsContainer = () => {
  return document.getElementById("cart__items").appendChild(article);
};

/** Création de l'article HTML qui contient un item et ajout à l'intérieur de la div contenant l'image et de celle contenat les détails de l'item (nom, couleur, prix unitaire, quantité) et bouton "supprimer". */
const itemContainer = (itemId, itemColor) => {
  return (
    (article = document.createElement("article")),
    article.classList.add("cart__item"),
    (article.dataset.id = `${itemId}`),
    (article.dataset.color = `${itemColor}`),
    article.appendChild(divImage),
    article.appendChild(divItemContentContainer)
  );
};

/** Création de la div qui contient l'image de l'item et ajout de celle-ci à l'intérieur. */
const itemImageContainer = () => {
  return (
    (divImage = document.createElement("div")),
    divImage.classList.add("cart__item__img"),
    divImage.appendChild(cartItemImage)
  );
};

/** Création et affichage de l'image de l'item. */
const itemImageDisplay = (itemImageUrl, itemAltTxt) => {
  return (
    (cartItemImage = document.createElement("img")),
    cartItemImage.setAttribute("src", itemImageUrl),
    cartItemImage.setAttribute("alt", itemAltTxt)
  );
};

/** Création de la div qui contient les 2 div qui contiennent les détails de l'item (nom, couleur, prix unitaire, quantité) et le bouton "supprimer" et ajout de celles-ci à l'intérieur.  */

const itemContentContainer = () => {
  return (
    (divItemContentContainer = document.createElement("div")),
    divItemContentContainer.classList.add("cart__item__content"),
    divItemContentContainer.appendChild(divItemContentDescriptionContainer),
    divItemContentContainer.appendChild(divItemContentSettingsContainer)
  );
};

/** Création de la div qui contient les détails non modifiables de l'item (nom, couleur, prix unitaire) et ajout de ceux-ci à l'intérieur. */
const itemContentDescriptionContainer = () => {
  return (
    (divItemContentDescriptionContainer = document.createElement("div")),
    divItemContentDescriptionContainer.classList.add(
      "cart__item__content__description"
    ),
    divItemContentDescriptionContainer.appendChild(cartItemName),
    divItemContentDescriptionContainer.appendChild(cartItemColor),
    divItemContentDescriptionContainer.appendChild(cartItemPrice)
  );
};

/** Création et affichage du nom de l'item */
const itemNameDisplay = (itemDataName) => {
  return (
    (cartItemName = document.createElement("h2")),
    (cartItemName.textContent = itemDataName)
  );
};

/** Création et affichage de la couleur de l'item */
const itemColorDisplay = (itemDataColor) => {
  return (
    (cartItemColor = document.createElement("p")),
    (cartItemColor.textContent = itemDataColor)
  );
};

/** Création et affichage du prix de l'item */
const itemPriceDisplay = (itemDataPrice) => {
  return (
    (cartItemPrice = document.createElement("p")),
    (cartItemPrice.textContent = itemDataPrice + " €")
  );
};

/** Création de la div qui contient les 2 div qui contiennent la quantité de l'item  et le button "supprimer" et ajout de celles-ci à l'intérieur. */
const itemContentSettingsContainer = () => {
  return (
    (divItemContentSettingsContainer = document.createElement("div")),
    divItemContentSettingsContainer.classList.add(
      "cart__item__content__settings"
    ),
    divItemContentSettingsContainer.appendChild(
      divItemContentSettingsQuantityContainer
    ),
    divItemContentSettingsContainer.appendChild(
      divItemContentSettingsDeleteContainer
    )
  );
};

/** Création de la div qui contient le pré-texte et l'input de la quantité de l'item et ajout de ceux-ci à l'interieur. */
const itemContentSettingsQuantityContainer = () => {
  return (
    (divItemContentSettingsQuantityContainer = document.createElement("div")),
    divItemContentSettingsQuantityContainer.classList.add(
      "cart__item__content__settings__quantity"
    ),
    divItemContentSettingsQuantityContainer.appendChild(preTextItemQuantity),
    divItemContentSettingsQuantityContainer.appendChild(itemQuantityInput)
  );
};

/** Création et affichage du pré-texte pour la quantité de l'item. */
const itemQuantityPreTextDisplay = () => {
  return (
    (preTextItemQuantity = document.createElement("p")),
    (preTextItemQuantity.textContent = "Qté : ")
  );
};

/** Création et affichage de l'input pour la quantité de l'item. */
const itemQuantityInputDisplay = (itemDataQuantity) => {
  return (
    (itemQuantityInput = document.createElement("input")),
    itemQuantityInput.classList.add("itemQuantity"),
    itemQuantityInput.setAttribute("type", "number"),
    itemQuantityInput.setAttribute("name", "itemQuantity"),
    itemQuantityInput.setAttribute("min", "1"),
    itemQuantityInput.setAttribute("max", "100"),
    itemQuantityInput.setAttribute("value", itemDataQuantity)
  );
};

/** Création de la div qui contient le button "supprimer" et ajout de celui-ci à l'interieur. */
const itemContentSettingsDeleteContainer = () => {
  return (
    (divItemContentSettingsDeleteContainer = document.createElement("div")),
    divItemContentSettingsDeleteContainer.classList.add(
      "cart__item__content__settings__delete"
    ),
    divItemContentSettingsDeleteContainer.appendChild(
      itemContentSettingsDeleteButton
    )
  );
};

/** Création et affichage du button "supprimer" */
const itemContentSettingsDeleteButtonDisplay = () => {
  return (
    (itemContentSettingsDeleteButton = document.createElement("p")),
    itemContentSettingsDeleteButton.classList.add("deleteItem"),
    (itemContentSettingsDeleteButton.textContent = "Supprimer")
  );
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

const setLocalStorage = (cartData) => {
  const cartDataToStringnify = JSON.stringify(cartData);
  window.localStorage.setItem("cart", cartDataToStringnify);
};
//------------------------------------------------------------------------------------
//                                Suppression article
//------------------------------------------------------------------------------------
const deleteItem = () => {
  let deleteItemButton = document.querySelectorAll(".deleteItem");
  console.log(deleteItemButton);
  deleteItemButton.forEach((button) => {
    let itemArticle = button.closest("section > article");
    let itemId = itemArticle.dataset.id;
    let itemColor = itemArticle.dataset.color;
    console.log(itemArticle);
    console.log(itemId);
    console.log(itemColor);
    console.log(localStorageData);
    button.addEventListener("click", () => {
      for (let entry of localStorageData) {
        if (entry.id === itemId && entry.color === itemColor) {
          console.log(localStorageData.indexOf(entry));
          if (
            confirm(
              `Vous allez supprimer cet article de votre panier. \nOK pour confirmer \nANNULER pour revenir au panier`
            )
          ) {
            localStorageData.splice(localStorageData.indexOf(entry), 1),
              setLocalStorage(localStorageData),
              location.reload();
          } else {
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
