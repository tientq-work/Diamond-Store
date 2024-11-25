import axiosClient from "./axiosClient";

const CommentAPI = {
  addComment: async (content, productId, userId) => {
    const url = `/comment/add`;
    const token = localStorage.getItem("token");
    const data = { content, productId, userId };
    try {
      const response = await axiosClient.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error(
        "Error in addComment API call:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  deleteComment: async (commentId) => {
    const url = `/comment/delete/${commentId}`;
    const token = localStorage.getItem("token");
    try {
      const response = await axiosClient.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error in deleteComment API call:", error);
      throw error;
    }
  },

  editComment: async (commentId, content, productId, userId) => {
    const url = `/comment/edit/${commentId}`;
    const token = localStorage.getItem("token");
    const data = { content, productId, userId };
    try {
      const response = await axiosClient.put(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error in editComment API call:", error);
      throw error;
    }
  },

  getCommentsByProduct: async (productId) => {
    const url = `/comment/product/${productId}`;
    try {
      const response = await axiosClient.get(url);
      return response;
    } catch (error) {
      console.error("Error in getCommentsByProduct API call:", error);
      throw error;
    }
  },

  getCommentsByUser: async (userId) => {
    const url = `/comment/user/${userId}`;
    try {
      const response = await axiosClient.get(url);
      return response;
    } catch (error) {
      console.error("Error in getCommentsByUser API call:", error);
      throw error;
    }
  },

  getCommentsByUserAndProduct: async (userId, productId) => {
    const url = `/comment/user/${userId}/product/${productId}`;
    try {
      const response = await axiosClient.get(url);
      return response;
    } catch (error) {
      console.error("Error in getCommentsByUserAndProduct API call:", error);
      throw error;
    }
  },
};

export default CommentAPI;
