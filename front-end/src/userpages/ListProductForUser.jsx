import { Pagination, Radio } from "antd"; // Import Button from Ant Design
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ProductAPI from "../api/ProductAPI";

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [productTypes, setProductTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8); // Thêm state cho pageSize
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const scrollPositionRef = useRef(0);

  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductAPI.products();
        const data = response.data.data;
        setProducts(data);
        const types = [
          ...new Set(data.map((product) => product.mountId.type.trim())),
        ];
        setProductTypes(types);
      } catch (error) {
        console.error("Failed to fetch products:", error.message);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let updatedFilteredProducts = products;
    if (selectedType) {
      updatedFilteredProducts = products.filter(
        (product) => product.mountId.type === selectedType
      );
    }
    setFilteredProducts(updatedFilteredProducts);
    setCurrentPage(1);
  }, [selectedType, products]);

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const calculatePageSize = () => {
    const productHeight = 300; // Ước tính chiều cao của mỗi sản phẩm
    const filterHeight = 100; // Ước tính chiều cao của phần filter
    const paginationHeight = 50; // Ước tính chiều cao của phần pagination
    const availableHeight = windowHeight - filterHeight - paginationHeight;
    return Math.max(4, Math.floor(availableHeight / productHeight) * 4); // Tối thiểu 4 sản phẩm, 4 cột
  };

  useEffect(() => {
    setPageSize(calculatePageSize());
  }, [windowHeight]);

  useLayoutEffect(() => {
    window.scrollTo(0, scrollPositionRef.current);
  });

  const handleTypeChange = (e) => {
    scrollPositionRef.current = window.pageYOffset;
    setSelectedType(e.target.value);
  };

  const handlePageChange = (page) => {
    scrollPositionRef.current = window.pageYOffset;
    setCurrentPage(page);
  };

  const getGridColumns = () => {
    const productCount = paginatedProducts.length;
    if (productCount <= 1) return 'grid-cols-1';
    if (productCount <= 2) return 'grid-cols-1 sm:grid-cols-2';
    if (productCount <= 3) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
    return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="bg-pink-50 min-h-screen flex justify-center"> 
      <div className="w-[90%] max-w-7xl px-4 py-8 flex flex-col"> 
        <div className="mb-4 p-4 bg-blue-100 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2 text-blue-800">Filter by Type</h3>
          <Radio.Group 
            onChange={handleTypeChange} 
            value={selectedType}
            className="space-x-2"
          >
            <Radio value='' className="text-sm">All</Radio>
            {productTypes.map((type) => (
              <Radio key={type} value={type} className="text-sm">
                {type}
              </Radio>
            ))}
          </Radio.Group>
        </div>

        <div className={`flex-grow grid ${getGridColumns()} gap-4 overflow-y-auto`}>
          {paginatedProducts.map((product) => (
            <Link
              to={`/product-detail/${product.productId}`}
              key={product.productId}
              className="block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <div className="relative pt-[100%]">
                <img
                  src={product.url || "default-image-url.jpg"}
                  alt={product.productName}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-3 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-semibold mb-1 truncate">
                    {product.productName}
                  </h3>
                  <p className="text-xs text-gray-600 mb-1 truncate">
                    {product.mountId.mountName}
                  </p>
                </div>
                <p className="text-sm font-bold text-blue-600 mt-1">
                  {formatCurrency(Number(product.price))}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {paginatedProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-lg text-gray-600">No products found for this category.</p>
          </div>
        )}

        <div className="mt-4 flex justify-center pb-4">
          <Pagination
            current={currentPage}
            total={filteredProducts.length}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
        </div>
        
        {/* <div className="flex justify-center mt-4">
          <Button type="primary">
            <Link to="/register" className="text-white">Register</Link>
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default ListProduct;
