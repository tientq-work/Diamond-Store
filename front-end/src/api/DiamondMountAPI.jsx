import axiosClient from "./axiosClient";

const DiamondMountAPI = {
  getAllDiamondMounts: async () => {
    try {
      const response = await axiosClient.get("/mount/all");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch diamond mounts:", error);
      throw error;
    }
  },

  getDiamondMountById: async (id) => {
    try {
      const response = await axiosClient.get(`/mount/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch diamond mount with ID ${id}:`, error);
      throw error;
    }
  },

  createDiamondMount: async (diamondMountDTO) => {
    try {
      const response = await axiosClient.post("/mount/create", diamondMountDTO);
      return response.data;
    } catch (error) {
      console.error("Failed to create diamond mount:", error);
      throw error;
    }
  },

  updateDiamondMount: async (id, diamondMountDTO) => {
    try {
      const response = await axiosClient.put(
        `/mount/update/${id}`,
        diamondMountDTO
      );
      return response.data;
    } catch (error) {
      console.error(`Failed to update diamond mount with ID ${id}:`, error);
      throw error;
    }
  },

  getDiamondMountsByType: async (type) => {
    try {
      const response = await axiosClient.get(`/mount/list/${type}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch diamond mounts by type ${type}:`, error);
      throw error;
    }
  },

  getAllTypes: async () => {
    try {
      const response = await axiosClient.get("/mount/type");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch diamond mount types:", error);
      throw error;
    }
  },
};

export default DiamondMountAPI;
