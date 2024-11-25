import { useState, useEffect } from "react";
import {
  Button,
  InputNumber,
  Divider,
  Typography,
  Input,
  Card,
  Avatar,
} from "antd";
import {
  PhoneOutlined,
  MessageOutlined,
  UserOutlined,
  StarOutlined,
} from "@ant-design/icons";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/Cart/cartSlice";
import ProductAPI from "../api/ProductAPI";
import CommentAPI from "../api/CommentAPI";
import notification from "../notification";
import moment from "moment";

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [value, setValue] = useState("");
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(0);
  const [productDescription, setProductDescription] = useState(null);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    async function fetchData() {
      try {
        const productResponse = await ProductAPI.getProductById(id);
        if (productResponse.data.success) {
          setProduct(productResponse.data.data);
        }

        const descriptionResponse = await ProductAPI.getProductDescription(id);
        if (descriptionResponse.data.success) {
          setProductDescription(descriptionResponse.data.data);
        }

        const commentsResponse = await CommentAPI.getCommentsByProduct(id);
        if (commentsResponse.status === 200) {
          setComments(commentsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = () => {
    const price = formatCurrency(product.price)
      ? String(product.price).replace(/[^0-9]/g, "")
      : "0";
    const productToSave = {
      ...product,
      price,
      quantity,
    };
    dispatch(addToCart(productToSave));
    notification("success", "Đã thêm vào giỏ hàng thành công");
  };

  const handleChatClick = () => {
    window.open("https://zalo.me/0948704134", "_blank", "noopener,noreferrer");
  };

  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
  };

  const handleBuyNow = () => {
    const price = formatCurrency(product.price)
      ? String(product.price).replace(/[^0-9]/g, "")
      : "0";
    const productToSave = {
      ...product,
      price,
      quantity,
    };
    dispatch(addToCart(productToSave));
    notification("success", "Đã thêm vào giỏ hàng thành công");

    navigate("/cart", { state: { selectedItems: [product.productId] } });
  };

  const handleAddComment = async () => {
    const commentContent = value.trim();
    if (!commentContent) {
      notification("error", "Nội dung bình luận không được để trống");
      return;
    }

    try {
      const response = await CommentAPI.addComment(commentContent, id, userId);
      if (response.status === 200 && response.data) {
        setComments([...comments, { ...response.data, rating }]);
        setValue("");
        setRating(0);
        notification("success", "Đã thêm bình luận thành công");
      } else {
        notification("error", "Có lỗi xảy ra khi thêm bình luận");
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
      if (error.response && error.response.status === 401) {
        notification("error", "Có lỗi xảy ra khi thêm bình luận");
      } else {
        notification("error", "Có lỗi xảy ra khi thêm bình luận");
      }
    }
  };

  const getStatusMessage = (status) => {
    if (status === "InStock") {
      return "CÒN HÀNG";
    } else if (status === "OutOfStock") {
      return "HẾT HÀNG";
    } else {
      return "TRẠNG THÁI KHÔNG XÁC ĐỊNH";
    }
  };

  const renderComments = () => (
    <div className="my-8 w-full">
      <Title level={4} className="mb-4 flex items-center">
        <StarOutlined className="mr-2" /> Đánh giá từ khách hàng
      </Title>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Card
            key={comment.commentId}
            className="mb-2 shadow-sm hover:shadow-md transition-shadow duration-300"
            bodyStyle={{ padding: "8px" }}
            size="small"
          >
            <div className="flex items-start">
              <Avatar size={48} icon={<UserOutlined />} className="mr-3" />
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-1">
                  <Text strong className="text-sm">
                    {comment.userId
                      ? comment.userId.fullName
                      : "Khách hàng ẩn danh"}
                  </Text>
                  <Text type="secondary" className="text-xs">
                    {moment(comment.createdAt).fromNow()}
                  </Text>
                </div>

                <Text className="block text-gray-700 text-sm">
                  {comment.content}
                </Text>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <Text>Chưa có đánh giá nào cho sản phẩm này.</Text>
      )}
    </div>
  );

  const renderTabs = () => (
    <div className="flex mb-4">
      <button
        className={`mr-4 pb-2 ${
          activeTab === "description" ? "border-b-2 border-blue-500" : ""
        }`}
        onClick={() => setActiveTab("description")}
      >
        Mô tả sản phẩm
      </button>
      <button
        className={`pb-2 ${
          activeTab === "reviews" ? "border-b-2 border-blue-500" : ""
        }`}
        onClick={() => setActiveTab("reviews")}
      >
        Đánh giá
      </button>
    </div>
  );

  const renderTabContent = () => {
    if (activeTab === "description") {
      return (
        productDescription && (
          <div className="my-2">
            <Title level={4}>MÔ TẢ SẢN PHẨM</Title>
            <table className="w-full border-collapse border border-gray-200">
              <tbody>
                <tr>
                  <td className="border bg-gray-100 p-2">Tên viên chính:</td>
                  <td className="border border-gray-200 p-2">
                    {productDescription.mainName}
                  </td>
                </tr>
                <tr>
                  <td className="border bg-gray-100 p-2">Số viên chính:</td>
                  <td className="border border-gray-200 p-2">
                    {productDescription.mainQuantity}
                  </td>
                </tr>
                <tr>
                  <td className="border bg-gray-100 p-2">Số viên phụ:</td>
                  <td className="border border-gray-200 p-2">
                    {productDescription.sideQuantity}
                  </td>
                </tr>
                <tr>
                  <td className="border bg-gray-100 p-2">Trọng lượng Carat:</td>
                  <td className="border border-gray-200 p-2">
                    {productDescription.caratWeight}
                  </td>
                </tr>
                <tr>
                  <td className="border bg-gray-100 p-2">Hình Dạng:</td>
                  <td className="border border-gray-200 p-2">
                    {productDescription.shape}
                  </td>
                </tr>
                <tr>
                  <td className="border bg-gray-100 p-2">Size vỏ:</td>
                  <td className="border border-gray-200 p-2">
                    {productDescription.mountSize}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      );
    } else {
      return (
        <>
          <div className="my-8">
            <Title level={4} className="mb-4 flex items-center">
              <StarOutlined className="mr-2" /> Viết đánh giá của bạn
            </Title>
            <Card className="shadow-sm">
              <TextArea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Chia sẻ trải nghiệm của bạn..."
                autoSize={{ minRows: 4, maxRows: 6 }}
                className="mb-2"
              />
              <Button
                type="primary"
                className="w-full"
                onClick={handleAddComment}
                icon={<StarOutlined />}
              >
                Gửi đánh giá
              </Button>
            </Card>
          </div>
          {renderComments()}
        </>
      );
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <table className="table-fixed w-full">
        <tbody>
          <tr>
            <td className="w-1/2 p-4">
              <div className="flex justify-center items-center h-full overflow-hidden">
                <div className="w-3/5 h-3/5">
                  <img
                    src={product.url ?? ""}
                    alt="Product"
                    className="w-full h-full object-contain border border-gray-200 transition-transform duration-300 hover:scale-110"
                  />
                </div>
              </div>
            </td>
            <td className="w-1/2 p-4">
              <Title level={3}>{product.productName}</Title>
              <div className="my-2">
                <Title level={2} className="text-red-500">
                  {formatCurrency(product.price)}
                </Title>
                {product.oldPrice && (
                  <Text delete>{formatCurrency(product.oldPrice)}</Text>
                )}
              </div>
              <div className="my-2">
                <Text>{product.description}</Text>
              </div>
              <div className="my-2">
                <Text strong>
                  <CheckCircleIcon
                    className={
                      product.status === "InStock"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  />
                  {getStatusMessage(product.status)}
                </Text>
              </div>
              <div className="my-4 flex items-center justify-between">
                <Text>Số lượng:</Text>
                <InputNumber
                  min={1}
                  max={product.stock}
                  value={quantity}
                  onChange={(value) => setQuantity(value)}
                  className="ml-2"
                />
                <Link
                  to="https://thegioikimcuong.vn/pages/huong-dan-do-size-nhan"
                  className="text-blue-500 ml-4 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hướng dẫn đo size →
                </Link>
              </div>
              <div className="my-4 flex items-center justify-between">
                <Button
                  type="primary"
                  className="w-full mr-2"
                  onClick={handleBuyNow}
                >
                  MUA NGAY
                </Button>
                <Button onClick={handleAddToCart} className="w-full ml-2">
                  THÊM VÀO GIỎ HÀNG
                </Button>
              </div>
              <div className="my-4 flex items-center justify-between">
                <a href="tel:0948704134" className="w-full mr-2">
                  <Button icon={<PhoneOutlined />} className="w-full">
                    HOTLINE: 0948704134
                  </Button>
                </a>
                <Button
                  icon={<MessageOutlined />}
                  className="ml-2 w-full"
                  onClick={handleChatClick}
                >
                  CHAT VỚI TƯ VẤN VIÊN
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Divider />

      <div className="flex">
        <div className="w-1/2 pr-4">
          {renderTabs()}
          {renderTabContent()}
        </div>
        <div className="w-1/2 pl-4">
          <div className="sticky top-4">
            <img
              src="https://file.hstatic.net/1000381168/file/z5534076148156_f2cbfd8394021ce05ed5b345fee70777_b0ee26082bff414680f27699e8f6d6f6.jpg"
              alt="Khuyến mãi đặc biệt"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 text-center">
              <Title level={4}>Khuyến mãi đặc biệt</Title>
              <Text>Đừng bỏ lỡ cơ hội mua sắm với giá ưu đãi! </Text>
              <Button type="primary" className="mt-2">
                <Link
                  to="http://localhost:5173/promotions"
                  style={{ color: "white" }}
                >
                  Xem ngay
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
