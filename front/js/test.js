/* ************************* page index ***********************************************/

// on crée une class
// class Item {
//   constructor(
//     colors,
//     id,
//     name,
//     price,
//     imageUrl,
//     description,
//     altTxt,
//     itemNumber
//   ) {
//     this.colors = colors;
//     this.id = id;
//     this.name = name;
//     this.price = price;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.altTxt = altTxt;
//     this.itemNumber = itemNumber;
//   }
// }

// fonction qui va générer et afficher les cards des différents produits grace à un .map de itemsData et la méthode innerHTML (fonctionne)
// const createAllItems = async () => {
//   await fetchItems();
//   itemsContainer.innerHTML = itemsData
//     .map(
//       (item) =>
//         `
//       <a href="#">
//         <article>
//           <img
//             src="${item.imageUrl}"
//             alt="${item.altTxt}"
//           />
//           <h3 class="productName">${item.name}</h3>
//           <p class="productDescription">
//             ${item.description}
//           </p>
//         </article>
//       </a>
//     `
//     )
//     .join(""); /* enlève les virgule entre chaque card */
// };
// createAllItems();

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

/** fonction qui crée les cards et les affiche dans la section avec id items méthode createElements (une seule fonction) */
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
//     h3.textContent = item.nameOfItem;

//     p.classList.add("productDescription");
//     p.textContent = item.description;

//     article.appendChild(img);
//     article.appendChild(h3);
//     article.appendChild(p);

//     document.getElementById("items").appendChild(link);
//   }
// };
// createAllItems();

/* *********************************** page product ***********************************************/

/** ajout des données du produit dans le DOM (une seule fonction)*/
// const itemDataAdd = async () => {
//   await fetchItemData();
//   let image = document.createElement("img");
//   image.setAttribute("src", item.imageUrl);
//   image.setAttribute("alt", item.altTxt);
//   itemImageContainer.appendChild(image);
//   itemNameContainer.textContent = item.name;
//   itemPriceContainer.textContent = item.price;
//   itemDescriptionContainer.textContent = item.description;

//   for (let color of item.colors) {
//     let colorOption = new Option(color, color);

//     // let colorOption = document.createElement("option");
//     // /* voir pourquoi le setAttribute ne fonctionne pas pour value de option */
//     // colorOption.setAttribute = ("value", color);
//     // /* ******************************************************************** */
//     // colorOption.textContent = color;

//     itemColorsContainer.appendChild(colorOption);
//   }
// };
// itemDataAdd();
