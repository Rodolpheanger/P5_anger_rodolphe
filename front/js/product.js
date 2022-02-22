// ---------------------------------------- Affichage du produit --------------------------------

/** récupération de l'id produit dans l'URL */
const getItemId = () => {
  return new URL(window.location.href).searchParams.get("id");
};

/** fonction fetch pour récupérer les données de l'item dans l'API via son id */
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

/** Fonction d'affichage des divers éléments de la page */
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

/**Ajoute le nom du produit dans la balise <title> de la page*/
const pageTitle = (itemName) => {
  document.title = itemName;
};

// /** ajout de l'image dans le DOM */
const itemImage = (itemUrl, itemAltTxt) => {
  let image = document.createElement("img");
  image.setAttribute("src", itemUrl);
  image.setAttribute("alt", itemAltTxt);
  document.querySelector(".item__img").appendChild(image);
};

// /** ajout du nom dans le DOM */
const itemName = (itemName) => {
  document.getElementById("title").textContent = itemName;
};

/** ajout du prix dans le DOM */
const itemPrice = (itemPrice) => {
  document.getElementById("price").textContent = itemPrice;
};

// /** ajout de la description dans le DOM */
const itemDescription = (itemDescription) => {
  document.getElementById("description").textContent = itemDescription;
};

/** ajout des couleurs dans le DOM */
const itemColors = (itemColors) => {
  for (let color of itemColors) {
    let colorOption = new Option(color, color);
    document.getElementById("colors").appendChild(colorOption);
  }
};

// ---------------------------- Ajout au panier --------------------------------------------

/** Execute les fonctions necessaires au click sur le bouton "ajouter au panier" */
const addToCartInit = () => {
  document.getElementById("addToCart").addEventListener("click", () => {
    const itemNameContainer = document.getElementById("title");
    const itemColorsContainer = document.getElementById("colors");
    const itemQuantityContainer = document.getElementById("quantity");
    checkValidity(
      itemColorsContainer,
      itemNameContainer,
      itemQuantityContainer
    );
  });
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
  } else if (itemQuantityContainer.value == 0) {
    alert(
      `Veuillez indiquer le nombre de "${itemNameContainer.textContent}" que vous souhaitez ajouter au panier`
    );
  } else {
    addToCart(itemColorsContainer, itemQuantityContainer);
    validation(itemQuantityContainer, itemNameContainer, itemColorsContainer);
  }
};

//*************************************************************************************************
//*************************************************************************************************
//******************** Voir pour que getLocalStorage renvoi un tableau ****************************
//******************** et pour supprimer if (localStorageData === null)  **************************
//******************* {localStorageData = [];******************************************************
//*************************************************************************************************
//*************************************************************************************************

/** Fonction qui recupère le contenu du local storage */
const getLocalStorage = () => {
  return JSON.parse(window.localStorage.getItem("cart"));
};

/** Fonction pour envoyer le contenu du choix utilisateur dans le local storage */
const setLocalStorage = (cartData) => {
  const cartDataToStringnify = JSON.stringify(cartData);
  window.localStorage.setItem("cart", cartDataToStringnify);
};

/** Fonction qui récupère les choix utilisateur, les compare avec le local storage pour le modifier si besoin */
const addToCart = (itemColorsContainer, itemQuantityContainer) => {
  const itemId = getItemId();
  let localStorageData = getLocalStorage(itemId, itemColorsContainer);
  const newProduct = {
    id: itemId,
    color: itemColorsContainer.value,
    quantity: itemQuantityContainer.value,
  };
  if (localStorageData === null) {
    localStorageData = [];
  }
  createOrModifyEntry(localStorageData, itemId, newProduct);
};

/** Fonction qui compare puis modifie ou ajoute une entrée dans le tableau du local storage */
const createOrModifyEntry = (localStorageData, itemId, newProduct) => {
  for (let entry of localStorageData) {
    /** Si même id et même couleur existe: modification quantité */
    if (entry.id === itemId && entry.color === newProduct.color) {
      return (
        (entry.quantity = newProduct.quantity),
        setLocalStorage(localStorageData)
      );
    }
  }
  /** Sinon push une nouvelle entrée */
  newEntryPush(localStorageData, newProduct);
};

/** Fonction pour push le choix de l'utilisateur dans le tableau du local storage */
const newEntryPush = (localStorageData, productToPush) => {
  localStorageData.push({
    id: productToPush.id,
    color: productToPush.color,
    quantity: productToPush.quantity,
  }),
    setLocalStorage(localStorageData);
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

productPageInit();
