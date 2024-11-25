import axiosClient from "./axiosClient";

const ImageAPI = {
  saveImageList: async (productId, urls) => {
    try {
      const response = await axiosClient.post("/image/list/save", {
        productId: productId,
        url: urls,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },

  getImageListById: async (id) => {
    try {
      const response = await axiosClient.get(`/image/list/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },
};

export default ImageAPI;
