import { useState, useEffect } from "react";
import { Table, Spin, message } from "antd";
import DiamondAPI from "../api/DiamondAPI";

const formatCurrency = (amount) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
};


export default function ListDiamond() {
  const [diamonds, setDiamonds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiamonds = async () => {
      try {
        const response = await DiamondAPI.getAllDiamonds();
        setDiamonds(response.data);
        setLoading(false);
      } catch (error) {
        message.error("Failed to fetch diamonds.");
        setLoading(false);
      }
    };

    fetchDiamonds();
  }, []);

  const columns = [
    {
      title: "Diamond Name",
      dataIndex: "diamondName",
      key: "diamondName",
    },
    {
      title: "Origin",
      dataIndex: "origin",
      key: "origin",
    },
    {
      title: "Shape",
      dataIndex: "shape",
      key: "shape",
    },
    {
      title: "Carat Weight",
      dataIndex: "caratWeight",
      key: "caratWeight",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Clarity",
      dataIndex: "clarity",
      key: "clarity",
    },
    {
      title: "Cut",
      dataIndex: "cut",
      key: "cut",
    },
    {
      title: "Base Price",
      dataIndex: "basePrice",
      key: "basePrice",
      render: (text) => formatCurrency(text),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold mb-4">List Diamond Product</h1>
      </div>
      {loading ? (
        <Spin tip="Loading..." />
      ) : (
        <Table columns={columns} dataSource={diamonds} rowKey="id" />
      )}
    </div>
  );
}