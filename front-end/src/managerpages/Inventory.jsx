import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Switch,
  Table
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import InventoryAPI from "../api/InventoryAPI";
import ProductAPI from "../api/ProductAPI";

const { Option } = Select;

const Inventory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingInventory, setEditingInventory] = useState(null);
  const [products, setProducts] = useState([]);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    fetchInventory();
    fetchProducts();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const inventory = await InventoryAPI.getAllInventory();
      setData(Array.isArray(inventory) ? inventory : []);
    } catch (error) {
      message.error("Error fetching inventory data");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await ProductAPI.products();
      setProducts(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      message.error("Error fetching product list");
    }
  };

  const handleCreate = () => {
    form.validateFields().then(async (values) => {
      const { productId, purchaseDate, condition, quantity, available } = values;
      setLoading(true);
      const formattedData = {
        productId: parseInt(productId, 10),
        purchaseDate: purchaseDate ? purchaseDate.format("DD-MM-YYYY") : "",
        condition,
        quantity: parseInt(quantity, 10),
        available,
      };
      console.log("Creating Inventory with values:", formattedData);
      try {
        await InventoryAPI.createInventory(formattedData);
        message.success("Created successfully");
        fetchInventory();
        setIsModalVisible(false);
        form.resetFields();
      } catch (error) {
        console.error("Error creating inventory:", error);
        message.error("Error creating");
      } finally {
        setLoading(false);
      }
    });
  };

  const handleUpdate = () => {
    form.validateFields().then(async (values) => {
      const { productId, purchaseDate, condition, quantity, available } = values;
      setLoading(true);
      const formattedData = {
        productId: parseInt(productId, 10),
        purchaseDate: purchaseDate ? purchaseDate.format("DD-MM-YYYY") : "",
        condition,
        quantity: parseInt(quantity, 10),
        available,
      };
      console.log("Updating Inventory with values:", formattedData);
      if (!editingInventory || !editingInventory.locationId) {
        message.error("Cannot update, missing Location ID.");
        setLoading(false);
        return;
      }
      try {
        await InventoryAPI.updateInventory(
          editingInventory.locationId,
          formattedData
        );
        message.success("Updated successfully");
        fetchInventory();
        setIsModalVisible(false);
        form.resetFields();
        setEditingInventory(null);
      } catch (error) {
        console.error("Error updating inventory:", error);
        message.error("Error updating");
      } finally {
        setLoading(false);
      }
    });
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await InventoryAPI.deleteInventory(id);
      message.success("Deleted successfully");
      fetchInventory();
    } catch (error) {
      message.error("Error deleting");
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingInventory(null);
    setAvailable(false);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleAvailableChange = async (record, checked) => {
    setLoading(true);
    try {
      const updatedInventory = {
        ...record,
        available: checked,
        productId: record.productId.productId,
        purchaseDate: record.purchaseDate
          ? moment(record.purchaseDate, "DD-MM-YYYY").format("DD-MM-YYYY")
          : "",
      };
      await InventoryAPI.updateInventory(record.locationId, updatedInventory);
      message.success("Availability updated successfully");
      fetchInventory();
    } catch (error) {
      message.error("Error updating availability");
      console.error("Error updating availability:", error);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (record) => {
    setEditingInventory(record);
    setAvailable(record.available);
    form.setFieldsValue({
      ...record,
      productId: record.productId?.productId,
      purchaseDate: record.purchaseDate
        ? moment(record.purchaseDate, "DD-MM-YYYY")
        : null,
    });
    setIsModalVisible(true);
  };

  const validatePositiveNumber = (_, value) => {
    if (value && value >= 0) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Quantity must be a positive number'));
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: ["productId", "productName"],
      key: "productName",
    },
    {
      title: "Purchase Date",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
      render: (text) =>
        text ? moment(text, "DD-MM-YYYY").format("DD-MM-YYYY") : "Invalid Date",
    },
    {
      title: "Condition",
      dataIndex: "condition",
      key: "condition",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
      render: (text, record) => (
        <Switch
          checked={record.available}
          onChange={(checked) => handleAvailableChange(record, checked)}
          className="hover:shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="space-x-2">
          <Button
            type="primary"
            onClick={() => openEditModal(record)}
            className="bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Edit
          </Button>
          {/* <Popconfirm
            title="Are you sure you want to delete this item?"
            onConfirm={() => handleDelete(record.locationId)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              className="bg-red-500 hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Delete
            </Button>
          </Popconfirm> */}
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Inventory Management</h2>
        <div className="flex justify-between space-x-4 mt-6">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              onClick={openCreateModal}
              className="bg-black border-black hover:bg-gray-800 hover:border-gray-800"
            >
              ADD NEW Inventory +
            </Button>
          </Form.Item>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="locationId"
      />
      <Modal
        title={editingInventory ? "Edit" : "Add New"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={editingInventory ? handleUpdate : handleCreate}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="productId"
            label="Product Name"
            rules={[{ required: true, message: "Please select a product" }]}
          >
            <Select
              placeholder="Select a product"
              disabled={!!editingInventory}
            >
              {Array.isArray(products) &&
                products.map((product) => (
                  <Option key={product.productId} value={product.productId}>
                    {product.productName}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="purchaseDate"
            label="Purchase Date"
            rules={[
              { required: true, message: "Please select a purchase date" },
            ]}
          >
            <DatePicker format="DD-MM-YYYY" />
          </Form.Item>
          <Form.Item
            name="condition"
            label="Condition"
            rules={[{ required: true, message: "Please enter the condition" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[
              { required: true, message: "Please enter the quantity" },
              { validator: validatePositiveNumber }
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="available" label="Available" valuePropName="checked">
            <Switch
              checked={available}
              onChange={(checked) => {
                setAvailable(checked);
                form.setFieldsValue({ available: checked });
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Inventory;