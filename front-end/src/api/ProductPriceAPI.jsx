import axiosClient from "./axiosClient";

const ProductPriceAPI = {
  getAll: () => {
    const url = "/productprice/all";
    return axiosClient.get(url);
  },
  create: (productPrice) => {
    const url = "/productprice/create";
    return axiosClient.post(url, productPrice);
  },
  delete: (productPriceIds) => {
    const url = "/productprice/delete";
    return axiosClient.delete(url, { data: { productPriceIds } });
  },
  getByProductId: (id) => {
    const url = `/productprice/product/${id}`;
    return axiosClient.get(url);
  },
  getById: (id) => {
    const url = `/productprice/${id}`;
    return axiosClient.get(url);
  },
  update: (productPrice) => {
    const url = `/productprice/update/${productPrice.productPriceId}`;
    return axiosClient.put(url, productPrice);
  },
};

export default ProductPriceAPI;
