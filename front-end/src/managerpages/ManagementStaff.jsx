import { useEffect, useState } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  message,
} from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import GetUserByRoleAPI from "../api/GetUserByRoleAPI";

const { Option } = Select;

const ManagementStaff = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [saleStaff, deliveryStaff] = await Promise.all([
        GetUserByRoleAPI.getAllSaleStaff(),
        GetUserByRoleAPI.getAllDeliveryStaff(),
      ]);

      const saleStaffData = saleStaff.data.map((item) => ({
        key: item.userId,
        userName: item.fullName,
        gender: item.gender,
        dob: moment(item.dob).format("DD/MM/YYYY"),
        role: "Sale Staff",
        phoneNumber: item.phone,
        email: item.email,
      }));

      const deliveryStaffData = deliveryStaff.data.map((item) => ({
        key: item.userId,
        userName: item.fullName,
        gender: item.gender,
        dob: moment(item.dob).format("DD/MM/YYYY"),
        role: "Delivery Staff",
        phoneNumber: item.phone,
        email: item.email,
      }));

      setDataSource([...saleStaffData, ...deliveryStaffData]);
    } catch (error) {
      console.error("Error fetching staff data:", error);
      message.error("Failed to fetch staff data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        const newData = {
          ...values,
          dob: values.dob.format("DD/MM/YYYY"),
        };

        if (editingRecord) {
          const updatedDataSource = dataSource.map((item) =>
            item.key === editingRecord.key ? { ...item, ...newData } : item
          );
          setDataSource(updatedDataSource);
          setEditingRecord(null);
        }

        setIsModalVisible(false);
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

  const handleAction = (record) => {
    setEditingRecord(record);
    form.setFieldsValue({
      ...record,
      dob: moment(record.dob, "DD/MM/YYYY"),
    });
    setIsModalVisible(true);
  };

  const handleDelete = (record) => {
    const newDataSource = dataSource.filter((item) => item.key !== record.key);
    setDataSource(newDataSource);
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Date Of Birth",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: [
        {
          text: "Sale Staff",
          value: "Sale Staff",
        },
        {
          text: "Delivery Staff",
          value: "Delivery Staff",
        },
      ],
      onFilter: (value, record) => record.role.includes(value),
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="space-x-2">
          <Button
            type="primary"
            onClick={() => handleAction(record)}
            className="hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            View Detail
          </Button>
          {/* <Button 
            danger
            onClick={() => handleDelete(record)}
            className="hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Delete
          </Button> */}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center p-6">
        <div className="flex justify-between w-full">
          <h1 className="text-2xl font-bold">All Staff</h1>
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} loading={loading} />
      <Modal
        title={editingRecord ? "Staff Detail" : "Add New Staff"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="userName"
            label="User Name"
            rules={[{ required: true, message: "Please input the user name!" }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[{ required: true, message: "Please input the phone number!" }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select the role!" }]}
          >
            <Select disabled>
              <Select.Option value="Sale Staff">Sale Staff</Select.Option>
              <Select.Option value="Delivery Staff">Delivery Staff</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="dob"
            label="Date of Birth"
            rules={[{ required: true, message: "Please select the date of birth!" }]}
          >
            <DatePicker className="w-full" format="DD/MM/YYYY" disabled />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input the email!" },
              { type: "email", message: "The input is not valid email!" },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select the gender!" }]}
          >
            <Select disabled>
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagementStaff;
