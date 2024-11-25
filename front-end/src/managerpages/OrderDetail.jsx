import { Card, Col, Row, Spin, Table, Typography, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderDetailAPI from "../api/OrderDetailAPI";

const { Title, Text } = Typography;

const formatCurrency = (amount) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
};

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      message.error("Order ID is not provided.");
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        const response = await OrderDetailAPI.getOrderDetailsByOrderId(id);
        console.log("API response:", response);
        if (response.data && response.data.data) {
          const orderDetails = response.data.data;
          setOrder(orderDetails[0].orderId);

          const productsData = orderDetails.map((detail, index) => ({
            key: index,
            orderDetailId: detail.orderDetailId,
            productName: detail.productId.productName,
            quantity: detail.quantity,
            price: detail.price * detail.quantity,
          }));

          setProducts(productsData);
        } else {
          console.error("Unexpected data format:", response.data);
          message.error("Failed to fetch order details.");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        message.error("Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Text className="text-xl">No order details found.</Text>
      </div>
    );
  }

  const columns = [
    {
      title: "Order Detail ID",
      dataIndex: "orderDetailId",
      key: "orderDetailId",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => formatCurrency(text),
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Card className="mb-6 shadow-lg rounded-lg">
        <Row gutter={16} justify="space-between" align="middle">
          <Col>
            <Title level={3} className="mb-0">
              Order ID: {order.orderId}
            </Title>
            <Text className="text-gray-500">Date: {order.order_date}</Text>
          </Col>
          <Col>
            <Text className="text-lg font-semibold">
              Status: <span className="text-blue-600">{order.status}</span>
            </Text>
          </Col>
        </Row>
      </Card>

      <Row gutter={16} className="mb-6">
        <Col span={8}>
          <Card
            title={<span className="text-lg font-bold">Customer</span>}
            className="shadow-md rounded-lg h-full"
          >
            <p className="mb-2">
              <strong className="text-gray-700">Full Name:</strong>{" "}
              <span className="text-black">{order.cname}</span>
            </p>
            <p className="mb-2">
              <strong className="text-gray-700">Email:</strong>{" "}
              <span className="text-black">{order.email}</span>
            </p>
            <p className="mb-2">
              <strong className="text-gray-700">Phone:</strong>{" "}
              <span className="text-black">{order.phone}</span>
            </p>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title={<span className="text-lg font-bold">Order Info</span>}
            className="shadow-md rounded-lg h-full"
          >
            <p className="mb-2">
              <strong className="text-gray-700">Payment Method:</strong>{" "}
              <span className="text-black">{order.payment_method}</span>
            </p>
            <p className="mb-2">
              <strong className="text-gray-700">Status:</strong>{" "}
              <span className="text-blue-600 font-medium">{order.status}</span>
            </p>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title={<span className="text-lg font-bold">Deliver to</span>}
            className="shadow-md rounded-lg h-full"
          >
            <p className="mb-2">
              <strong className="text-gray-700">Address:</strong>{" "}
              <span className="text-black">{order.address}</span>
            </p>
          </Card>
        </Col>
      </Row>

      <Card
        title={<span className="text-lg font-bold">Products</span>}
        className="shadow-lg rounded-lg"
      >
        <Table
          columns={columns}
          dataSource={products}
          pagination={false}
          className="mb-4"
        />
        <div className="flex justify-end mt-4">
          <div className="w-full md:w-1/4">
            <div className="flex justify-between font-semibold text-lg py-1">
              <span>Total:</span>
              <span className="text-green-600">
                {formatCurrency(order.payment)}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OrderDetail;
