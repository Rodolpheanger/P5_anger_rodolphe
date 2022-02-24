/** Récupération des données de l'API pour tous les produits. */
const fetchItems = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/products");
    return (data = await response.json());
  } catch (error) {
    alert(error);
  }
};

/** Affichage de toutes les cartes produit. */
const itemsDisplay = async () => {
  const itemsData = await fetchItems();
  for (let item of itemsData) {
    const image = itemImageDisplay(item.imageUrl, item.altTxt);
    const nameOfItem = itemNameDisplay(item.name);
    const description = itemDescriptionDisplay(item.description);
    const article = itemArticleDisplay(image, nameOfItem, description);
    const link = itemLinkDisplay(item._id, article);
    itemContainerSelect(link);
  }
};

/** Création du lien d'un produit vers sa page dédiée. */
const itemLinkDisplay = (itemId, article) => {
  const link = document.createElement("a");
  link.setAttribute("href", "./product.html?id=" + itemId);
  link.appendChild(article);
  return link;
};

/** Création de l'article qui contient l'image, le nom et la description d'un produit. */
const itemArticleDisplay = (image, nameOfItem, description) => {
  const article = document.createElement("article");
  article.appendChild(image);
  article.appendChild(nameOfItem);
  article.appendChild(description);
  return article;
};

/** Création de l'image d'un produit. */
const itemImageDisplay = (itemImageUrl, itemAltTxt) => {
  const image = document.createElement("img");
  image.setAttribute("src", itemImageUrl);
  image.setAttribute("alt", itemAltTxt);
  return image;
};

/** Création du nom d'un produit. */
const itemNameDisplay = (itemName) => {
  const nameOfItem = document.createElement("h3");
  nameOfItem.classList.add("productName");
  nameOfItem.textContent = itemName;
  return nameOfItem;
};

/** Création de la description d'un produit. */
const itemDescriptionDisplay = (itemDescription) => {
  const description = document.createElement("p");
  description.classList.add("productDescription");
  description.textContent = itemDescription;
  return description;
};

/** Création du container pour la carte d'un produit. */
const itemContainerSelect = (link) => {
  return document.getElementById("items").appendChild(link);
};

/** Lancement de l'affichage des produits. */
itemsDisplay();
