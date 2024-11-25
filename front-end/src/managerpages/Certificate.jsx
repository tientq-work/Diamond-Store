import {
  Button,
  DatePicker,
  Descriptions,
  Form,
  Input,
  message,
  Modal,
  Select,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import CertificateAPI from "../api/CertificateAPI";
import DiamondAPI from "../api/DiamondAPI";


const { Column } = Table;
const { confirm } = Modal;
const { Option } = Select;

const CertificateManagement = () => {
  const [certificates, setCertificates] = useState([]);
  const [diamonds, setDiamonds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [viewVisible, setViewVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false); // Add this line

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await CertificateAPI.getAll();
      console.log("Fetched certificates:", response.data);
      setCertificates(response.data.data || []);
    } catch (error) {
      console.error("Error fetching certificates:", error);
      console.error("Error details:", error.response?.data);
      message.error("Failed to fetch certificates");
    } finally {
      setLoading(false);
    }
  };
  const fetchDiamonds = async () => {
    try {
      const response = await DiamondAPI.getAllDiamonds();
      setDiamonds(response.data || []);
    } catch (error) {
      console.error("Error fetching diamonds:", error);
      message.error("Failed to fetch diamonds");
    }
  };

  useEffect(() => {
    fetchData();
    fetchDiamonds();
  }, []);

  const handleDelete = async (certificateId) => {
    confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this certificate?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        setIsDeleting(true);
        try {
          console.log("Attempting to delete certificate with ID:", certificateId);
          const response = await CertificateAPI.delete(certificateId);
          console.log("Delete response:", response);
          message.success("Certificate deleted successfully");
          await fetchData();  // Use await here
        } catch (error) {
          console.error("Error deleting certificate:", error);
          console.error("Error details:", error.response?.data);
          message.error(`Failed to delete certificate: ${error.message}`);
        } finally {
          setIsDeleting(false);
        }
      },
    });
  };

  const handleCreate = async (values) => {
    try {
      const formattedValues = {
        ...values,
        issued_date: values.issued_date
          ? formatDate(values.issued_date)
          : null,
      };

      await CertificateAPI.create(formattedValues);
      message.success("Certificate created successfully");
      setVisible(false);
      form.resetFields();
      fetchData();
    } catch (error) {
      console.error("Error creating certificate:", error);
      message.error("Failed to create certificate");
    }
  };
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const showCreateModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleView = async (certificateId) => {
    try {
      const response = await CertificateAPI.getById(certificateId);
      setSelectedCertificate(response.data.data);
      setViewVisible(true);
    } catch (error) {
      console.error("Error retrieving certificate:", error);
      message.error("Failed to retrieve certificate");
    }
  };

  const handleViewCancel = () => {
    setViewVisible(false);
    setSelectedCertificate(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center p-6">
        <h2 className="text-2xl font-bold">Certificate Management</h2>
        <button
          className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 mr-2"
          onClick={showCreateModal}
        >
          + ADD CERTIFICATE
        </button>
      </div>

      <Table dataSource={certificates} loading={loading} rowKey="cerId">
        <Column
          title="Diamond ID"
          key="diamondId"
          render={(text, record) => record.diamondId.diamondId}
        />
        <Column
          title="Diamond Name"
          key="diamondName"
          render={(text, record) => record.diamondId.diamondName}
        />
        <Column title="Certificate Number" dataIndex="number" key="number" />
        {/* <Column title="Shape Cut" dataIndex="shapeCut" key="shapeCut" />
        <Column title="Measure" dataIndex="measure" key="measure" />
        <Column title="Polish" dataIndex="polish" key="polish" />
        <Column title="Symmetry" dataIndex="symmetry" key="symmetry" />
        <Column title="Issuer" dataIndex="issuer" key="issuer" /> */}
        <Column title="Issued Date" dataIndex="issued_date" key="issued_date" />
        <Column title="Description" dataIndex="description" key="description" />
        <Column
          title="Actions"
          key="actions"
          render={(text, record) => (
            <span>
              <Button type="link" onClick={() => handleView(record.cerId)}>
                View
              </Button>
              {/* <Button
                type="link"
                danger
                onClick={() => handleDelete(record.cerId)}
                loading={isDeleting}
              >
                Delete
              </Button> */}
            </span>
          )}
        />
      </Table>

      <Modal
        title="Create Certificate"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="createCertificateForm"
          onFinish={handleCreate}
          layout="vertical"
        >
          <Form.Item
            name="diamondId"
            label="Diamond"
            rules={[{ required: true, message: "Please select a Diamond" }]}
          >
            <Select placeholder="Select a diamond">
              {diamonds.map((diamond) => (
                <Option key={diamond.diamondId} value={diamond.diamondId}>
                  {diamond.diamondName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="number"
            label="Certificate Number"
            rules={[
              { required: true, message: "Please enter Certificate Number" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="shapeCut"
            label="Shape Cut"
            rules={[{ required: true, message: "Please enter Shape Cut" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="measure"
            label="Measure"
            rules={[{ required: true, message: "Please enter Measure" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="polish"
            label="Polish"
            rules={[{ required: true, message: "Please enter Polish" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="symmetry"
            label="Symmetry"
            rules={[{ required: true, message: "Please enter Symmetry" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="issuer"
            label="Issuer"
            rules={[{ required: true, message: "Please enter Issuer" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="issued_date"
            label="Issued Date"
            rules={[{ required: true, message: "Please select Issued Date" }]}
          >
            <DatePicker format="DD-MM-YYYY" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter Description" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {selectedCertificate && (
        <Modal
          title="Certificate Details"
          visible={viewVisible}
          onCancel={handleViewCancel}
          footer={null}
          width={800}
        >
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Certificate ID">
              {selectedCertificate.cerId}
            </Descriptions.Item>
            <Descriptions.Item label="Diamond Name">
              {selectedCertificate.diamondId.diamondName}
            </Descriptions.Item>
            <Descriptions.Item label="Origin">
              {selectedCertificate.diamondId.origin}
            </Descriptions.Item>
            <Descriptions.Item label="Carat Weight">
              {selectedCertificate.diamondId.caratWeight}
            </Descriptions.Item>
            <Descriptions.Item label="Color">
              {selectedCertificate.diamondId.color}
            </Descriptions.Item>
            <Descriptions.Item label="Clarity">
              {selectedCertificate.diamondId.clarity}
            </Descriptions.Item>
            <Descriptions.Item label="Cut">
              {selectedCertificate.diamondId.cut}
            </Descriptions.Item>
            <Descriptions.Item label="Shape">
              {selectedCertificate.diamondId.shape}
            </Descriptions.Item>
            <Descriptions.Item label="Base Price">
              {selectedCertificate.diamondId.basePrice}
            </Descriptions.Item>
            <Descriptions.Item label="Certificate Number">
              {selectedCertificate.number}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {selectedCertificate.description}
            </Descriptions.Item>
            <Descriptions.Item label="Shape Cut">
              {selectedCertificate.shapeCut}
            </Descriptions.Item>
            <Descriptions.Item label="Measure">
              {selectedCertificate.measure}
            </Descriptions.Item>
            <Descriptions.Item label="Polish">
              {selectedCertificate.polish}
            </Descriptions.Item>
            <Descriptions.Item label="Symmetry">
              {selectedCertificate.symmetry}
            </Descriptions.Item>
            <Descriptions.Item label="Issuer">
              {selectedCertificate.issuer}
            </Descriptions.Item>
            <Descriptions.Item label="Issued Date">
              {selectedCertificate.issued_date}
            </Descriptions.Item>
          </Descriptions>
        </Modal>
      )}
    </div>
  );
};

export default CertificateManagement;
