import axiosClient from "./axiosClient";

const CollectionAPI = {
  addProductToCollection: (data) => {
    const url = "/collection/addCollection";
    return axiosClient.post(url, data);
  },
  getAllCollections: () => {
    const url = "/collection/all";
    return axiosClient.get(url);
  },
  getCollectionByName: (name) => {
    const url = `/collection/collectionName/${name}`;
    return axiosClient.get(url);
  },
  createCollection: (data) => {
    const url = "/collection/create";
    return axiosClient.post(url, data);
  },
  deleteCollection: (id) => {
    const url = `/collection/deleteCollection/${id}`;
    return axiosClient.delete(url);
  },
  deleteProduct: (data) => {
    const url = "/collection/deleteProduct";
    return axiosClient.delete(url, { data });
  },
  getProductByCollection: (productId) => {
    const url = `/collection/product/collection/${productId}`;
    return axiosClient.get(url);
  },
  getProduct: (collectionId) => {
    const url = `/collection/product/${collectionId}`;
    return axiosClient.get(url);
  },
  updateCollection: (collectionId, data) => {
    const url = `/collection/update/${collectionId}`;
    return axiosClient.put(url, data);
  },
};

export default CollectionAPI;
