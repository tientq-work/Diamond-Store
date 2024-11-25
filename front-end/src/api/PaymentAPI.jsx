import axiosClient from "./axiosClient";

const PaymentAPI = {
  redirectToVnPay: async (orderId, bankCode) => {
    try {
      const currentUrl = window.location.href; // Get the current URL of the client
      
      const response = await axiosClient.get(`v1/payment/vn-pay`, {
        params: {
          orderId: orderId,
          bankCode: bankCode
        },
        headers: {
          returnURL: currentUrl, // Add returnURL to the headers
        },
      });

      if (response.data.code === 200 && response.data.data.code === "ok") {
        return response.data.data.paymentUrl;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to get VNPay URL:", error);
      throw error;
    }
  },
  sendToDatabase: async (vnp_OrderInfo,vnp_ResponseCode) => {
    try {
      const response = await axiosClient.get(`v1/payment/vn-pay-callback`, {
        params: {
          vnp_ResponseCode,
          vnp_OrderInfo
        }
      });

      if (response.data.code === 200) {
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to get VNPay URL:", error);
      throw error;
    }
  }
};

export default PaymentAPI;