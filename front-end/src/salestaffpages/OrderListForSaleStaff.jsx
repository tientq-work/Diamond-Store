import { useState, useEffect } from "react";
import { Table, Tag, Spin, message } from "antd";
import { Link } from "react-router-dom";
import OrderAPI from "../api/OrderAPI";

const formatCurrency = (amount) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
};


const OrderList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await OrderAPI.getAllOrders();
        console.log("API response:", response);
        if (response.data && Array.isArray(response.data.data)) {
          const orders = response.data.data.map((order) => ({
            orderId: order.orderId,
            customerName: order.cname,
            date: order.order_date,
            status: order.status.toLowerCase(),
            amount: order.payment,
          }));
          setData(orders);
        } else {
          console.error("Unexpected data format:", response.data);
          throw new Error("Unexpected data format");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        message.error("Failed to fetch orders.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        switch (status) {
          case "processing":
          case "pending":
          case "shipping":
            color = "orange";
            break;
          case "delivered":
            color = "green";
            break;
          case "cancelled":
          case "cancel":
            color = "red";
            break;
          default:
            color = "gray";
        }
        return <Tag color={color}>{status}</Tag>;
      },
      filters: [
        { text: "processing", value: "processing" },
        { text: "pending", value: "pending" },
        { text: "shipping", value: "shipping" },
        { text: "delivered", value: "delivered" },
        { text: "cancelled", value: "cancelled" },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    // {
    //   title: "Amount",
    //   dataIndex: "amount",
    //   key: "amount",
    //   render: (text) => formatCurrency(text),
    // },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Link to={`/staff/order-list/order-detail/${record.orderId}`}>
          View Detail
        </Link>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold">Order List</h1>
      </div>
      {loading ? (
        <Spin tip="Loading..." />
      ) : (
        <Table dataSource={data} columns={columns} rowKey="orderId" />
      )}
    </div>
  );
};

export default OrderList;