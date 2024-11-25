import { useState, useEffect } from "react";
import {
  Input,
  Button,
  Radio,
  DatePicker,
  List,
  Modal,
  Form,
  message,
} from "antd";
import AuthAPI from "../api/AuthAPI";
import VoucherTypeAPI from "../api/VoucherTypeAPI";
import VoucherAPI from "../api/VoucherAPI";
import UserAPI from "../api/UserAPI";
import openNotificationWithIcon from "../notification";
import moment from "moment";

export default function UserInfo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(null);
  const [point, setPoint] = useState(0);
  const [voucherTypes, setVoucherTypes] = useState([]);
  const [selectedVoucherType, setSelectedVoucherType] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] =
    useState(false);
  const [form] = Form.useForm();
  const userId = localStorage.getItem("userId");

  // New state for address
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await AuthAPI.getUserById(userId);
        if (response.status === 200) {
          const userData = response.data.data;
          setName(userData.fullName);
          setEmail(userData.email);
          setPhone(userData.phone);
          setGender(userData.gender);
          setDob(moment(userData.dob));

          if (userData.dob) {
            const parsedDate = moment(userData.dob, "DD-MM-YYYY");
            setDob(parsedDate.isValid() ? parsedDate : null);
          } else {
            setDob(null);
          }

          setPoint(userData.point);
          
          // Set address from user data
          setAddress(userData.address || "");
        } else {
          openNotificationWithIcon("error", "Failed to fetch user details");
        }
      } catch (error) {
        openNotificationWithIcon(
          "error",
          "Failed to fetch user details",
          error.message
        );
      }
    };

    const fetchVoucherTypes = async () => {
      try {
        const response = await VoucherTypeAPI.getAll();
        const enhancedVoucherTypes = response.data.map((voucher) => ({
          ...voucher,
          discountLength: voucher.discountLength,
          pointNeeded: voucher.pointNeeded,
          active: voucher.active,
        }));
        setVoucherTypes(enhancedVoucherTypes);
      } catch (error) {
        openNotificationWithIcon(
          "error",
          "Failed to fetch voucher types",
          error.message
        );
      }
    };

    fetchUserDetails();
    fetchVoucherTypes();
  }, [userId]);

  const handleSave = async () => {
    const userData = {
      fullName: name,
      phone,
      dob: dob ? dob.format("DD-MM-YYYY") : null,
      gender,
      address, // Include address in user data
    };
  
    try {
      const response = await AuthAPI.updateUser(userId, userData);
      if (response.status === 200) {
        openNotificationWithIcon("success", "Details updated successfully");
      } else {
        openNotificationWithIcon("error", "Failed to update details");
      }
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Failed to update details",
        error.message
      );
    }
  }; 

  const handleVoucherSelect = (voucherType) => {
    setSelectedVoucherType(voucherType);
    setIsModalVisible(true);
  };

  const handleCreateVoucher = async () => {
    if (!selectedVoucherType) {
      openNotificationWithIcon("warning", "Please select a voucher type");
      return;
    }
  
    const voucherData = {
      voucherTypeId: selectedVoucherType.voucherTypeId,
    };
  
    try {
      const response = await VoucherAPI.create(userId, voucherData);
      console.log("API Response:", response);
  
      if (response.success) {
        openNotificationWithIcon("success", "Add voucher successfully");
        setIsModalVisible(false);
      } else {
        openNotificationWithIcon("error", "Add voucher failed: " + (response.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error in voucher creation:", error);
      openNotificationWithIcon(
        "error",
        "Add voucher failed",
        error.message || "Unknown error"
      );
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOpenChangePasswordModal = () => {
    setIsChangePasswordModalVisible(true);
  };

  const handleChangePassword = async (values) => {
    try {
      const response = await UserAPI.changePassword(userId, values);
      if (response.success) {
        message.success("Password changed successfully");
        setIsChangePasswordModalVisible(false);
        form.resetFields();
      } else {
        message.error(response.message || "Failed to change password");
      }
    } catch (error) {
      message.error(error.message || "Failed to change password");
    }
  };

  const handleChangePasswordCancel = () => {
    setIsChangePasswordModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="flex flex-col items-center justify-center my-10 bg-pink-100 min-h-screen">
      <div
        className="w-full max-w-4xl bg-white p-6 rounded-lg mb-4 
                    border-2 border-blue-500 
                    shadow-lg 
                    bg-gradient-to-r from-blue-50 via-white to-blue-50
                    transition-all duration-300 hover:shadow-xl"
      >
        <h1 className="text-2xl text-center font-semibold mb-8">
          Thông tin tài khoản
        </h1>
        <div className="flex flex-col space-y-8">
          <div className="flex items-center">
            <label className="w-32">Họ và tên:</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex items-center">
            <label className="w-32">Email:</label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              disabled
            />
          </div>
          <div className="flex items-center">
            <label className="w-32">Số điện thoại:</label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex items-center">
            <label className="w-32">Giới tính:</label>
            <Radio.Group
              onChange={(e) => setGender(e.target.value)}
              value={gender}
              className="w-full"
            >
              <Radio value="male">Nam</Radio>
              <Radio value="female">Nữ</Radio>
            </Radio.Group>
          </div>  
          <div className="flex items-center">
            <label className="w-32">Ngày sinh:</label>
            <DatePicker
              value={dob}
              onChange={(date) => setDob(date)}
              className="w-full"
              format="DD-MM-YYYY"
            />
          </div>
          <div className="flex items-center">
            <label className="w-32">Địa chỉ:</label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex items-center">
            <label className="w-32">Điểm:</label>
            <Input
              value={point}
              onChange={(e) => setPoint(e.target.value)}
              className="w-full"
              type="number"
              disabled
            />
          </div>
          <div className="flex justify-between space-x-4">
            <Button
              type="primary"
              className="w-1/2 hover:bg-blue-600 transition duration-300"
              onClick={handleSave}
            >
              Lưu
            </Button>
            <Button
              type="default"
              className="w-1/2 hover:bg-gray-200 transition duration-300"
              onClick={handleOpenChangePasswordModal}
            >
              Đổi mật khẩu
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl bg-pink-100 h-4"></div>

      <div
        className="w-full max-w-4xl bg-white p-4 rounded-lg
                    border-2 border-blue-500 
                    shadow-lg 
                    bg-gradient-to-r from-blue-50 via-white to-blue-50
                    transition-all duration-300 hover:shadow-xl"
      >
        <h2 className="text-lg font-semibold">Loại Voucher</h2>
        <List
          itemLayout="horizontal"
          dataSource={voucherTypes}
          renderItem={(voucher) => (
            <List.Item
              key={voucher.id}
              onClick={() => handleVoucherSelect(voucher)}
              className="cursor-pointer"
            >
              <List.Item.Meta
                title={`Loại Voucher ID: ${voucher.voucherTypeId}`}
                description={`Giảm giá: ${voucher.discount * 100}%`}
              />
              <div>
                Thời gian giảm giá: {voucher.discountLength} ngày
                <br />
                Điểm cần thiết: {voucher.pointNeeded}
                <br />
                Hoạt động: {voucher.active ? "Có" : "Không"}
              </div>
            </List.Item>
          )}
        />
      </div>
      <Modal
        title="Chọn loại voucher để tạo voucher"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button
            key="create"
            type="primary"
            onClick={handleCreateVoucher}
            disabled={!selectedVoucherType}
          >
            Tạo Voucher
          </Button>,
        ]}
      >
        {selectedVoucherType && (
          <div>
            <p>
              Bạn đang chọn Loại Voucher ID: {selectedVoucherType.voucherTypeId}
            </p>
            <p>Thời gian giảm giá: {selectedVoucherType.discountLength} ngày</p>
            <p>Điểm cần thiết: {selectedVoucherType.pointNeeded}</p>
            <p>Hoạt động: {selectedVoucherType.active ? "Có" : "Không"}</p>
          </div>
        )}
      </Modal>
      <Modal
        title="Đổi mật khẩu"
        visible={isChangePasswordModalVisible}
        onCancel={handleChangePasswordCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleChangePassword}>
          <Form.Item
            name="oldPassword"
            label="Mật khẩu hiện tại"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu hiện tại" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu mới"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Xác nhận mật khẩu mới"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu mới" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}