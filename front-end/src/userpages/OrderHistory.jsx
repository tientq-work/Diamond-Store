import { useState, useEffect } from "react";
import { Button, Table, message } from "antd";
import { Link } from "react-router-dom";
import OrderAPI from "../api/OrderAPI";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await OrderAPI.getOrdersByUserId(userId);
        if (response.data.success) {
          const fetchedOrders = response.data.data;
          const formattedOrders = fetchedOrders.map((order) => ({
            key: order.id,
            orderId: order.orderId,
            date: order.order_date,
            totalPrice: formatCurrency(order.payment),
            status: order.status,
          }));
          setOrders(formattedOrders);
        } else {
          message.error("Failed to fetch orders: " + response.data.message);
        }
      } catch (error) {
        message.error("Failed to fetch orders: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      render: (text) => <span style={{ fontWeight: 600 }}>{text}</span>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <span style={{ fontWeight: 600 }}>{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Completed", value: "Completed" },
        { text: "Pending", value: "Pending" },
        { text: "Processing", value: "Processing" },
        { text: "Cancelled", value: "Cancelled" },
        { text: "Delivered", value: "Delivered" },
        { text: "Delivering", value: "Delivering" },
      ],
      onFilter: (value, record) => record.status.includes(value),
      render: (status) => (
        <span className={`font-semibold ${getStatusColor(status)}`}>
          {status}
        </span>
      ),
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Link to={`/order-detail/${record.orderId}`}>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow hover:shadow-lg transition duration-300">
            View Detail
          </Button>
        </Link>
      ),
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-500";
      case "Pending":
        return "text-yellow-500";
      case "Processing":
        return "text-blue-500";
      case "Cancelled":
        return "text-red-500";
      case "Delivered":
        return "text-purple-500";
      case "Delivering":
        return "text-orange-500";
      default:
        return "";
    }
  };

  return (
    <div className="bg-pink-50 py-10">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-6xl bg-blue-50 border-2 border-blue-500 rounded-lg p-6 shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
            Tất cả đơn hàng
          </h1>
          <Table
            dataSource={orders}
            columns={columns}
            loading={loading}
            className="bg-white rounded-lg overflow-hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
