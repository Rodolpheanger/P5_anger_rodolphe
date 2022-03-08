/** Récupération des données de l'API pour tous les produits.
 * @returns {array} local storage content
 */
const fetchItems = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/products");
    return response.json();
  } catch (error) {
    alert(error);
  }
};

/** Affichage de toutes les cartes produit.
 * @returns {HTMLElements} items card
 */
const itemsDisplay = async () => {
  const itemsData = await fetchItems();
  for (const item of itemsData) {
    const image = itemImageDisplay(item.imageUrl, item.altTxt);
    const nameOfItem = itemNameDisplay(item.name);
    const description = itemDescriptionDisplay(item.description);
    const article = itemArticleDisplay(image, nameOfItem, description);
    const link = itemLinkDisplay(item._id, article);
    itemContainerSelect(link);
  }
};

/** Création du lien d'un produit vers sa page dédiée.
 * @param {string} itemId
 * @param {HTMLElement} article
 * @returns {HTMLElement} a
 */
const itemLinkDisplay = (itemId, article) => {
  const link = document.createElement("a");
  link.setAttribute("href", "./product.html?id=" + itemId);
  link.appendChild(article);
  return link;
};

/** Création de l'article qui contient l'image, le nom et la description d'un produit.
 * @param {HTMLElement} image
 * @param {HTMLElement} nameOfItem
 * @param {HTMLElement} description
 * @returns {HTMLElement} article
 */
const itemArticleDisplay = (image, nameOfItem, description) => {
  const article = document.createElement("article");
  article.appendChild(image);
  article.appendChild(nameOfItem);
  article.appendChild(description);
  return article;
};

/** Création de l'image d'un produit.
 * @param {string} itemImageUrl
 * @param {string} itemAltTxt
 * @returns {HTMLElement} img
 */
const itemImageDisplay = (itemImageUrl, itemAltTxt) => {
  const image = document.createElement("img");
  image.setAttribute("src", itemImageUrl);
  image.setAttribute("alt", itemAltTxt);
  return image;
};

/** Création du nom d'un produit.
 * @param {string} itemName
 * @returns {HTMLElement} h3
 */
const itemNameDisplay = (itemName) => {
  const nameOfItem = document.createElement("h3");
  nameOfItem.classList.add("productName");
  nameOfItem.textContent = itemName;
  return nameOfItem;
};

/** Création de la description d'un produit.
 * @param {string} itemDescription
 * @returns {HTMLElement} p
 */
const itemDescriptionDisplay = (itemDescription) => {
  const description = document.createElement("p");
  description.classList.add("productDescription");
  description.textContent = itemDescription;
  return description;
};

/** Création du container pour la carte d'un produit.
 * @param {HTMLElement} link
 * @returns {HTMLElement} section
 */
const itemContainerSelect = (link) => {
  const section = document.getElementById("items").appendChild(link);
  return section;
};

//------------------------------------------------------------------------------------
//                                  Initialisation
//------------------------------------------------------------------------------------

/** Lancement de l'affichage des produits. */
itemsDisplay();
