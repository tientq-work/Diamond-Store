import axiosClient from "./axiosClient";

const ProductPromotionAPI = {
  getAll: async () => {
    try {
      const response = await axiosClient.get("/productpromotion/all");
      return response.data;
    } catch (error) {
      console.error("Error fetching all product promotions", error);
      throw error;
    }
  },

  create: async (promotion) => {
    try {
      const response = await axiosClient.post(
        "/productpromotion/create",
        promotion
      );
      return response.data;
    } catch (error) {
      console.error("Error creating product promotion", error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await axiosClient.delete(
        `/productpromotion/delete/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting product promotion with id ${id}`, error);
      throw error;
    }
  },

  getProductPromotionById: async (id) => {
    try {
      const response = await axiosClient.get(`/productpromotion/product/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product promotion with id ${id}`, error);
      throw error;
    }
  },

  getPromotionById: async (id) => {
    try {
      const response = await axiosClient.get(
        `/productpromotion/promotion/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching promotion with id ${id}`, error);
      throw error;
    }
  },

  updateStatus: async (promotionId, productId) => {
    try {
      const response = await axiosClient.put(`/productpromotion/status`, {
        promotionId,
        productId,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating product promotion status", error);
      throw error;
    }
  },

  update: async (id, productPromotionDTO) => {
    try {
      const response = await axiosClient.put(`/productpromotion/update/${id}`, productPromotionDTO);
      return response.data;
    } catch (error) {
      console.error(`Error updating product promotion with id ${id}`, error);
      throw error;
    }
  },
  getProductPromotion: async (id) => {
    try {
      const response = await axiosClient.get(`/productpromotion/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product promotion with id ${id}`, error);
      throw error;
    }
  },
};

export default ProductPromotionAPI;
