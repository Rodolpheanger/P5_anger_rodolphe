/** fonction fetch pour aller chercher les données de l'API */
const fetchItems = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/products");
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
  }
};

/** fonction qui crée les cards et les affiche dans la section avec id items */
// const createAllItems = async () => {
//   const itemsData = await fetchItems();

//   for (let item of itemsData) {
//     let link = document.createElement("a");
//     let article = document.createElement("article");
//     let img = document.createElement("img");
//     let h3 = document.createElement("h3");
//     let p = document.createElement("p");

//     link.setAttribute("href", "./product.html?id=" + item._id);

//     link.appendChild(article);

//     img.setAttribute("src", item.imageUrl);
//     img.setAttribute("alt", item.altTxt);

//     h3.classList.add("productName");
//     h3.textContent = item.name;

//     p.classList.add("productDescription");
//     p.textContent = item.description;

//     article.appendChild(img);
//     article.appendChild(h3);
//     article.appendChild(p);

//     document.getElementById("items").appendChild(link);
//   }
// };
// createAllItems();

const createAllItems = async () => {
  const itemsData = await fetchItems();

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

    document.getElementById("items").appendChild(link);
  }
};
createAllItems();
