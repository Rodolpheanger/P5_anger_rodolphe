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
    itemImageDisplay(item.imageUrl, item.altTxt);
    itemNameDisplay(item.name);
    itemDescriptionDisplay(item.description);
    itemArticleDisplay();
    itemLinkDisplay(item._id);
    itemContainerSelect();
  }
};

/** Création du lien d'un produit vers sa page dédiée. */
const itemLinkDisplay = (itemId) => {
  return (
    (link = document.createElement("a")),
    link.setAttribute("href", "./product.html?id=" + itemId),
    link.appendChild(article)
  );
};

/** Création de l'article qui contient l'image, le nom et la description d'un produit. */
const itemArticleDisplay = () => {
  return (
    (article = document.createElement("article")),
    article.appendChild(image),
    article.appendChild(nameOfItem),
    article.appendChild(description)
  );
};

/** Création de l'image d'un produit. */
const itemImageDisplay = (itemImageUrl, itemAltTxt) => {
  return (
    (image = document.createElement("img")),
    image.setAttribute("src", itemImageUrl),
    image.setAttribute("alt", itemAltTxt)
  );
};

/** Création du nom d'un produit. */
const itemNameDisplay = (itemName) => {
  return (
    (nameOfItem = document.createElement("h3")),
    nameOfItem.classList.add("productName"),
    (nameOfItem.textContent = itemName)
  );
};

/** Création de la description d'un produit. */
const itemDescriptionDisplay = (itemDescription) => {
  return (
    (description = document.createElement("p")),
    description.classList.add("productDescription"),
    (description.textContent = itemDescription)
  );
};

/** Création du container pour la carte d'un produit. */
const itemContainerSelect = () => {
  return document.getElementById("items").appendChild(link);
};

/** Lancement de l'affichage des produits. */
itemsDisplay();
