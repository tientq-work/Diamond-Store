import { MoreOutlined } from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Form,
  Input,
  Menu,
  message,
  Modal,
  Select,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import DiamondMountAPI from "../api/DiamondMountAPI";

const { Option } = Select;

const ManagementDiamondMount = () => {
  const [dataSource, setDataSource] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});
  const [filteredInfo, setFilteredInfo] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null);
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    fetchDiamondMounts();
  }, []);

  const fetchDiamondMounts = async () => {
    try {
      const response = await DiamondMountAPI.getAllDiamondMounts();
      const formattedData = response.data.map((item) => ({
        ...item,
        key: item.mountId,
      }));
      setDataSource(formattedData);
    } catch (error) {
      message.error("Failed to fetch diamond mounts.");
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        form.resetFields();
        const newData = { ...values };

        try {
          if (editingRecord) {
            await DiamondMountAPI.updateDiamondMount(editingRecord.mountId, newData);
            message.success("Diamond mount updated successfully!");
          } else {
            await DiamondMountAPI.createDiamondMount(newData);
            message.success("Diamond mount created successfully!");
          }
          fetchDiamondMounts();
          setEditingRecord(null);
          setIsModalVisible(false);
        } catch (error) {
          message.error("Failed to save diamond mount.");
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRecord(null);
    form.resetFields();
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (record) => {
    try {
      await DiamondMountAPI.deleteDiamondMount(record.mountId);
      message.success("Diamond mount deleted successfully!");
      fetchDiamondMounts();
    } catch (error) {
      message.error("Failed to delete diamond mount.");
    }
  };

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
    setFilteredInfo(filters);
  };

  const handleFilterChange = (value) => {
    setFilterType(value);
  };

  const filteredData = filterType
    ? dataSource.filter((item) => item.type === filterType)
    : dataSource;

  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
  };

  const validatePositiveNumber = (_, value) => {
    if (value && value < 0) {
      return Promise.reject(new Error("Price cannot be negative!"));
    }
    return Promise.resolve();
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "mountId",
      key: "mountId",
    },
    {
      title: "Diamond Mount Name",
      dataIndex: "mountName",
      key: "mountName",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      filters: [
        { text: "Nhẫn", value: "Nhẫn" },
        { text: "Vòng cổ", value: "Vòng cổ" },
        { text: "Vòng đeo tay", value: "Vòng đeo tay" },
      ],
      filteredValue: filteredInfo.type || null,
      onFilter: (value, record) => record.type === value,
    },
    {
      title: "Material",
      dataIndex: "material",
      key: "material",
    },
    {
      title: "Price",
      dataIndex: "basePrice",
      key: "basePrice",
      render: (basePrice) => formatCurrency(basePrice),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit" onClick={() => handleEdit(record)}>
                Edit
              </Menu.Item>
              <Menu.Item key="delete" onClick={() => handleDelete(record)}>
                Delete
              </Menu.Item>
            </Menu>
          }
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold">Diamond Mount Management</h1>
        <button
          className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 mr-2"
          onClick={showModal}
        >
          + ADD NEW MOUNT
        </button>
      </div>
      <div className="p-6 bg-gray-100 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Filter Options</h2>
        <Select
          placeholder="Filter by Type"
          onChange={handleFilterChange}
          allowClear
          style={{ width: 200 }}
        >
          <Option value="Nhẫn">Nhẫn</Option>
          <Option value="Vòng cổ">Vòng cổ</Option>
          <Option value="Vòng đeo tay">Vòng đeo tay</Option>
        </Select>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="mountId"
        onChange={handleChange}
        className="mt-6"
      />
      <Modal
        title={editingRecord ? "Edit Diamond Mount" : "Add New Diamond Mount"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="mountName"
            label="Diamond Mount Name"
            rules={[
              { required: true, message: "Please input the mount name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="size"
            label="Size"
            rules={[{ required: true, message: "Please input the size!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: "Please select the type!" }]}
          >
            <Select>
              <Option value="Nhẫn">Nhẫn</Option>
              <Option value="Vòng cổ">Vòng cổ</Option>
              <Option value="Vòng đeo tay">Vòng đeo tay</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="material"
            label="Material"
            rules={[{ required: true, message: "Please select the material!" }]}
          >
            <Select>
              <Option value="Diamond">Diamond</Option>
              <Option value="Gold">Gold</Option>
              <Option value="Platinum">Platinum</Option>
              <Option value="Silver">Silver</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="basePrice"
            label="Price"
            rules={[
              { required: true, message: "Please input the price!" },
              { validator: validatePositiveNumber }
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagementDiamondMount;