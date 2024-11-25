import React, { useState } from "react";
import PortraitIcon from "@mui/icons-material/Portrait";
import { Input, Select, Button, Card } from "antd";
// import { Link } from 'react-router-dom';

export default function Checkout() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    district: "",
  });
  // eslint-disable-next-line
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="container mx-auto py-8">
      <img
        src="/assets/images/Song long diamond.png"
        alt="Song long Diamond"
        className="w-50 m-2"
      />

      <div className="flex justify-between">
        <div className="w-1/2 pr-8">
          <h2 className="text-2xl font-bold mb-4 w-60">Thông tin giao hàng</h2>
          {isLoggedIn ? (
            <div className="flex items-center mb-4">
              <PortraitIcon style={{ fontSize: 60, color: "gray" }} />
              <div className="ml-2">
                <p className="m-0">Trần Công Danh (trancongdanhye@gmail.com)</p>
                <a href="/logout" className="text-blue-500 block w-[74px]">
                  Đăng xuất
                </a>
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <p className="mb-4 w-60">
                Bạn đã có tài khoản?{" "}
                <a href="/login" className="text-blue-500">
                  Đăng nhập
                </a>
              </p>
            </div>
          )}
          {/* <div className="flex items-center mb-4">
                        <PortraitIcon style={{ fontSize: 60, color: 'gray' }} />
                        <div className="ml-2">
                            <p className="m-0">Username (user@gmail.com)</p>
                            <a href="/logout" className="text-blue-500 block w-[74px]">Đăng xuất</a>
                        </div>
                    </div> */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Họ và tên"
                className="w-full p-2 border rounded h-12"
              />
            </div>
            <div className="mb-4 flex">
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-1/2 p-2 border rounded mr-2 h-12"
              />
              <Input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Số điện thoại"
                className="w-1/2 p-2 border rounded ml-2 h-12"
              />
            </div>
            <div className="mb-4">
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Địa chỉ"
                className="w-full p-2 border rounded h-12"
              />
            </div>
            <div className="mb-4 flex">
              <Select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mr-2 w-full h-12"
              >
                <option value="">Chọn tỉnh / thành</option>
              </Select>
              <Select
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full ml-2 h-12"
              >
                <option value="">Chọn quận / huyện</option>
              </Select>
            </div>
            <div className="flex justify-between items-center">
              <a href="/cart" className="text-blue-500 w-[75px] mr-2">
                Giỏ hàng
              </a>
              <Button
                type="submit"
                className="w-1/2 h-12 bg-blue-500 text-white rounded"
              >
                Tiếp tục đến phương thức thanh toán
              </Button>
            </div>
          </form>
        </div>
        <div className="border-l-2 border-gray-300 mx-4"></div>
        <Card className="w-1/2">
          <div className="flex justify-between items-center mb-2">
            <img
              src="https://via.placeholder.com/50"
              alt="Product"
              className="w-16 h-16"
            />
            <div className="flex-1 ml-4">
              <p className="w-44">
                Kim cương viên LUCKY STAR 4.4ly H VS1 EX M2B47001
              </p>
              <p className="text-gray-500 w-20">H / VS1 / EX</p>
            </div>
            <p>27,034,000₫</p>
          </div>
          <div className="border-b my-4"></div>
          <div className="flex justify-between mb-2">
            <Input
              type="text"
              placeholder="Mã giảm giá"
              className="w-2/3 p-2 border rounded mr-2"
            />
            <Button className="w-1/3 p-2 bg-blue-300 rounded h-10">
              Áp dụng
            </Button>
          </div>
          <div className="border-b my-4"></div>
          <div className="flex justify-between mb-2">
            <p>Tạm tính</p>
            <p>27,034,000₫</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Phí vận chuyển</p>
            <p>-</p>
          </div>
          <div className="border-b my-4"></div>
          <div className="flex justify-between mb-2">
            <p className="text-xl font-bold">Tổng cộng</p>
            <p className="text-xl font-bold">27,034,000₫</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
