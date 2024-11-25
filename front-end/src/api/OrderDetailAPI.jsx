import axiosClient from "./axiosClient";

const OrderDetailAPI = {
  getOrderDetailsByOrderId: (orderId) => {
    return axiosClient.get(`/order_detail/order/${orderId}`);
  },
  getAllOrderDetails: () => {
    return axiosClient.get(`/order_detail/list/all`);
  },
};

export default OrderDetailAPI;
