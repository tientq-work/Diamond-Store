import axiosClient from "./axiosClient";

const ProductDiamondAPI = {
  getAll: async () => {
    try {
      const response = await axiosClient.get("/productdiamond/all");
      return response.data;
    } catch (error) {
      console.error("Error fetching all product diamonds", error);
      throw error;
    }
  },

  create: async (productDiamond) => {
    try {
      const response = await axiosClient.post(
        "/productdiamond/create",
        productDiamond
      );
      return response.data;
    } catch (error) {
      console.error("Error creating product diamond", error);
      throw error;
    }
  },

  update: async (id, productDiamond) => {
    try {
      const response = await axiosClient.put(
        `/productdiamond/update/${id}`,
        productDiamond
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating product diamond with id ${id}`, error);
      throw error;
    }
  },

  get: async (id) => {
    try {
      const response = await axiosClient.get(`/productdiamond/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product diamond with id ${id}`, error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await axiosClient.delete(`/productdiamond/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting product diamond with id ${id}`, error);
      throw error;
    }
  },
};

export default ProductDiamondAPI;
