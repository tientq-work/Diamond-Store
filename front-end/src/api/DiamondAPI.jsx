import axiosClient from "./axiosClient";

const DiamondAPI = {
  getAllDiamonds: async () => {
    try {
      const response = await axiosClient.get("diamond/all");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch diamonds:", error);
      throw error;
    }
  },

  getDiamondById: async (id) => {
    try {
      const response = await axiosClient.get(`diamond/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch diamond with ID ${id}:`, error);
      throw error;
    }
  },

  createDiamond: async (diamondDTO) => {
    try {
      const response = await axiosClient.post("diamond/create", diamondDTO);
      return response.data;
    } catch (error) {
      console.error("Failed to create diamond:", error);
      throw error;
    }
  },

  updateDiamond: async (id, diamondDTO) => {
    try {
      const response = await axiosClient.put(
        `diamond/update/${id}`,
        diamondDTO
      );
      return response.data;
    } catch (error) {
      console.error(`Failed to update diamond with ID ${id}:`, error);
      throw error;
    }
  },

  getPricesByCaratWeight: async (caratWeight) => {
    try {
      const response = await axiosClient.post("diamond/list/prices", {
        caratWeight,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch diamond prices by carat weight:", error);
      throw error;
    }
  },
};

export default DiamondAPI;
