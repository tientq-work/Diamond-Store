import axiosClient from "./axiosClient";

const GetUserByRoleAPI = {
  getAllDeliveryStaff: async () => {
    const roleId = 4;
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axiosClient.get(`user/role/${roleId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Delivery Staff Response:", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching delivery staff:", error);
      throw error;
    }
  },
  getAllSaleStaff: async () => {
    const roleId = 3;
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axiosClient.get(`user/role/${roleId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Sale Staff Response:", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching sale staff:", error);
      throw error;
    }
  },
  getAllByRole: async (roleId) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axiosClient.get(`user/role/${roleId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(`Response for role ${roleId}:`, response);
      return response.data;
    } catch (error) {
      console.error(`Error fetching role ${roleId}:`, error);
      throw error;
    }
  },
  assignOrderToDelivery: async (orderId, deliveryId) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axiosClient.put(
        "order/assign",
        {
          orderId: orderId,
          deliveryId: deliveryId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Assign Order Response:", response);
      return response.data;
    } catch (error) {
      console.error("Error assigning order to delivery:", error);
      throw error;
    }
  },
};

export default GetUserByRoleAPI;
