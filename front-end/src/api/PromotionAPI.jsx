import axiosClient from "./axiosClient";

const PromotionAPI = {
  getAll: async () => {
    try {
      const response = await axiosClient.get("/promotion/all");
      return response.data;
    } catch (error) {
      console.error("Error fetching all promotions", error);
      throw error;
    }
  },

  create: async (promotion) => {
    try {
      const response = await axiosClient.post("/promotion/create", promotion);
      return response.data;
    } catch (error) {
      console.error("Error creating promotion", error);
      throw error;
    }
  },

  updateStatus: async (id, status) => {
    try {
      const response = await axiosClient.put(`/promotion/status/${id}`, { active: status });
      return response.data;
    } catch (error) {
      console.error(`Error updating promotion status with id ${id}`, error);
      throw error;
    }
  },

  update: async (id, promotion) => {
    try {
      const response = await axiosClient.put(
        `/promotion/update/${id}`,
        promotion
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating promotion with id ${id}`, error);
      throw error;
    }
  },

  getPromotion: async (id) => {
    try {
      const response = await axiosClient.get(`/promotion/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching promotion with id ${id}`, error);
      throw error;
    }
  },
  getActivePromotion: async () => {
    try {
      const response = await axiosClient.get("/promotion/active");
      return response.data;
    } catch (error) {
      console.error("Error fetching active promotion", error);
      throw error;
    }
  },
};

export default PromotionAPI;
