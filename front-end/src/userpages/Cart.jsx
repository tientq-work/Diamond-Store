import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Typography } from "@mui/material";
import { Button, Checkbox, Divider, InputNumber, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../features/Cart/cartSlice";
import notification from "../notification";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const location = useLocation();
  const { cc = [] } = location.state || {};
  const [selectedItems, setSelectedItems] = useState(
    location.state?.selectedItems || []
  );
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  console.log("hello", cc);

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
    messageApi.success('Sản phẩm đã được xóa khỏi giỏ hàng');
  };

  const handleQuantityChange = (item, quantity) => {
    dispatch(updateCartItemQuantity({ ...item, quantity }));
  };

  const handleCheckboxChange = (item) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item.productId)) {
        return prevSelectedItems.filter(
          (productId) => productId !== item.productId
        );
      } else {
        return [...prevSelectedItems, item.productId];
      }
    });
  };

  console.log("cc", selectedItems);

  const selectedCartItems = cartItems.filter((item) =>
    selectedItems.includes(item.productId)
  );
  const handleProceedToCheckout = async () => {
    if (selectedItems.length === 0) {
      message.info({
        content: 'Bạn hãy chọn 1 sản phẩm để thanh toán nhé ^.^',
        duration: 2,
      });
      return;
    }
  
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        notification.warning({
          message: "Cảnh báo",
          description: "Bạn phải đăng nhập trước khi tiến hành thanh toán.",
        });
      } else {
        navigate("/payment-method", { state: { selectedCartItems } });
      }
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = cartItems
    .filter((item) => selectedItems.includes(item.productId))
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

  const discount = 0;
  const finalPrice = totalPrice - discount;

  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  useEffect(() => {
    if (location.state?.selectedItems) {
      setSelectedItems(location.state.selectedItems);
      // Clear the state after using it
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [cartItems, location.pathname, location.state, navigate]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fade-in {
        animation: fadeIn 0.3s ease-out;
      }
      body {
        background-color: #FFF0F5;  
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      {contextHolder}
      <Spin spinning={loading}>
        <div className="min-h-screen flex items-center justify-center fade-in" style={{ backgroundColor: '#FFF0F5' }}>
          <div className="cart p-4 bg-white shadow-lg rounded-lg w-3/4">
            <nav className="mb-4">
              <ol className="list-reset flex text-gray-700 ml-2">
                <li>
                  <a href="/" className="text-blue-500">
                    Trang Chủ
                  </a>
                </li>
                <li>
                  <span className="mx-2">
                    <KeyboardArrowRightIcon />
                  </span>
                </li>
                <li>
                  <a href="/checkout" className="text-gray-500">
                    Giỏ Hàng
                  </a>
                </li>
              </ol>
            </nav>
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h5">
                GIỎ HÀNG ({cartItems.length} sản phẩm)
              </Typography>
              <Button type="link" href="http://localhost:5173/list-product">
                TIẾP TỤC MUA HÀNG
              </Button>
            </div>
            {cartItems.length > 0 ? (
              <div className="flex justify-between">
                <div className="w-2/3">
                  {cartItems.map((item, index) => (
                    <div
                      className="cart-item flex mb-4 items-center"
                      key={`${item.id}-${item.code}-${item.price}-${item.quantity}`}
                      style={{
                        opacity: 0,
                        animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`,
                      }}
                    >
                      <Checkbox
                        checked={selectedItems.includes(item.productId)}
                        onChange={() => handleCheckboxChange(item)}
                      />
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-36 h-36 ml-4"
                      />
                      <div className="item-details ml-4 flex-grow">
                        <Typography variant="h6" className="mb-2">
                          {item.name}
                        </Typography>
                        <div className="grid grid-cols-2 gap-2">
                          <Typography variant="body2" className="font-semibold">
                            Tên sản phẩm:
                          </Typography>
                          <Typography variant="body2">
                            {item.productName}
                          </Typography>
                          <Typography variant="body2" className="font-semibold">
                            Giá:
                          </Typography>
                          <Typography
                            variant="body2"
                            className="text-red-600 font-bold"
                          >
                            {formatCurrency(item.price)}
                          </Typography>
                          <Typography variant="body2" className="font-semibold">
                            Số lượng:
                          </Typography>
                          <div className="quantity flex items-center">
                            <div className="custom-input-number flex items-center">
                              <button
                                className="decrement-btn px-2 py-1 border border-gray-300 rounded-l focus:outline-none"
                                onClick={() =>
                                  handleQuantityChange(item, item.quantity - 1)
                                }
                                disabled={item.quantity <= 1}
                              >
                                <MinusOutlined />
                              </button>
                              <InputNumber
                                min={1}
                                value={item.quantity}
                                onChange={(value) =>
                                  handleQuantityChange(item, value)
                                }
                                className="text-center border-t border-b border-gray-300 w-14 text-center"
                                controls={false}
                              />
                              <button
                                className="increment-btn px-2 py-1 border border-gray-300 rounded-r focus:outline-none"
                                onClick={() =>
                                  handleQuantityChange(item, item.quantity + 1)
                                }
                              >
                                <PlusOutlined />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex mt-4">
                          <Button
                            onClick={() => handleRemoveFromCart(item)}
                            className="bg-gray-200 hover:bg-red-500 hover:text-blue transition-colors duration-300"
                          >
                            Xóa
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="summary w-1/3">
                  <Typography variant="h6" className="mb-2">
                    Tổng tiền
                  </Typography>
                  <Divider />
                  <div className="flex justify-between">
                    <Typography variant="body2">Tạm tính:</Typography>

                    <Typography variant="body2">
                      {formatCurrency(totalPrice)}
                    </Typography>
                  </div>
                  <Divider />
                  <div className="flex justify-between">
                    <Typography variant="body2">Giảm giá:</Typography>
                    <Typography variant="body2">
                      {formatCurrency(discount)}
                    </Typography>
                  </div>
                  <Divider />
                  <div className="flex justify-between">
                    <Typography variant="body2">Vận chuyển:</Typography>
                    <Typography variant="body2">Miễn phí vận chuyển</Typography>
                  </div>
                  <Divider />
                  <div className="flex justify-between">
                    <Typography variant="body2">Thành tiền:</Typography>
                    <Typography variant="body2" className="text-red-600 font-bold">
                      {formatCurrency(finalPrice)}
                    </Typography>
                  </div>
                  <Button
  type="primary"
  className="w-full mt-2 bg-blue-500 h-[50px]"
  onClick={handleProceedToCheckout}
  disabled={selectedItems.length === 0}
  style={{
    transition: 'all 0.3s ease',
    opacity: selectedItems.length === 0 ? 0.5 : 1,
  }}
  onMouseEnter={(e) => {
    if (selectedItems.length > 0) {
      e.currentTarget.style.transform = 'scale(1.05)';
      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    }
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = 'none';
  }}
>
  TIẾN HÀNH ĐẶT HÀNG
</Button>
                </div>
              </div>
            ) : (
              <div className="h-[50vh] flex flex-col items-center justify-center fade-in">
                <Typography variant="h6" className="my-10">
                  Giỏ hàng không có sản phẩm
                </Typography>
                <a href="http://localhost:5173/list-product">
                  <button className="bg-black text-white px-4 py-2 rounded-full transition duration-300 ease-in-out hover:bg-green-500 hover:text-black">
                    TIẾP TỤC MUA HÀNG
                  </button>
                </a>
              </div>
            )}
          </div>
        </div>
      </Spin>
    </>
  );
}