import { CheckCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  message,
  Modal,
  Row,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CertificateAPI from "../api/CertificateAPI";
import OrderDetailAPI from "../api/OrderDetailAPI";
import WarrantyAPI from "../api/WarrantyAPI";
import Logo from "../assets/images/Songlong.png";

const { Title, Text } = Typography;

export default function OrderDetails() {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCertificateModalVisible, setIsCertificateModalVisible] =
    useState(false);
  const [certificateData, setCertificateData] = useState(null);
  const [isWarrantyModalVisible, setIsWarrantyModalVisible] = useState(false);
  const [warrantyData, setWarrantyData] = useState(null);

  const formatCurrency = (amount) => {
    if (amount == null) return "0 VND";
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await OrderDetailAPI.getOrderDetailsByOrderId(id);
        if (response.data.success) {
          const fetchedDetails = response.data.data;
          const formattedDetails = fetchedDetails.map((detail) => ({
            key: detail.orderDetailId,
            productName: detail.productId.productName,
            quantity: detail.quantity,
            totalPrice: formatCurrency(detail.price),
          }));
          setOrderDetails(formattedDetails);
        } else {
          message.error(
            "Failed to fetch order details: " + response.data.message
          );
        }
      } catch (error) {
        message.error("Failed to fetch order details: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const handleSendCertificate = async (diamondId) => {
    if (!diamondId) {
      message.error("Invalid diamond ID");
      return;
    }
    try {
      const response = await CertificateAPI.getByDiamondId(diamondId);
      if (response.data.success) {
        setCertificateData(response.data.data);
        setIsCertificateModalVisible(true);
      } else {
        message.error("Failed to fetch certificate: " + response.data.message);
      }
    } catch (error) {
      message.error("Failed to fetch certificate: " + error.message);
    }
  };

  const handleSendWarranty = async (orderDetailId) => {
    if (!orderDetailId) {
      message.error("Invalid order detail ID");
      return;
    }
    try {
      const response = await WarrantyAPI.getByOrderDetailId(orderDetailId);
      if (response.data.success) {
        setWarrantyData(response.data.data[0]);
        setIsWarrantyModalVisible(true);
      } else {
        message.error("Failed to fetch warranty: " + response.data.message);
      }
    } catch (error) {
      message.error("Failed to fetch warranty: " + error.message);
    }
  };

  const handleCancelCertificate = () => {
    setIsCertificateModalVisible(false);
    setCertificateData(null);
  };

  const handleCancelWarranty = () => {
    setIsWarrantyModalVisible(false);
    setWarrantyData(null);
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
      render: (text) => <span style={{ fontWeight: 600 }}>{text}</span>,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <span style={{ fontWeight: 600 }}>{text}</span>,
    },
    {
      title: "Thành tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text) => <span style={{ fontWeight: 600 }}>{text}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex space-x-2">
          <Tooltip title="Giấy chứng nhận">
            <Button
              onClick={() => handleSendCertificate(record.key)}
              className="bg-blue-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded shadow hover:shadow-lg transition duration-300"
            >
              Giấy chứng nhận
            </Button>
          </Tooltip>
          <Tooltip title="Giấy bảo hành">
            <Button
              onClick={() => handleSendWarranty(record.key)}
              className="bg-blue-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded shadow hover:shadow-lg transition duration-300"
            >
              Giấy bảo hành
            </Button>
          </Tooltip>
          <Tooltip title="Liên hệ qua Zalo">
            <Button
              href="https://zalo.me/0948704134"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded shadow hover:shadow-lg transition duration-300"
            >
              Liên hệ
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-pink-50 py-10">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-6xl bg-blue-50 border-2 border-blue-500 rounded-lg p-6 shadown">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
            Chi tiết đơn hàng
          </h1>
          <Table
            columns={columns}
            dataSource={orderDetails}
            loading={loading}
            pagination={false}
            className="bg-white rounded-lg overflow-hidden"
          />
        </div>
        <Modal
          title="Chi tiết chứng nhận"
          visible={isCertificateModalVisible}
          onCancel={handleCancelCertificate}
          width={1000}
          footer={[
            <Button key="close" onClick={handleCancelCertificate}>
              Close
            </Button>,
          ]}
        >
          {certificateData ? (
            <Card
              bordered={false}
              style={{ background: "#FCE7F3", padding: "20px" }}
            >
              <Row justify="center" style={{ marginBottom: "20px" }}>
                <img
                  src={Logo}
                  alt="Logo"
                  style={{ width: "100px", marginBottom: "20px" }}
                />
              </Row>
              <Row
                justify="center"
                className="flex justify-center items-center"
                style={{ marginBottom: "20px" }}
              >
                <CheckCircleOutlined
                  style={{ fontSize: "30px", color: "#52c41a" }}
                />
                <Title level={3} style={{ marginLeft: "10px" }}>
                  Certificate
                </Title>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Text strong>Diamond Name:</Text>{" "}
                  <Text>{certificateData?.diamondId?.diamondName}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Origin:</Text>{" "}
                  <Text>{certificateData?.diamondId?.origin}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Carat Weight:</Text>{" "}
                  <Text>{certificateData?.diamondId?.caratWeight}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Color:</Text>{" "}
                  <Text>{certificateData?.diamondId?.color}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Clarity:</Text>{" "}
                  <Text>{certificateData?.diamondId?.clarity}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Cut:</Text>{" "}
                  <Text>{certificateData?.diamondId?.cut}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Shape:</Text>{" "}
                  <Text>{certificateData?.diamondId?.shape}</Text>
                </Col>
                {/* <Col span={12}>
                <Text strong>Base Price:</Text>{" "}
                <Text>
                  {formatCurrency(certificateData?.diamondId?.basePrice)}
                </Text>
              </Col> */}
                <Col span={12}>
                  <Text strong>Certificate Number:</Text>{" "}
                  <Text>{certificateData?.number}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Shape Cut:</Text>{" "}
                  <Text>{certificateData?.shapeCut}</Text>
                </Col>
                <Col span={24}>
                  <Text strong>Description:</Text>{" "}
                  <Text>{certificateData?.description}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Measurements:</Text>{" "}
                  <Text>{certificateData?.measure}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Polish:</Text>{" "}
                  <Text>{certificateData?.polish}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Symmetry:</Text>{" "}
                  <Text>{certificateData?.symmetry}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Issuer:</Text>{" "}
                  <Text>{certificateData?.issuer}</Text>
                </Col>
                <Col span={24}>
                  <Text strong>Issued Date:</Text>{" "}
                  <Text>{certificateData?.issued_date}</Text>
                </Col>
              </Row>
            </Card>
          ) : (
            <p>Loading...</p>
          )}
        </Modal>
        <Modal
          title="Chi tiết bảo hành"
          visible={isWarrantyModalVisible}
          onCancel={handleCancelWarranty}
          width={1000}
          footer={[
            <Button key="close" onClick={handleCancelWarranty}>
              Close
            </Button>,
          ]}
        >
          {warrantyData ? (
            <Card
              bordered={false}
              style={{ background: "#E3F2FD", padding: "20px" }}
            >
              <Row justify="center" style={{ marginBottom: "20px" }}>
                <img
                  src={Logo}
                  alt="Logo"
                  style={{ width: "100px", marginBottom: "20px" }}
                />
              </Row>
              <Row
                justify="center"
                className="flex justify-center items-center"
                style={{ marginBottom: "20px" }}
              >
                <CheckCircleOutlined
                  style={{ fontSize: "30px", color: "#1976D2" }}
                />
                <Title level={3} style={{ marginLeft: "10px" }}>
                  Warranty Details
                </Title>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Text strong>Warranty ID:</Text>{" "}
                  <Text>{warrantyData?.warrantyId}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Warranty Length:</Text>{" "}
                  <Text>{warrantyData?.warrantyLength}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Start Date:</Text>{" "}
                  <Text>{warrantyData?.startDate}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>End Date:</Text>{" "}
                  <Text>{warrantyData?.endDate}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Status:</Text>{" "}
                  <Text>{warrantyData?.status}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Product Name:</Text>{" "}
                  <Text>
                    {warrantyData?.orderDetailId?.productId?.productName}
                  </Text>
                </Col>
                <Col span={24}>
                  <Text strong>Description:</Text>{" "}
                  <Text>
                    {warrantyData?.orderDetailId?.productId?.description}
                  </Text>
                </Col>
                <Col span={12}>
                  <Text strong>Order ID:</Text>{" "}
                  <Text>{warrantyData?.orderDetailId?.orderId?.orderId}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Customer Name:</Text>{" "}
                  <Text>{warrantyData?.orderDetailId?.orderId?.cname}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Customer Phone:</Text>{" "}
                  <Text>{warrantyData?.orderDetailId?.orderId?.phone}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Customer Email:</Text>{" "}
                  <Text>{warrantyData?.orderDetailId?.orderId?.email}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Order Date:</Text>{" "}
                  <Text>
                    {warrantyData?.orderDetailId?.orderId?.order_date}
                  </Text>
                </Col>
                <Col span={12}>
                  <Text strong>Payment Method:</Text>{" "}
                  <Text>
                    {warrantyData?.orderDetailId?.orderId?.payment_method}
                  </Text>
                </Col>
                <Col span={12}>
                  <Text strong>Price:</Text>{" "}
                  <Text>
                    {formatCurrency(warrantyData?.orderDetailId?.price)}
                  </Text>
                </Col>
                <Col span={12}>
                  <Text strong>Payment Status:</Text>{" "}
                  <Text>
                    Paid
                  </Text>
                </Col>
              </Row>
            </Card>
          ) : (
            <p>Loading...</p>
          )}
        </Modal>
      </div>
    </div>
  );
}
