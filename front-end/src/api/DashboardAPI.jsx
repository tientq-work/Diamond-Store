import axiosClient from "./axiosClient";

const DashboardAPI = {
  countMember: async () => {
    const url = "/dashboard/countMember";
    return axiosClient.get(url);
  },
  countProcessingOrder: async () => {
    const url = "/dashboard/countProcessingOrder";
    return axiosClient.get(url);
  },
  totalRevenue: async () => {
    const url = "/dashboard/totalRevenue";
    return axiosClient.get(url);
  },
  countCompleteOrder: async () => {
    const url = "/dashboard/countCompleteOrder";
    return axiosClient.get(url);
  },
  countCancelOrder: async () => {
    const url = "/dashboard/countCancelOrder";
    return axiosClient.get(url);  
  },

  getWeeklyRevenue: () => axiosClient.get('/dashboard/weekly'),
  getMonthlyRevenue: () => axiosClient.get('/dashboard/monthly'),
  getYearlyRevenue: () => axiosClient.get('/dashboard/yearly'),
};

export default DashboardAPI;