/** Récupération des données du local storage */
const getLocalStorage = () => {
  return (localStorageData = JSON.parse(window.localStorage.getItem("cart")));
};

/** Récupérations des données */
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

/** Affichage des produits contenus dans le panier */
const cartDisplay = async () => {
  getLocalStorage();
  for (let entry of localStorageData) {
    getItemId(entry.id);
    const itemData = await fetchItemData();
    articleItem(itemId, entry.color);
    itemImageContainer();
    itemImage(itemData.imageUrl, itemData.altTxt);
    itemContentContainer();
    console.log(entry.color);
    console.log(itemId);
    console.log(itemData);
  }
};

const getItemId = (entryId) => {
  return (itemId = entryId);
};

const articleItem = (itemId, itemColor) => {
  return (
    (article = document.createElement("article")),
    article.classList.add("cart__item"),
    (article.dataset.id = `${itemId}`),
    (article.dataset.color = `${itemColor}`),
    document.getElementById("cart__items").appendChild(article)
  );
};

const itemImageContainer = () => {
  return (
    (divImage = document.createElement("div")),
    divImage.classList.add("cart__item__img"),
    document.querySelector(".cart__item").appendChild(divImage)
  );
};

const itemImage = (itemImageUrl, itemAltTxt) => {
  return (
    (image = document.createElement("img")),
    image.setAttribute("src", itemImageUrl),
    image.setAttribute("alt", itemAltTxt),
    document.querySelector(".cart__item__img").appendChild(image)
  );
};

const itemContentContainer = () => {
  return (
    (divItemContentContainer = document.createElement("div")),
    divItemContentContainer.classList.add("cart__item__content"),
    document.getElementById("cart__items").appendChild(divItemContentContainer)
  );
};
cartDisplay();
