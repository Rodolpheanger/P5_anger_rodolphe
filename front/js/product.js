// ---------------------------------------- Affichage du produit --------------------------------

/** récupération de l'id produit dans l'URL */
const getItemId = () => {
  return (itemId = new URL(window.location.href).searchParams.get("id"));
};

/** fonction fetch pour récupérer les données de l'item dans l'API via son id */
const fetchItemData = async () => {
  try {
    getItemId();
    const response = await fetch(
      "http://localhost:3000/api/products/" + itemId
    );
    return (data = await response.json());
  } catch (error) {
    alert(error);
  }
};

/** Fonction d'affichage des divers éléments de la page */
const productDisplay = async () => {
  const item = await fetchItemData();
  pageTitle(item);
  itemImage(item);
  itemName(item);
  itemPrice(item);
  itemDescription(item);
  itemColors(item);
};
productDisplay();

/**Ajoute le nom du produit dans la balise <title> de la page*/
const pageTitle = (item) => {
  document.title = item.name;
};

// /** ajout de l'image dans le DOM */
const itemImage = (item) => {
  let image = document.createElement("img");
  image.setAttribute("src", item.imageUrl);
  image.setAttribute("alt", item.altTxt);
  document.querySelector(".item__img").appendChild(image);
};

// /** ajout du nom dans le DOM */
const itemName = (item) => {
  document.getElementById("title").textContent = item.name;
};

/** ajout du prix dans le DOM */
const itemPrice = (item) => {
  document.getElementById("price").textContent = item.price;
};

// /** ajout de la description dans le DOM */
const itemDescription = (item) => {
  document.getElementById("description").textContent = item.description;
};

/** ajout des couleurs dans le DOM */
const itemColors = (item) => {
  for (let color of item.colors) {
    let colorOption = new Option(color, color);
    document.getElementById("colors").appendChild(colorOption);
  }
};

// ---------------------------- Ajout au panier --------------------------------------------

/** Execute les fonctions necessaires au click sur le bouton "ajouter au panier" */
document.getElementById("addToCart").addEventListener("click", () => {
  const itemNameContainer = document.getElementById("title");
  const itemColorsContainer = document.getElementById("colors");
  const itemQuantityContainer = document.getElementById("quantity");
  getItemId();
  checkValidity(itemColorsContainer, itemNameContainer, itemQuantityContainer);
});

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
    addToCart(itemId, itemColorsContainer, itemQuantityContainer);
    validation(itemQuantityContainer, itemNameContainer, itemColorsContainer);
  }
};

/** Fonction qui recupère le contenu du local storage */
const getLocalStorage = () => {
  return (localStorageData = JSON.parse(window.localStorage.getItem("cart")));
};

/** Fonction pour envoyer le contenu du choix utilisateur dans le local storage */
const setLocalStorage = () => {
  localStorageData = JSON.stringify(localStorageData);
  window.localStorage.setItem("cart", localStorageData);
};

/** Fonction qui récupère les choix utilisateur, les compare avec le local storage pour le modifier si besoin */
const addToCart = (itemId, itemColorsContainer, itemQuantityContainer) => {
  getLocalStorage(itemId, itemColorsContainer);
  if (localStorageData == null) {
    localStorageData = [
      {
        id: itemId,
        color: itemColorsContainer.value,
        quantity: itemQuantityContainer.value,
      },
    ];
    setLocalStorage();
  } else if (localStorageData != null) {
    for (let entry of localStorageData) {
      if (entry.id == itemId && entry.color == itemColorsContainer.value) {
        return (
          (entry.quantity = itemQuantityContainer.value), setLocalStorage()
        );
      }
    }
    for (let entry of localStorageData) {
      if (
        (entry.id == itemId && entry.color != itemColorsContainer.value) ||
        entry.id != itemId
      ) {
        return (
          localStorageData.push({
            id: itemId,
            color: itemColorsContainer.value,
            quantity: itemQuantityContainer.value,
          }),
          setLocalStorage()
        );
      }
    }
  }
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
