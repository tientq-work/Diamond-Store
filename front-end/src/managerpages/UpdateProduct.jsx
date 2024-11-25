import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Select, Upload, message } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import DiamondMountAPI from "../api/DiamondMountAPI";
import ProductAPI from "../api/ProductAPI";
import { getDownloadURL, ref, storage, uploadBytes } from "../firebase";

const { Option } = Select;
const { Dragger } = Upload;
const { TextArea } = Input;

const UpdateProduct = ({ product, onUpdate, onDelete }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [form] = Form.useForm();
  const [diamondMounts, setDiamondMounts] = useState([]);

  useEffect(() => {
    fetchDiamondMounts();
    if (product) {
      form.setFieldsValue({
        productName: product.productName || "",
        description: product.description || "",
        mountId: product.mountId?.mountId || "",
        mountName: product.mountId?.mountName || "",
        laborFee: product.laborFee || undefined,
        status: product.status || "",
        componentsPrice: product.componentsPrice || undefined,
        price: product.price || undefined,
      });
      setImagePreview(product?.url || "");
    }
  }, [product, form]);

  const fetchDiamondMounts = async () => {
    try {
      const response = await DiamondMountAPI.getAllDiamondMounts();
      setDiamondMounts(response.data);
    } catch (error) {
      console.error("Failed to fetch diamond mounts:", error);
      message.error("Failed to fetch diamond mounts.");
    }
  };

  const handleImageUpload = async (info) => {
    const { file } = info;
    try {
      const storageRef = ref(storage, file.name);
      const snapshot = await uploadBytes(storageRef, file.originFileObj);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setImagePreview(downloadURL);
    } catch (error) {
      console.error("Error uploading file:", error);
      message.error("Failed to upload image. Please try again later.");
    }
  };

  const handleFinish = async (values) => {
    const selectedMount = diamondMounts.find(
      (mount) => mount.mountName === values.mountName
    );
    if (!selectedMount) {
      message.error("Invalid mount selection!");
      return;
    }

    const updatedProduct = {
      ...product,
      ...values,
      mountId: selectedMount.mountId,
      url: imagePreview,
    };

    try {
      await ProductAPI.updateProduct(updatedProduct);
      onUpdate(updatedProduct);
      // message.success("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      message.error("Failed to update product. Please try again later.");
    }
  };

  const validatePositiveNumber = (_, value) => {
    if (value && value < 0) {
      return Promise.reject(new Error("Value cannot be negative!"));
    }
    return Promise.resolve();
  };

  const handleDelete = async () => {
    try {
      await ProductAPI.deleteProduct(product.productId);
      onDelete(product.productId);
      message.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error("Failed to delete product. Please try again later.");
    }
  };

  return (
    <Card className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded shadow-lg">
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Form.Item
                name="productName"
                label="Product Name"
                rules={[
                  { required: true, message: "Please input the product name!" },
                ]}
              >
                <Input placeholder="Type product's name here" />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Please input the description!" },
                ]}
              >
                <TextArea placeholder="Type Description here" rows={2} />
              </Form.Item>
              <Form.Item
                name="mountName"
                label="Mount"
                rules={[{ required: true, message: "Please select the mount!" }]}
              >
                <Select
                  disabled={true}
                  placeholder="Select a mount"
                  className="bg-gray-100"
                >
                  {diamondMounts.map((mount) => (
                    <Option key={mount.mountId} value={mount.mountName}>
                      {mount.mountName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  name="laborFee"
                  label="Labor Fee"
                  rules={[
                    { required: true, message: "Please input the labor fee!" },
                    { validator: validatePositiveNumber },
                  ]}
                >
                  <Input placeholder="VND" type="number" />
                </Form.Item>
                <Form.Item
                  name="status"
                  label="Status"
                  rules={[
                    {
                      required: true,
                      message: "Please select the product status!",
                    },
                  ]}
                >
                  <Select placeholder="Select status" disabled={true}>
                    <Option value="InStock">In Stock</Option>
                    <Option value="Out of Stock">Out of Stock</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  name="componentsPrice"
                  label="Components Price"
                  rules={[{ validator: validatePositiveNumber }]}
                >
                  <Input
                    placeholder="VND"
                    type="number"
                    readOnly={true}
                    className="bg-gray-100"
                  />
                </Form.Item>
              </div>
            </div>
            <div>
              <div className="mt-4">
                <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Product Preview"
                      className="h-full object-contain"
                    />
                  ) : (
                    <span>Image Preview</span>
                  )}
                </div>
                <Form.Item label="Product Gallery">
                  <Dragger
                    name="files"
                    onChange={handleImageUpload}
                    showUploadList={false}
                  >
                    <p className="ant-upload-drag-icon">
                      <UploadOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Drop your image here, or browse
                    </p>
                    <p className="ant-upload-hint">
                      Only PNG files are allowed
                    </p>
                  </Dragger>
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="flex justify-between space-x-4 mt-6">
            <div className="flex items-start space-x-6">
              <Button type="primary" htmlType="submit">
                UPDATE PRODUCT
              </Button>
              <Button type="primary" danger onClick={handleDelete}>
                DELETE PRODUCT
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </Card>
  );
};

UpdateProduct.propTypes = {
  product: PropTypes.shape({
    productId: PropTypes.string.isRequired,
    productName: PropTypes.string,
    description: PropTypes.string,
    mountId: PropTypes.shape({
      mountId: PropTypes.string,
    }),
    laborFee: PropTypes.number,
    status: PropTypes.string,
    componentsPrice: PropTypes.number,
    price: PropTypes.number,
    url: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UpdateProduct;
