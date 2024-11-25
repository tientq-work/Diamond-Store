import { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Table, DatePicker, message } from "antd";
import PromotionAPI from "../api/PromotionAPI";
import moment from "moment";

const { TextArea } = Input;

function Promotion() {
  const [promotions, setPromotions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    promotionName: "",
    description: "",
    startDate: null,
    endDate: null,
  });
  const [editingPromotion, setEditingPromotion] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await PromotionAPI.getAll();
        setPromotions(data.data);
      } catch (error) {
        console.error("Error fetching promotions", error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (promotionId) => {
    try {
      await PromotionAPI.updateStatus(promotionId);
      setPromotions(
        promotions.map((promo) =>
          promo.promotionId === promotionId
            ? { ...promo, active: false }
            : promo
        )
      );
      message.success("Promotion deactivated successfully");
    } catch (error) {
      console.error("Error updating promotion status", error);
      message.error("Failed to deactivate promotion");
    }
  };

  const activatePromotion = async (promotionId) => {
    try {
      await PromotionAPI.updateStatus(promotionId);
      setPromotions(
        promotions.map((promo) =>
          promo.promotionId === promotionId ? { ...promo, active: true } : promo
        )
      );
      message.success("Promotion activated successfully");
    } catch (error) {
      console.error("Error activating promotion", error);
      message.error("Failed to activate promotion");
    }
  };

  const handleEdit = (promotion) => {
    setFormData({
      ...promotion,
      startDate: promotion.startDate ? moment(promotion.startDate, "DD-MM-YYYY") : null,
      endDate: promotion.endDate ? moment(promotion.endDate, "DD-MM-YYYY") : null,
    });
    setEditingPromotion(promotion);
    setShowModal(true);
  };

  const handleCreate = () => {
    setFormData({
      promotionName: "",
      description: "",
      startDate: null,
      endDate: null,
    });
    setEditingPromotion(null);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      const formattedFormData = {
        ...formData,
        startDate: formData.startDate
          ? formData.startDate.format("DD-MM-YYYY")
          : null,
        endDate: formData.endDate
          ? formData.endDate.format("DD-MM-YYYY")
          : null,
      };
      if (editingPromotion) {
        await PromotionAPI.update(
          editingPromotion.promotionId,
          formattedFormData
        );
        message.success("Promotion updated successfully");
      } else {
        await PromotionAPI.create(formattedFormData);
        message.success("Promotion created successfully");
      }
      const data = await PromotionAPI.getAll();
      setPromotions(data.data);
      setShowModal(false);
    } catch (error) {
      console.error("Error submitting form", error);
      message.error("Failed to save promotion");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "promotionId",
      key: "promotionId",
    },
    {
      title: "Name",
      dataIndex: "promotionName",
      key: "promotionName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate) =>
        startDate ? moment(startDate, "DD-MM-YYYY").format("DD-MM-YYYY") : "",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate) =>
        endDate ? moment(endDate, "DD-MM-YYYY").format("DD-MM-YYYY") : "",
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (active) => (active ? "Active" : "Inactive"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex space-x-2">
          {record.active ? (
            <Button
              type="primary"
              danger
              onClick={() => handleDelete(record.promotionId)}
              className="hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Deactivate
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => activatePromotion(record.promotionId)}
              className="hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Activate
            </Button>
          )}
          <Button
            type="primary"
            onClick={() => handleEdit(record)}
            className="hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center p-6">
        <h2 className="text-2xl font-bold">Promotions</h2>
        <button
          className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 mr-2"
          onClick={handleCreate}
        >
          + ADD PROMOTION
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={promotions}
        rowKey="promotionId"
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title={editingPromotion ? "Update Promotion" : "Create Promotion"}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={handleSubmit}
        okText={editingPromotion ? "Update Promotion" : "Create Promotion"}
      >
        <Form layout="vertical">
          <Form.Item label="Promotion Name">
            <Input
              type="text"
              name="promotionName"
              value={formData.promotionName}
              onChange={handleInputChange}
              required
            />
          </Form.Item>
          <Form.Item label="Description">
            <TextArea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              required
            />
          </Form.Item>
          <Form.Item label="Start Date">
            <DatePicker
              name="startDate"
              value={formData.startDate}
              onChange={(date) => setFormData({ ...formData, startDate: date })}
              format="DD-MM-YYYY"
              required
            />
          </Form.Item>
          <Form.Item label="End Date">
            <DatePicker
              name="endDate"
              value={formData.endDate}
              onChange={(date) => setFormData({ ...formData, endDate: date })}
              format="DD-MM-YYYY"
              required
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Promotion;