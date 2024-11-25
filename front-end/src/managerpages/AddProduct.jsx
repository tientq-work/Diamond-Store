import { useState, useEffect } from "react";
import { Button, Input, Upload, message, Form, Select, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { storage, ref, uploadBytes, getDownloadURL } from "../firebase";
import DiamondMountAPI from "../api/DiamondMountAPI";

const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;

const AddProduct = ({ onCreate }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [url, setUrl] = useState(null);
  const [form] = Form.useForm();
  const [diamondMounts, setDiamondMounts] = useState([]);

  useEffect(() => {
    fetchDiamondMounts();
  }, []);

  const fetchDiamondMounts = async () => {
    try {
      const response = await DiamondMountAPI.getAllDiamondMounts();
      setDiamondMounts(response.data);
    } catch (error) {
      console.error("Failed to fetch diamond mounts:", error);
      message.error("Failed to fetch diamond mounts.");
    }
  };

  const validatePositiveNumber = (_, value) => {
    if (value && value < 0) {
      return Promise.reject(new Error("Value cannot be negative!"));
    }
    return Promise.resolve();
  };

  const handleImageUpload = async (info) => {
    const { file } = info;
    if (file.status === "done" || file.status === "uploading") {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => {
          setImagePreview(reader.result);
        };

        try {
          const downloadURL = await uploadImageAndGetURL(file.originFileObj);
          setUrl(downloadURL);
          message.success("Image uploaded successfully");
        } catch (error) {
          console.error("Error uploading file:", error);
          message.error("Failed to upload image. Please try again.");
        }
      } else {
        message.error("You can only upload image files!");
      }
    } else if (file.status === "error") {
      console.error("Error uploading file:", file.error);
    }
  };

  const uploadImageAndGetURL = async (file) => {
    const storageRef = ref(storage, file.name);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    return isImage;
  };

  const handleFinish = async (values) => {
    if (!url) {
      message.error("Please upload an image!");
      return;
    }

    try {
      const selectedMount = diamondMounts.find(
        (mount) => mount.mountName === values.mountName
      );
      if (!selectedMount) {
        message.error("Invalid mount selection!");
        return;
      }

      // Remove componentsPrice and status from the newProduct object
      const { componentsPrice, status, ...productData } = values;
      const newProduct = { ...productData, mountId: selectedMount.mountId, url };

      await onCreate(newProduct);
      form.resetFields();
      setImagePreview(null);
      setUrl(null);
      message.success("Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error);
      message.error("Failed to add product. Please try again.");
    }
  };

  return (
    <Card className="p-6 bg-gray-100 min-h-screen">
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <div className="bg-white p-6 rounded shadow-lg">
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
                <TextArea placeholder="Type description here" rows={2} />
              </Form.Item>
              <Form.Item
                name="mountName"
                label="Mount"
                rules={[
                  { required: true, message: "Please select the mount!" },
                ]}
              >
                <Select placeholder="Select a mount">
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
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  name="componentsPrice"
                  label="Components Price"
                  rules={[{ validator: validatePositiveNumber }]}
                >
                  <Input placeholder="VND" type="number" disabled />
                </Form.Item>
              </div>
            </div>
            <div>
              <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                {url ? (
                  <img
                    src={imagePreview}
                    alt="Product Preview"
                    className="h-full object-contain"
                  />
                ) : (
                  <span>Image Preview</span>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Product Gallery</label>
                <Dragger
                  name="files"
                  accept="image/*"
                  className="mb-4"
                  beforeUpload={beforeUpload}
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
                    Only image files are allowed
                  </p>
                </Dragger>
              </div>
            </div>
          </div>
          <div className="flex justify-between space-x-4 mt-6">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                ADD NEW PRODUCT
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </Card>
  );
};

export default AddProduct;