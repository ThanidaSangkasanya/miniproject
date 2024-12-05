// Add Order

export const addOrder = async (orderData: any) => {
    try {
      const response = await fetch("/api/addOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      return await response.json();
    } catch (error) {
      console.log("Error creating order:", error);
      return { success: false, error };
    }
  };
  
  // Get User Orders
  export const getOrder = async (userId: number) => {
    try {
      const response = await fetch(`/api/getOrder?userId=${userId}`);
      const data = await response.json();
      return data.orders;
    } catch (error) {
      console.log("Error fetching orders:", error);
      return [];
    }
  };
  