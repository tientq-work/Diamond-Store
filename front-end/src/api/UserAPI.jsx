import axiosClient from "./axiosClient";
const UserAPI = {
  users: () => {
    const url = `user/all`;
    return axiosClient.get(url);
  },
  getUserById: (userId) => {
    const url = `/user/${userId}`;
    return axiosClient.get(url);
  },
  getUserListByRoleId: (id) => {
    const url = `/user/role/${id}`;
    return axiosClient.get(url);
  },
  updateUser: async (id, values) => {
    const url = `/user/update/${id}`;
    try {
      const response = await axiosClient.put(url, values);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to update user"
      };
    }
  },
  changePassword: async (id, values) => {
    const url = `/user/change-password/${id}`;
    try {
      const response = await axiosClient.put(url, values);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response.data.message || "Failed to change password"
      );
    }
  },
};

export default UserAPI;
