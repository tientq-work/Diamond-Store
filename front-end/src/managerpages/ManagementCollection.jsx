import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Collapse,
  List,
  message,
  Select,
  Spin,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CollectionAPI from "../api/CollectionAPI";
import ProductAPI from "../api/ProductAPI";
import { storage, ref, uploadBytes, getDownloadURL } from "../firebase";

const Collection = () => {
  const [collections, setCollections] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [loadingCollections, setLoadingCollections] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [url, setUrl] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    setLoadingCollections(true);
    try {
      const response = await CollectionAPI.getAllCollections();
      setCollections(
        response.data.data.map((collection) => ({
          ...collection,
          products: [],
        }))
      );
    } catch (error) {
      message.error("Failed to fetch collections");
    } finally {
      setLoadingCollections(false);
    }
  };

  const fetchProducts = async (collectionId) => {
    try {
      const response = await CollectionAPI.getProduct(collectionId);
      return response.data.data;
    } catch (error) {
      // message.error("Failed to fetch products");
      return [];
    }
  };

  const fetchAllProducts = async () => {
    setLoadingProducts(true);
    try {
      const response = await ProductAPI.products();
      setAllProducts(response.data.data);
    } catch (error) {
      message.error("Failed to fetch all products");
    } finally {
      setLoadingProducts(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showProductModal = async (collection) => {
    setEditingCollection(collection);
    await fetchAllProducts();
    setAvailableProducts(
      allProducts.filter(
        (product) =>
          !collection.products.some((p) => p.productId === product.productId)
      )
    );
    setIsProductModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCollection(null);
  };

  const handleProductCancel = () => {
    setIsProductModalVisible(false);
  };

  const handleFinish = async (values) => {
    if (!url) {
      message.error("Please upload an image!");
      return;
    }

    if (editingCollection) {
      try {
        const updatedData = {
          name: values.collectionName,
          description: values.description,
          url: url,
        };
        await CollectionAPI.updateCollection(
          editingCollection.collectionId,
          updatedData
        );
        setCollections((prev) =>
          prev.map((col) =>
            col.collectionId === editingCollection.collectionId
              ? { ...col, ...updatedData }
              : col
          )
        );
        message.success("Collection updated successfully");
      } catch (error) {
        message.error("Failed to update collection");
      }
    } else {
      try {
        const newCollection = {
          name: values.collectionName,
          description: values.description,
          url: url,
        };
        const response = await CollectionAPI.createCollection(newCollection);
        setCollections([...collections, { ...response.data, products: [] }]);
        message.success("Collection created successfully");
      } catch (error) {
        message.error("Failed to create collection");
      }
    }
    setIsModalVisible(false);
    setEditingCollection(null);
    setImagePreview(null);
    setUrl(null);
  };

  const handleProductFinish = async (values) => {
    if (!editingCollection) {
      message.error("No collection selected for adding a product");
      return;
    }

    const newProduct = allProducts.find(
      (p) => p.productId === values.productId
    );

    try {
      await CollectionAPI.addProductToCollection({
        collectionId: editingCollection.collectionId,
        productIds: [newProduct.productId],
      });
      setCollections((prev) =>
        prev.map((col) =>
          col.collectionId === editingCollection.collectionId
            ? { ...col, products: [...col.products, newProduct] }
            : col
        )
      );
      message.success("Product added successfully");
    } catch (error) {
      message.error("Failed to add product");
    }
    setIsProductModalVisible(false);
  };

  const handleEdit = (record) => {
    setEditingCollection(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (collectionId) => {
    try {
      await CollectionAPI.deleteCollection(collectionId);
      setCollections((prev) =>
        prev.filter((col) => col.collectionId !== collectionId)
      );
      message.success("Collection deleted successfully");
    } catch (error) {
      message.error("Failed to delete collection");
    }
  };

  const handleDeleteProduct = async (collectionId, productId) => {
    try {
      const response = await CollectionAPI.deleteProduct({
        collectionId,
        productIds: [productId],
      });
      if (response.data.success) {
        setCollections((prev) =>
          prev.map((col) =>
            col.collectionId === collectionId
              ? {
                  ...col,
                  products: col.products.filter(
                    (product) => product.productId !== productId
                  ),
                }
              : col
          )
        );
        message.success("Product deleted successfully");
      }
    } catch (error) {
      message.error("Failed to delete product");
    }
  };

  const handleExpand = async (expanded, record) => {
    if (expanded) {
      const products = await fetchProducts(record.collectionId);
      setCollections((prev) =>
        prev.map((col) =>
          col.collectionId === record.collectionId
            ? { ...col, products: products }
            : col
        )
      );
    }
  };

  const handleImageUpload = async (info) => {
    const { file } = info;
    if (file.status === "uploading") {
      message.loading({ content: "Uploading...", key: "uploadStatus" });
      return;
    }
    if (file.status === "done") {
      message.destroy();
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => {
          setImagePreview(reader.result);
        };
  
        try {
          const storageRef = ref(storage, `collections/${file.name}`);
          const snapshot = await uploadBytes(storageRef, file.originFileObj);
          const downloadURL = await getDownloadURL(snapshot.ref);
          setUrl(downloadURL);
          message.success({ content: "Image uploaded successfully", key: "uploadStatus" });
        } catch (error) {
          console.error("Error uploading file:", error);
          message.error({ content: "Failed to upload image. Please try again.", key: "uploadStatus" });
        }
      } else {
        message.error({ content: "You can only upload image files!", key: "uploadStatus" });
      }
    } else if (file.status === "error") {
      message.destroy();
      console.error("Error uploading file:", file.error);
      message.error({ content: "Failed to upload image. Please try again.", key: "uploadStatus" });
    }
  };
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    return isImage;
  };

  const columns = [
    { title: "ID", dataIndex: "collectionId", key: "collectionId" },
    { title: "Name", dataIndex: "collectionName", key: "collectionName" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button 
            type="link" 
            onClick={() => handleEdit(record)}
            className="transition duration-300 ease-in-out transform hover:scale-105 hover:text-blue-600"
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDelete(record.collectionId)}
            className="transition duration-300 ease-in-out transform hover:scale-105 hover:text-red-600"
          >
            Delete
          </Button>
        </span>
      ),
    },
  ]
  return (
    <div>
      <div className="flex justify-between w-full p-6">
        <h1 className="text-2xl font-bold">Collection</h1>
        <button
          className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 mr-2"
          onClick={showModal}
        >
          + ADD COLLECTION
        </button>
      </div>
      {loadingCollections ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={collections}
          rowKey="collectionId"
          expandable={{
            expandedRowRender: (record) => (
              <Collapse>
                <Collapse.Panel header="Products" key="1">
                  <List
                    dataSource={record.products}
                    renderItem={(product) => (
                      <List.Item
                        key={product.productId}
                        actions={[
                          <Button
                            key="delete"
                            type="link"
                            danger
                            onClick={() =>
                              handleDeleteProduct(
                                record.collectionId,
                                product.productId
                              )
                            }
                          >
                            Delete
                          </Button>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={
                            <img
                              src={product.url}
                              alt={product.productName}
                              style={{ width: 50, height: 50 }}
                            />
                          }
                          title={product.productName}
                          description={`Price: ${product.price.toLocaleString()} VND`}
                        />
                      </List.Item>
                    )}
                  />
                  <Button
                    type="dashed"
                    onClick={() => showProductModal(record)}
                    style={{ width: "100%", marginTop: 16 }}
                  >
                    + Add Product
                  </Button>
                </Collapse.Panel>
              </Collapse>
            ),
            onExpand: handleExpand,
          }}
        />
      )}
      <Modal
        title={editingCollection ? "Edit Collection" : "Add Collection"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          initialValues={
            editingCollection || { collectionName: "", description: "" }
          }
          onFinish={handleFinish}
        >
          <Form.Item
            name="collectionName"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
          <Form.Item name="url" label="Image">
            <Upload
              name="files"
              accept="image/*"
              listType="picture-card"
              beforeUpload={beforeUpload}
              onChange={handleImageUpload}
              showUploadList={false}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Product Preview"
                  style={{ width: "100%" }}
                />
              ) : (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingCollection ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Add Product"
        visible={isProductModalVisible}
        onCancel={handleProductCancel}
        footer={null}
      >
        <Form
          initialValues={{
            productId: "",
          }}
          onFinish={handleProductFinish}
        >
          <Form.Item
            name="productId"
            label="Select Product"
            rules={[{ required: true, message: "Please select a product!" }]}
          >
            <Select
              placeholder="Select a product"
              loading={loadingProducts}
              disabled={loadingProducts}
            >
              {availableProducts.map((product) => (
                <Select.Option
                  key={product.productId}
                  value={product.productId}
                >
                  {product.productName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Collection;
