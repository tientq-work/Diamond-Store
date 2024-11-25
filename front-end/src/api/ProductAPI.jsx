import axiosClient from "./axiosClient";

const ProductAPI = {
  products: () => {
    const url = `product/all`;
    return axiosClient.get(url);
  },
  addProduct: (product) => {
    const url = `product/create`;
    return axiosClient.post(url, product);
  },
  updateProduct: (product) => {
    const url = `product/update/${product.productId}`;
    return axiosClient.put(url, product);
  },
  deleteProduct: (productId) => {
    const url = `product/delete/${productId}`;
    return axiosClient.delete(url);
  },
  getProductById: (id) => {
    const url = `product/showProduct/${id}`;
    return axiosClient.get(url);
  },
  getProductDescription: (id) => {
    const url = `product/description/${id}`;
    return axiosClient.get(url);
  }
};

export default ProductAPI;
