import axiosClient from "./axiosClient";

const AuthAPI = {
  Login: (email, password) => {
    const url = `/user/login`;
    const data = { email, password };
    return axiosClient.post(url, data);
  },
  Register: (fullName, password, phone, email, gender, dob, address) => {
    const url = `/user/register`;
    const data = { fullName, password, phone, email, gender, dob, address };
    return axiosClient.post(url, data);
  },
  getUserById: (id) => {
    const url = `/user/${id}`;
    const token = localStorage.getItem("token");
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  forgotPassword: (email) => {
    const url = `/user/forgot-password`;
    const data = { email };
    return axiosClient.post(url, data);
  },
  resetPassword: (token, password) => {
    const url = `/user/reset-password`;
    const data = { token, password };
    return axiosClient.post(url, data);
  },
  updateUser: (id, data) => {
    const url = `/user/update/${id}`;
    const token = localStorage.getItem("token");
    return axiosClient.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default AuthAPI;
