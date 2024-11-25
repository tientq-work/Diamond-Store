import { Button, Popconfirm, Select, Table, message } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GetUserByRoleAPI from "../api/GetUserByRoleAPI";
import OrderAPI from "../api/OrderAPI";

const { Option } = Select;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return dateString;
  }
  return date.toLocaleDateString();
};

const OrderList = () => {
  const [data, setData] = useState([]);
  const [deliveryStaffList, setDeliveryStaffList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deliveryOrderNumbers, setDeliveryOrderNumbers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await OrderAPI.getAllOrders();
        const orders = response.data.data.map((order) => ({
          orderId: order.orderId,
          date: formatDate(order.order_date),
          customerName: order.cname,
          status: order.status,
          deliveryStaff: order.deliveryStaff
            ? order.deliveryStaff.fullName
            : null,
          amount: new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(order.payment),
        }));
        setData(orders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        message.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    const fetchDeliveryStaff = async () => {
      try {
        const response = await GetUserByRoleAPI.getAllDeliveryStaff();
        setDeliveryStaffList(response.data);
      } catch (error) {
        console.error("Failed to fetch delivery staff:", error);
        message.error("Failed to fetch delivery staff");
      }
    };

    const fetchDeliveryOrderNumbers = async () => {
      try {
        const response = await OrderAPI.getDeliveryShippingOrderNumber();
        setDeliveryOrderNumbers(response.data.data);
      } catch (error) {
        console.error("Failed to fetch delivery order numbers:", error);
        message.error("Failed to fetch delivery order numbers");
      }
    };

    fetchData();
    fetchDeliveryStaff();
    fetchDeliveryOrderNumbers();
  }, []);

  const handleCancelOrder = async (record) => {
    try {
      const statusLowerCase = record.status.toLowerCase();

      if (["pending", "processing", "shipping"].includes(statusLowerCase)) {
        await OrderAPI.cancelOrder(record.orderId);
        const updatedData = data.map((item) => {
          if (item.orderId === record.orderId) {
            item.status = "Cancelled";
          }
          return item;
        });
        setData(updatedData);
        message.success(`Order ${record.orderId} has been cancelled.`);
      } else {
        message.error(
          `Cannot cancel order ${record.orderId} with status ${record.status}.`
        );
      }
    } catch (error) {
      console.error("Failed to cancel order:", error);
      message.error("Failed to cancel order. Please try again later.");
    }
  };

  const handleDeliveryStaffChange = async (value, record) => {
    try {
      const selectedStaff = deliveryStaffList.find(
        (staff) => staff.fullName === value
      );

      if (selectedStaff) {
        console.log(
          `Assigning order ${record.orderId} to delivery staff ${selectedStaff.userId}`
        );

        const payload = {
          orderId: record.orderId,
          deliveryId: selectedStaff.userId,
        };

        console.log("Request payload:", payload);

        const response = await GetUserByRoleAPI.assignOrderToDelivery(
          record.orderId,
          selectedStaff.userId
        );

        console.log("Response from server:", response);

        const updatedData = data.map((item) => {
          if (item.orderId === record.orderId) {
            item.deliveryStaff = value;
          }
          return item;
        });

        setData(updatedData);
        message.success(
          `Order ${record.orderId} has been assigned to ${value}.`
        );
      } else {
        message.error("Selected delivery staff not found.");
      }
    } catch (error) {
      console.error(
        "Failed to assign delivery staff:",
        error.response ? error.response.data : error
      );
      message.error(
        error.response?.data?.message ||
          "Failed to assign delivery staff. Please try again later."
      );
    }
  };

  const handleUpdateToProcessing = async (record) => {
    try {
      await OrderAPI.updateOrderToProcessing(record.orderId);
      const updatedData = data.map((item) => {
        if (item.orderId === record.orderId) {
          item.status = "Processing";
        }
        return item;
      });
      setData(updatedData);
      message.success(`Order ${record.orderId} is now processing.`);
    } catch (error) {
      console.error("Failed to update order to processing:", error);
      message.error(
        "Failed to update order to processing. Please try again later."
      );
    }
  };
  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
  };
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
      filters: [
        { text: "Pending", value: "Pending" },
        { text: "Processing", value: "Processing" },
        { text: "Shipping", value: "Shipping" },
        { text: "Delivered", value: "Delivered" },
        { text: "Cancelled", value: "Cancelled" },
      ],
      onFilter: (value, record) =>
        record.status.toLowerCase() === value.toLowerCase(),
    },
    {
      title: "Delivery Staff",
      dataIndex: "deliveryStaff",
      key: "deliveryStaff",
      render: (text, record) => (
        <Select
          style={{ width: 200 }}
          placeholder="Select Delivery Staff"
          value={record.deliveryStaff}
          onChange={(value) => handleDeliveryStaffChange(value, record)}
        >
          {deliveryStaffList.map((staff) => (
            <Option key={staff.fullName} value={staff.fullName}>
              {staff.fullName}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => formatCurrency(parseFloat(text.replace(/[^\d]/g, '')))
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="space-x-2">
          <Link to={`/manager/order-list/order-detail/${record.orderId}`}>
            <Button 
              type="primary"
              className="hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              View Detail
            </Button>
          </Link>
  
          {["pending", "processing", "shipping"].includes(
            record.status.toLowerCase()
          ) ? (
            <Popconfirm
              title="Are you sure to cancel this order?"
              onConfirm={() => handleCancelOrder(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button 
                type="primary" 
                danger
                className="hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Cancel Order
              </Button>
            </Popconfirm>
          ) : (
            <Button type="primary" disabled>
              Cancel Order
            </Button>
          )}
  
          {record.status.toLowerCase() === "pending" && (
            <Button
              type="primary"
              onClick={() => handleUpdateToProcessing(record)}
              className="hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Confirm Order
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold">Order List</h1>
        <div className="flex space-x-4">
          {deliveryOrderNumbers.map((item) => (
            <div key={item.deliveryId}>
              {item.deliveryName}: {item.numberOfOrders}
            </div>
          ))}
        </div>
      </div>
      <Table dataSource={data} columns={columns} loading={loading} />
    </div>
  );
};

export default OrderList;
