import axiosClient from "./axiosClient";

const InventoryAPI = {
  getAllInventory: async () => {
    try {
      const response = await axiosClient.get("/inventory/all");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching all inventory:", error);
      throw error;
    }
  },

  createInventory: async (inventoryData) => {
    try {
      const response = await axiosClient.post(
        "/inventory/create",
        inventoryData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating inventory:", error);
      throw error;
    }
  },

  deleteInventory: async (id) => {
    try {
      const response = await axiosClient.delete(`/inventory/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting inventory with id ${id}:`, error);
      throw error;
    }
  },

  updateInventory: async (id, inventoryData) => {
    try {
      const response = await axiosClient.put(
        `/inventory/update/${id}`,
        inventoryData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating inventory with id ${id}:`, error);
      throw error;
    }
  },

  getInventoryById: async (id) => {
    try {
      const response = await axiosClient.get(`/inventory/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching inventory with id ${id}:`, error);
      throw error;
    }
  },
};

export default InventoryAPI;
