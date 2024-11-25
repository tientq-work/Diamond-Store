import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CollectionAPI from "../api/CollectionAPI";
import ProductAPI from "../api/ProductAPI";

export default function Home() {
  const [currentProduct, setCurrentProduct] = useState(0);
  const itemsPerPageProduct = 6;
  const [products, setProducts] = useState([]);
  const [isNextProductActive, setIsNextProductActive] = useState(false);

  const [currentCollection, setCurrentCollection] = useState(0);
  const itemsPerPageCollection = 2;
  const [collections, setCollections] = useState([]);
  const [isNextCollectionActive, setIsNextCollectionActive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCollections();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await ProductAPI.products();
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCollections = async () => {
    try {
      const response = await CollectionAPI.getAllCollections();
      setCollections(response.data.data);
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  const handleCollectionClick = (collectionId) => {
    navigate(`/collection`, { state: { selectedCollectionId: collectionId } });
  };

  const nextPageProduct = () => {
    if (currentProduct + itemsPerPageProduct < products.length) {
      setCurrentProduct(currentProduct + itemsPerPageProduct);
      setIsNextProductActive(true);
      setTimeout(() => setIsNextProductActive(false), 500);
    }
  };

  const prevPageProduct = () => {
    if (currentProduct - itemsPerPageProduct >= 0) {
      setCurrentProduct(currentProduct - itemsPerPageProduct);
    }
  };

  const nextPageCollection = () => {
    if (currentCollection + itemsPerPageCollection < collections.length) {
      setCurrentCollection(currentCollection + itemsPerPageCollection);
      setIsNextCollectionActive(true);
      setTimeout(() => setIsNextCollectionActive(false), 300);
    }
  };

  const prevPageCollection = () => {
    if (currentCollection - itemsPerPageCollection >= 0) {
      setCurrentCollection(currentCollection - itemsPerPageCollection);
    }
  };

  const handleNavigateToCollections = () => {
    navigate("/collection");
  };

  const handleNavigateToDiamond = () => {
    navigate("/list-product");
  };

  const formatPrice = (price) => {
    return (
      parseInt(price)
        .toLocaleString("vi-VN", {
          style: "decimal",
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        })
        .replace(/\./g, ".") + " VND"
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <section className="bg-white rounded-lg shadow-md p-6 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">TRANG SỨC</h2>
            <button
              onClick={handleNavigateToDiamond}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Xem tất cả &gt;
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <img
                src="https://file.hstatic.net/1000381168/file/z5534076148156_f2cbfd8394021ce05ed5b345fee70777_b0ee26082bff414680f27699e8f6d6f6.jpg"
                alt="Khuyến mãi"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div className="w-full md:w-2/3 relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products
                  .slice(currentProduct, currentProduct + itemsPerPageProduct)
                  .map((product) => (
                    <Link
                      key={product.productId}
                      to={`/product-detail/${product.productId}`}
                      className="bg-white border border-gray-200 p-4 rounded-lg transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
                    >
                      <img
                        src={product.url}
                        alt={product.productName}
                        className="w-full h-48 object-cover mb-4 rounded"
                      />
                      <h3 className="text-lg font-bold text-gray-800">
                        {product.productName}
                      </h3>
                      <p className="text-red-500 font-semibold">
                        {formatPrice(product.price)}
                      </p>
                    </Link>
                  ))}
              </div>
              {currentProduct > 0 && (
                <button
                  onClick={prevPageProduct}
                  className="absolute top-1/2 transform -translate-y-1/2 left-0 bg-white rounded-full p-2 shadow-lg"
                >
                  <KeyboardArrowLeftIcon />
                </button>
              )}
              {currentProduct + itemsPerPageProduct < products.length && (
                <button
                  onClick={nextPageProduct}
                  className={`absolute top-1/2 transform -translate-y-1/2 right-0 rounded-full p-2 shadow-lg transition-all duration-500 ease-in-out ${
                    isNextProductActive
                      ? "bg-black text-white scale-110"
                      : "bg-white text-black hover:bg-gray-200"
                  }`}
                >
                  <KeyboardArrowRightIcon
                    className={`transition-colors duration-500 ${
                      isNextProductActive ? "text-white" : "text-black"
                    }`}
                  />
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            SẢN PHẨM NỔI BẬT
          </h2>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
              {products.slice(0, 6).map((product) => (
                <Link
                  key={product.productId}
                  to={`/product-detail/${product.productId}`}
                  className="bg-white border border-gray-200 p-4 rounded-lg transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
                >
                  <img
                    src={product.url}
                    alt={product.productName}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                  <h3 className="text-lg font-bold text-gray-800">
                    {product.productName}
                  </h3>
                  <p className="text-gray-500">{product.code}</p>
                  <p className="text-red-500 font-semibold">
                    {formatPrice(product.price)}
                  </p>
                </Link>
              ))}
            </div>
            <div className="lg:w-48 flex-shrink-0">
              <img
                src="https://file.hstatic.net/1000381168/file/z5534076148156_f2cbfd8394021ce05ed5b345fee70777_b0ee26082bff414680f27699e8f6d6f6.jpg"
                alt="Ưu Đãi"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              TRANG SỨC KIM CƯƠNG
            </h2>
            <button
              onClick={handleNavigateToDiamond}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Xem tất cả &gt;
            </button>
          </div>
          <div className="mb-8">
            <img
              src="https://file.hstatic.net/1000381168/file/km-nam-nang_5dca301f73ff458a86a55206c31d6c79.png"
              alt="Ưu Đãi"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products
                .slice(currentProduct, currentProduct + 8)
                .map((product) => (
                  <Link
                    key={product.productId}
                    to={`/product-detail/${product.productId}`}
                    className="bg-white border border-gray-200 p-4 rounded-lg transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
                  >
                    <img
                      src={product.url}
                      alt={product.productName}
                      className="w-full h-48 object-cover mb-4 rounded"
                    />
                    <h3 className="text-lg font-bold text-gray-800">
                      {product.productName}
                    </h3>
                    <p className="text-gray-500">{product.code}</p>
                    <p className="text-red-500 font-semibold">
                      {formatPrice(product.price)}
                    </p>
                  </Link>
                ))}
            </div>
            {currentProduct > 0 && (
              <button
                onClick={prevPageProduct}
                className="absolute top-1/2 transform -translate-y-1/2 left-0 bg-white rounded-full p-2 shadow-lg"
              >
                <KeyboardArrowLeftIcon />
              </button>
            )}
            {currentProduct + itemsPerPageProduct < products.length && (
              <button
                onClick={nextPageProduct}
                className={`absolute top-1/2 transform -translate-y-1/2 right-0 rounded-full p-2 shadow-lg transition-all duration-500 ease-in-out ${
                  isNextProductActive
                    ? "bg-black text-white scale-110"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                <KeyboardArrowRightIcon
                  className={`transition-colors duration-500 ${
                    isNextProductActive ? "text-white" : "text-black"
                  }`}
                />
              </button>
            )}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">BỘ SƯU TẬP</h2>
            <button
              onClick={handleNavigateToCollections}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Xem tất cả &gt;
            </button>
          </div>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {collections
                .slice(
                  currentCollection,
                  currentCollection + itemsPerPageCollection
                )
                .map((collection) => (
                  <div
                    key={collection.collectionId}
                    className="border border-gray-200 p-6 rounded-lg transition duration-300 ease-in-out hover:shadow-lg hover:scale-105 cursor-pointer"
                    onClick={() =>
                      handleCollectionClick(collection.collectionId)
                    }
                  >
                    <img
                      src={collection.url}
                      alt={collection.collectionName}
                      className="w-full h-64 object-cover mb-4 rounded"
                    />
                    <h3 className="text-xl font-bold text-gray-800">
                      {collection.collectionName}
                    </h3>
                    <p className="text-gray-600">{collection.description}</p>
                  </div>
                ))}
            </div>
            {currentCollection > 0 && (
              <button
                onClick={prevPageCollection}
                className="absolute top-1/2 transform -translate-y-1/2 left-0 bg-white rounded-full p-2 shadow-lg"
              >
                <KeyboardArrowLeftIcon />
              </button>
            )}
            {currentCollection + itemsPerPageCollection <
              collections.length && (
              <button
                onClick={nextPageCollection}
                className={`absolute top-1/2 transform -translate-y-1/2 right-0 rounded-full p-2 shadow-lg transition-all duration-500 ease-in-out ${
                  isNextCollectionActive
                    ? "bg-black text-white scale-110"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                <KeyboardArrowRightIcon
                  className={`transition-colors duration-500 ${
                    isNextCollectionActive ? "text-white" : "text-black"
                  }`}
                />
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}