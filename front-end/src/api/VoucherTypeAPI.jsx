import axiosClient from "./axiosClient";

const VoucherTypeAPI = {
  getAll: async () => {
    try {
      const response = await axiosClient.get("/vouchertype/all");
      return response.data;
    } catch (error) {
      console.error("Error fetching all voucher types:", error);
      throw error;
    }
  },

  create: async (data) => {
    try {
      const response = await axiosClient.post("/vouchertype/create", data);
      return response.data;
    } catch (error) {
      console.error("Error creating voucher type:", error);
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const response = await axiosClient.put(`/vouchertype/update/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating voucher type with id ${id}:`, error);
      throw error;
    }
  },

  get: async (id) => {
    try {
      const response = await axiosClient.get(`/vouchertype/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching voucher type with id ${id}:`, error);
      throw error;
    }
  },
};

export default VoucherTypeAPI;
