import axiosClient from "./axiosClient";

const CertificateAPI = {
  getAll: () => {
    const url = "/certificate/all";
    return axiosClient.get(url);
  },

  create: (data) => {
    const url = "/certificate/create";
    return axiosClient.post(url, data);
  },

  delete: (certificateId) => {
    const url = `/certificate/delete/${certificateId}`;
    return axiosClient.delete(url);
  },

  getByDiamondId: (diamondId) => {
    const url = `/certificate/diamond/${diamondId}`;
    return axiosClient.get(url);
  },

  getByProductId: (productId) => {
    const url = `/certificate/product/${productId}`;
    return axiosClient.get(url);
  },

  update: (id, data) => {
    const url = `/certificate/update/${id}`;
    return axiosClient.put(url, data);
  },

  getById: (certificateId) => {
    const url = `/certificate/${certificateId}`;
    return axiosClient.get(url);
  },
};

export default CertificateAPI;
