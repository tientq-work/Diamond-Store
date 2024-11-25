/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Table, Button, Modal, message } from "antd";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";
import ProductAPI from "../api/ProductAPI";

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});
  const [filteredInfo, setFilteredInfo] = useState({});
  const [isAddProductModalVisible, setIsAddProductModalVisible] = useState(false);
  const [isUpdateProductModalVisible, setIsUpdateProductModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await ProductAPI.products();
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
    setFilteredInfo(filters);
  };

  const handleAddProduct = async (product) => {
    try {
      const response = await ProductAPI.addProduct(product);
      if (response.data.success) {
        message.success("Product added successfully");
        setProducts([...products, response.data.data]);
        setIsAddProductModalVisible(false);
      } else {
        message.error(response.data.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      message.error("Failed to add product");
    }
  };

  const handleUpdateProduct = (updatedProduct) => {
    setSelectedProduct(updatedProduct);
    setIsUpdateProductModalVisible(true);
  };

  const handleUpdateExistingProduct = async (updatedProduct) => {
    try {
      const response = await ProductAPI.updateProduct(updatedProduct);
      if (response.data.success) {
        message.success("Product updated successfully");
        setProducts((prevProducts) => {
          const updatedIndex = prevProducts.findIndex(
            (p) => p.productId === updatedProduct.productId
          );
          if (updatedIndex !== -1) {
            const updatedProducts = [...prevProducts];
            updatedProducts[updatedIndex] = updatedProduct;
            return updatedProducts;
          }
          return prevProducts;
        });
        setIsUpdateProductModalVisible(false);
      } else {
        message.error(response.data.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      message.error("Failed to update product");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await ProductAPI.deleteProduct(productId);
      if (response.data.success) {
        message.success("Product deleted successfully");
        setProducts(products.filter((p) => p.productId !== productId));
        setIsUpdateProductModalVisible(false);
      } else {
        message.error(response.data.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error("Failed to delete product");
    }
  };

  const nameFilterOptions = [
    "Nhẫn",
    "Dây chuyền",
    "Vòng cổ",
    "Vòng tay",
    "Vòng đeo tay",
    "Lắc tay",
    "Mặt dây chuyền",
  ];

  const statusFilterOptions = [
    { text: "InStock", value: "InStock" },
    { text: "OutOfStock", value: "OutOfStock" },
  ];
  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
  };
  const columns = [
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Image",
      dataIndex: "url",
      key: "url",
      render: (image) => (
        <img src={image} alt="Product" className="w-20 h-auto" />
      ),
    },
    {
      title: "Name",
      dataIndex: "productName",
      key: "productName",
      filters: nameFilterOptions.map((name) => ({
        text: name,
        value: name,
      })),
      filteredValue: filteredInfo.productName || null,
      onFilter: (value, record) => record.productName.includes(value),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => formatCurrency(price),
    },
    {
      title: "Stock",
      dataIndex: "status",
      key: "status",
      filters: statusFilterOptions,
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <span style={{ color: status === "InStock" ? "green" : "red" }}>
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, product) => (
        <span>
          <Button
            type="primary"
            onClick={() => handleUpdateProduct(product)}
            className="hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Edit
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold">All Products</h1>
        <button
          className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 mr-2"
          onClick={() => setIsAddProductModalVisible(true)}
        >
          + ADD NEW PRODUCT
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={products}
        rowKey="productId"
        onChange={handleChange}
      />
      <Modal
        title="Add New Product"
        visible={isAddProductModalVisible}
        footer={null}
        onCancel={() => setIsAddProductModalVisible(false)}
        width={1500}
      >
        <AddProduct onCreate={handleAddProduct} />
      </Modal>
      <Modal
        title="Update Product"
        visible={isUpdateProductModalVisible}
        footer={null}
        onCancel={() => setIsUpdateProductModalVisible(false)}
        width={1500}
      >
        <UpdateProduct
          product={selectedProduct}
          onUpdate={handleUpdateExistingProduct}
          onDelete={handleDeleteProduct}
        />
      </Modal>
    </div>
  );
};

export default ListProduct;