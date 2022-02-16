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

/* *********************************** page product ***********************************************/
