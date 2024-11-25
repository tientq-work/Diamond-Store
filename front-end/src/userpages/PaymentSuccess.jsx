import CheckCircleOutlineTwoToneIcon from "@mui/icons-material/CheckCircleOutlineTwoTone";
import { Button, Card, Divider } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderInfo, setOrderInfo] = useState(null);

  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
  };

  useEffect(() => {
    if (location.state) {
      const { orderData, items, discount, finalPrice } = location.state;
      setOrderInfo({ orderData, items, discount, finalPrice });
    } else {
      const orderId = searchParams.get('orderId');
      if (orderId) {
        setLoading(true);
        fetchOrderDetails(orderId)
          .then(data => {
            setOrderInfo(data);
            setLoading(false);
          })
          .catch(err => {
            console.error("Error fetching order details:", err);
            setError("Không thể tải thông tin đơn hàng. Vui lòng thử lại sau.");
            setLoading(false);
          });
      } else {
        setError("Không tìm thấy thông tin đơn hàng.");
      }
    }
  }, [location.state, searchParams]);

  if (loading) {
    return (
      <div className="flex flex-col items-center p-6">
        <div className="w-full max-w-6xl bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mt-4">Đang tải thông tin đơn hàng...</h2>
        </div>
      </div>
    );
  }

  if (error || !orderInfo) {
    return (
      <div className="flex flex-col items-center p-6">
        <div className="w-full max-w-6xl bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mt-4">
            Lỗi khi hoàn tất thanh toán
          </h2>
          <p className="text-gray-500">
            {error || "Không thể tải thông tin đơn hàng. Vui lòng thử lại sau."}
          </p>
          <Link to="/">
            <Button type="primary">Tiếp tục mua hàng</Button>
          </Link>
        </div>
      </div>
    );
  }

  const { orderData, items = [], discount = 0, finalPrice = 0 } = orderInfo;

  return (
    <div className="flex flex-col items-center p-6">
      <div className="w-full max-w-6xl bg-white p-6 shadow-lg rounded-lg">
        <div className="text-center mb-6">
          <img
            src="src/assets/images/Songlong.png"
            alt="Song long Diamond"
            className="w-32 mx-auto"
          />
          <h2 className="text-2xl font-semibold mt-4">Đặt hàng thành công</h2>
          <p className="text-gray-500">Cảm ơn bạn đã mua hàng!</p>
        </div>
        <Card className="mb-6">
          <div className="flex items-center mb-4">
            <CheckCircleOutlineTwoToneIcon
              sx={{ fontSize: 50, color: "green" }}
            />
            <h3 className="text-xl font-semibold ml-2">Thông tin đơn hàng</h3>
          </div>
          <Divider />
          <div>
            <p className="font-semibold">Thông tin giao hàng</p>
            <p>{orderData?.order?.cname}</p>
            <p>{orderData?.order?.phone}</p>
            <p>{orderData?.order?.address}</p>
            <p>{orderData?.order?.email}</p>
          </div>
          <Divider />
          <div>
            <p className="font-semibold">Phương thức thanh toán</p>
            <p>
              {orderData?.order?.payment_method === "cod"
                ? "Thanh toán khi giao hàng (COD)"
                : "Chuyển khoản qua VNPay"}
            </p>
          </div>
          <Divider />
          <div className="flex justify-between items-center">
            <Link to="/help" className="text-blue-500">
              Cần hỗ trợ? Liên hệ chúng tôi
            </Link>
            <Link to="/">
              <Button type="primary">Tiếp tục mua hàng</Button>
            </Link>
          </div>  
        </Card>
        <Card>
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.code}-${item.price}-${item.quantity}`}
              className="flex justify-between items-center mb-4"
            >
              <img src={item.url} alt="Product" className="w-16 h-16" />
              <div className="flex-1 ml-4">
                <p className="font-semibold">{item.productName}</p>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <p className="font-semibold">{formatCurrency(item.price)}</p>
            </div>
          ))}
          <Divider />
          <div className="flex justify-between mb-2">
            <p>Tạm tính</p>
            <p>{formatCurrency(finalPrice + discount)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Giảm giá</p>
            <p>{formatCurrency(discount)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Phí vận chuyển</p>
            <p>0 VND</p>
          </div>
          <Divider />
          <div className="flex justify-between mb-2">
            <p className="text-xl font-bold">Tổng cộng</p>
            <p className="text-xl font-bold">{formatCurrency(finalPrice)}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}