import axiosClient from "./axiosClient";

const WarrantyAPI = {
  getAll: () => {
    const url = "/warranty/all";
    return axiosClient.get(url);
  },

  create: (data) => {
    const url = "/warranty/create";
    return axiosClient.post(url, data);
  },

  delete: (warrantyId) => {
    const url = `/warranty/delete/${warrantyId}`;
    return axiosClient.delete(url);
  },

  getByOrderDetailId: (orderDetailId) => {
    const url = `/warranty/orderDetail/${orderDetailId}`;
    return axiosClient.get(url);
  },

  update: (warrantyId, data) => {
    const url = `/warranty/update/${warrantyId}`;
    return axiosClient.put(url, data);
  },

  getById: (warrantyId) => {
    const url = `/warranty/${warrantyId}`;
    return axiosClient.get(url);
  },
};

export default WarrantyAPI;
