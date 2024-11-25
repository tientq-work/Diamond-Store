import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  notification,
  Select,
  Table,
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import OrderDetailAPI from "../api/OrderDetailAPI";
import WarrantyAPI from "../api/WarrantyAPI";

const Warranty = () => {
  const [warranties, setWarranties] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedWarranty, setSelectedWarranty] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchWarranties();
    fetchAllOrderDetails();
  }, []);

  const fetchWarranties = async () => {
    try {
      const response = await WarrantyAPI.getAll();
      console.log("Fetched warranties: ", response.data);
      if (Array.isArray(response.data.data)) {
        setWarranties(response.data.data);
      } else {
        console.error("Fetched data is not an array:", response.data);
        notification.error({ message: "Failed to fetch warranties" });
      }
    } catch (error) {
      notification.error({ message: "Failed to fetch warranties" });
      console.error("Fetch warranties error: ", error);
    }
  };

  const fetchAllOrderDetails = async () => {
    try {
      const response = await OrderDetailAPI.getAllOrderDetails();
      console.log("Fetched order details: ", response.data);
      if (Array.isArray(response.data.data)) {
        setOrderDetails(response.data.data);
      } else {
        console.error("Fetched data is not an array:", response.data);
        notification.error({ message: "Failed to fetch order details" });
      }
    } catch (error) {
      notification.error({ message: "Failed to fetch order details" });
      console.error("Fetch order details error: ", error);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const startDate = values.startDate;
      const endDate = values.endDate;

      if (endDate.isBefore(startDate)) {
        notification.error({ message: "End date cannot be before start date" });
        return;
      }

      const data = {
        orderDetailId: values.orderDetailId,
        warrantyLength: values.warrantyLength,
        startDate: startDate.format("DD-MM-YYYY"),
        endDate: endDate.format("DD-MM-YYYY"),
      };

      if (isEditing) {
        await WarrantyAPI.update(selectedWarranty.warrantyId, data);
        notification.success({ message: "Warranty updated successfully" });
      } else {
        await WarrantyAPI.create(data);
        notification.success({ message: "Warranty created successfully" });
      }
      fetchWarranties();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      notification.error({ message: "Failed to save warranty" });
      console.error("Save warranty error: ", error);
    }
  };

  const handleCreate = () => {
    setIsEditing(false);
    setSelectedWarranty(null);
    setIsModalVisible(true);
  };

  const handleEdit = (warranty) => {
    setIsEditing(true);
    setSelectedWarranty(warranty);
    form.setFieldsValue({
      orderDetailId: warranty.orderDetailId.orderDetailId,
      warrantyLength: warranty.warrantyLength,
      startDate: moment(warranty.startDate, "DD-MM-YYYY"),
      endDate: moment(warranty.endDate, "DD-MM-YYYY"),
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const calculateWarrantyLength = (start, end) => {
    if (!start || !end) return '';

    const duration = moment.duration(end.diff(start));
    const years = duration.years();
    const months = duration.months();
    const days = duration.days();

    let result = [];
    if (years > 0) {
      result.push(`${years} year${years > 1 ? 's' : ''}`);
    }
    if (months > 0) {
      result.push(`${months} month${months > 1 ? 's' : ''}`);
    }
    if (days > 0 || (years === 0 && months === 0)) {
      result.push(`${days} day${days !== 1 ? 's' : ''}`);
    }

    return result.join(' ') || '0 days';
  };

  useEffect(() => {
    const startDate = form.getFieldValue('startDate');
    const endDate = form.getFieldValue('endDate');
    if (startDate && endDate) {
      const length = calculateWarrantyLength(startDate, endDate);
      form.setFieldsValue({ warrantyLength: length });
    }
  }, [form]);

  const columns = [
    {
      title: "Warranty Length",
      dataIndex: "warrantyLength",
      key: "warrantyLength",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => moment(text, "DD-MM-YYYY").format("YYYY-MM-DD"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (text) => moment(text, "DD-MM-YYYY").format("YYYY-MM-DD"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center p-6">
        <h2 className="text-2xl font-bold">Warranty List</h2>
        <button
          className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 mr-2"
          onClick={handleCreate}
        >
          + ADD WARRANTY
        </button>
      </div>
      <Table dataSource={warranties} columns={columns} rowKey="warrantyId" />
      <Modal
        title={isEditing ? "Edit Warranty" : "Create Warranty"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="orderDetailId"
            label="Order Detail"
            rules={[{ required: true, message: "Please select an order detail!" }]}
          >
            <Select>
              {orderDetails.map((detail) => (
                <Select.Option key={detail.orderDetailId} value={detail.orderDetailId}>
                  {detail.orderDetailName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[
              { required: true, message: "Please select the start date!" },
              {
                validator: (_, value) => {
                  if (value && form.getFieldValue('endDate') && value.isAfter(form.getFieldValue('endDate'))) {
                    return Promise.reject(new Error('Start date cannot be after end date'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <DatePicker
              format="DD-MM-YYYY"
              onChange={(date) => {
                const endDate = form.getFieldValue('endDate');
                if (endDate && date && date.isAfter(endDate)) {
                  notification.error({ message: "Start date cannot be after end date" });
                  return;
                }
                if (endDate) {
                  const length = calculateWarrantyLength(date, endDate);
                  form.setFieldsValue({ warrantyLength: length });
                }
              }}
            />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="End Date"
            rules={[
              { required: true, message: "Please select the end date!" },
              {
                validator: (_, value) => {
                  if (value && form.getFieldValue('startDate') && value.isBefore(form.getFieldValue('startDate'))) {
                    return Promise.reject(new Error('End date cannot be before start date'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <DatePicker
              format="DD-MM-YYYY"
              onChange={(date) => {
                const startDate = form.getFieldValue('startDate');
                if (startDate && date && date.isBefore(startDate)) {
                  notification.error({ message: "End date cannot be before start date" });
                  return;
                }
                if (startDate) {
                  const length = calculateWarrantyLength(startDate, date);
                  form.setFieldsValue({ warrantyLength: length });
                }
              }}
            />
          </Form.Item>
          <Form.Item
            name="warrantyLength"
            label="Warranty Length"
          >
            <Input readOnly />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Warranty;
