import { useState, useEffect } from "react";
import { Table, Spin, message } from "antd";
import DiamondMountAPI from "../api/DiamondMountAPI";

const formatCurrency = (amount) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
};


export default function ListDiamondMount() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiamondMounts = async () => {
      try {
        const response = await DiamondMountAPI.getAllDiamondMounts();
        setDataSource(response.data);
        setLoading(false);
      } catch (error) {
        message.error("Failed to fetch diamond mounts.");
        setLoading(false);
      }
    };

    fetchDiamondMounts();
  }, []);

  const columns = [
    {
      title: "Mount Name",
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
    },
    {
      title: "Material",
      dataIndex: "material",
      key: "material",
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
        <h1 className="text-2xl font-bold mb-4">List Diamond Mount</h1>
      </div>
      {loading ? (
        <Spin tip="Loading..." />
      ) : (
        <Table dataSource={dataSource} columns={columns} rowKey="mountId" />
      )}
    </div>
  );
}