import axiosClient from "./axiosClient";

const VoucherAPI = {
  getAll: async () => {
    try {
      const response = await axiosClient.get("/voucher/all");
      return response.data;
    } catch (error) {
      console.error("Error fetching all vouchers:", error);
      throw error;
    }
  },

  create: async (memberId, data) => {
    try {
      const response = await axiosClient.post(
        `/voucher/create/${memberId}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error(`Error creating voucher for member ${memberId}:`, error);
      throw error;
    }
  },

  getByMemberId: async (id) => {
    try {
      const response = await axiosClient.get(`/voucher/member/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching vouchers for member with id ${id}:`, error);
      throw error;
    }
  },

  get: async (id) => {
    try {
      const response = await axiosClient.get(`/voucher/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching voucher with id ${id}:`, error);
      throw error;
    }
  },
};

export default VoucherAPI;
