/** pointage de  la section où vont s'afficher les items */
const itemsContainer = document.getElementById("items");

/** variable qui va contenir le resultat du fetch sous forme d'array*/
let itemsData;

/** fonction fetch pour aller chercher les données de l'API et les stocker dans la variable itemsData */
const fetchItems = async () => {
  await fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => (itemsData = data))
    .catch((error) => {
      alert(error);
    });
};

/** fonction qui crée les cards et les affiche dans la section avec id items (methode innerHTML)*/
// const createAllItems = async () => {
//   await fetchItems();
//   for (let item of itemsData) {
//     itemsContainer.innerHTML += `
//         <a href="./product.html?id=${item._id}">
//            <article>
//              <img
//                src="${item.imageUrl}"
//                alt="${item.altTxt}"
//              />
//              <h3 class="productName">${item.name}</h3>
//              <p class="productDescription">
//                ${item.description}
//              </p>
//            </article>
//          </a>
//        `;
//     console.log(item);
//   }
// };
// createAllItems();

/** fonction qui crée les cards et les affiche dans la section avec id items (methode createElement)*/
const createAllItems = async () => {
  await fetchItems();

  for (let item of itemsData) {
    let link = document.createElement("a");
    let article = document.createElement("article");
    let img = document.createElement("img");
    let h3 = document.createElement("h3");
    let p = document.createElement("p");

    link.setAttribute("href", "./product.html?id=" + item._id);

    link.appendChild(article);

    img.setAttribute("src", item.imageUrl);
    img.setAttribute("alt", item.altTxt);

    h3.classList.add("productName");
    h3.textContent = item.name;

    p.classList.add("productDescription");
    p.textContent = item.description;

    article.appendChild(img);
    article.appendChild(h3);
    article.appendChild(p);

    itemsContainer.appendChild(link);
  }
};
createAllItems();
