/** Récupération de l'order id dans l'url
 * @returns {string} order id
 */
const getOrderId = () => {
  return new URL(window.location.href).searchParams.get("orderId");
};

/** Affichage de l'order id dans la span dédiée
 * @returns {HTMLElement}
 */
const orderIdDisplay = () => {
  const orderId = getOrderId();
  document.getElementById("orderId").textContent = `${orderId}`;
};

orderIdDisplay();
