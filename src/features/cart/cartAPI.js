// This is a mock API service for the cart functionality

// Simulates processing an order
export const processOrder = async (orderData) => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Generate a random order number
      const orderNumber = Math.floor(100000 + Math.random() * 900000);
      
      // Return success response with order details
      resolve({
        success: true,
        orderNumber,
        orderDate: new Date().toISOString(),
        ...orderData
      });
    }, 1500);
  });
};

// Simulates sending a confirmation email
export const sendOrderConfirmationEmail = async (email, orderDetails) => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // In a real app, this would connect to an email service
      console.log(`Sending confirmation email to ${email}`, orderDetails);
      
      resolve({
        success: true,
        message: `Order confirmation sent to ${email}`
      });
    }, 1000);
  });
};