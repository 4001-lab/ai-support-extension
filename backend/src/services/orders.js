export async function getOrderById(orderId) {
  // Replace with real DB/API call
  return {
    orderId,
    status: "Shipped",
    carrier: "DHL",
    eta: "2026-02-08",
    notes: "Left warehouse yesterday"
  };
}
