import axiosClient from "./axiosClient";

const OrderAPI = {
  getAllOrders: () => {
    return axiosClient.get("/order/all");
  },
  getOrderById: (id) => {
    return axiosClient.get(`/order/${id}`);
  },
  getOrdersByUserId: (id) => {
    return axiosClient.get(`/order/user/${id}`);
  },
  getOrdersByCurrentUserId: (id) => {
    return axiosClient.get(`order/history/${id}`);
  },
  createOrderWithDetails: (orderData) => {
    return axiosClient.post("/order/createWithDetails", orderData);
  },
  cancelOrder: (id) => {
    return axiosClient.put(`/order/cancel/${id}`, {
      reason: "Bom hàng",
    });
  },
  getOrdersByDeliveryStaffId: (id) => {
    return axiosClient.get(`/order/delivery/${id}`);
  },
  getDeliveryShippingOrderNumber: () => {
    return axiosClient.get(`/order/list/deliveryOrder`);
  },
  updateOrderStatusByDelivery: (orderId, status) => {
    return axiosClient.put(`/order/delivery/status`, {
      orderId,
      status,
    });
  },
  updateOrderToProcessing: (id) => {
    return axiosClient.put(`/order/processing/${id}`);
  },
};

export default OrderAPI;
