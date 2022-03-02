const getOrderId = () => {
  return new URL(window.location.href).searchParams.get("orderId");
};

const orderIdDisplay = () => {
  const orderId = getOrderId();
  document.getElementById("orderId").textContent = `${orderId}`;
};
orderIdDisplay();
