export async function getOrderById(orderId) {
  // Replace with real DB/API call

  // Mock data for demonstration FoodPanda order
  const mockOrders = {
    "12345": {
      orderId: "12345",
      customerName: "John Doe",
      items: [
        { name: "Burger", quantity: 2 },
        { name: "Fries", quantity: 1 }
      ],
      totalPrice: "$15.00",
      status: "Delivered"
    },
    "67890": {
      orderId: "67890",
      customerName: "Jane Smith",
      items: [
        { name: "Pizza", quantity: 1 },
        { name: "Soda", quantity: 2 }
      ],
      totalPrice: "$20.00",
      status: "In Transit"
    }
  };

  return mockOrders[orderId] || null;
}
