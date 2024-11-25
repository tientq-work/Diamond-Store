import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, List, message } from "antd";
import CollectionApi from "../api/CollectionAPI";

const Collection = () => {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const productsRef = useRef(null);

  const location = useLocation();
  const selectedCollectionId = location.state?.selectedCollectionId;

  useEffect(() => {
    if (selectedCollectionId) {
      handleCollectionClick(selectedCollectionId);
      // Scroll to the products section
      setTimeout(() => {
        productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [selectedCollectionId]);

  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
  };

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await CollectionApi.getAllCollections();
        setCollections(response.data.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
        message.error("Failed to load collections");
      }
    };

    fetchCollections();
  }, []);

  const styles = `
  body {
    background-color: #FFF0F5; /* Màu hồng nhạt */
  }

  .collection-card {
    border: 2px solid #E6F2FF; 
    transition: all 0.3s ease;
  }

  .collection-card:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }

  .selected-collection {
    border: 4px solid #1890ff; 
  }
`;


const handleCollectionClick = async (collectionId) => {
  setLoading(true);
  setSelectedCollection(collectionId);
  setProducts([]);

  try {
    const response = await CollectionApi.getProduct(collectionId);
    setProducts(response.data.data);
    if (response.data.data.length === 0) {
      message.info("This collection has no products.");
    } 
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    setLoading(false);
    setTimeout(() => {
      productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
};

  return (
    <>
    <style>{styles}</style>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold mb-8">Collections</h2>
      {collections.length === 0 ? (
        <p className="text-center text-lg">Loading collections...</p>
      ) : (
        <List
          grid={{ gutter: 24, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
          dataSource={collections}
          renderItem={(collection) => (
            <List.Item>
              <Card
                hoverable
                cover={
                  <img
                    alt={collection.collectionName}
                    src={collection.url || "default_collection_image_url"}
                    className="h-60 w-full object-cover"
                  />
                }
                onClick={() => handleCollectionClick(collection.collectionId)}
                className={`cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 ${
                  selectedCollection === collection.collectionId
                    ? "border-4 border-blue-500"
                    : ""
                }`}
                style={{ maxWidth: "100%", margin: "0 auto" }}
              >
                <Card.Meta
                  title={
                    <div className="text-xl font-semibold">
                      {collection.collectionName}
                    </div>
                  }
                  description={
                    <div className="text-base mt-2">
                      {collection.description}
                    </div>
                  }
                />
              </Card>
            </List.Item>
          )}
        />
      )}
      {selectedCollection && (
        <div className="mt-16" ref={productsRef}>
          <h3 className="text-2xl font-bold mb-8">Products in Collection</h3>
          {loading ? (
            <p className="text-center text-lg">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-center text-lg">
              No products found for this collection.
            </p>
          ) : (
            <List
              grid={{ gutter: 24, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 5 }}
              dataSource={products}
              renderItem={(product) => (
                <List.Item>
                  <Link to={`/product-detail/${product.productId}`}>
                    <Card
                      hoverable
                      cover={
                        <img
                          alt={product.productName}
                          src={product.url || "default_product_image_url"}
                          className="h-56 w-full object-cover"
                        />
                      }
                      className="transition duration-300 ease-in-out transform hover:scale-105"
                      style={{ maxWidth: "100%", margin: "0 auto" }}
                    >
                      <Card.Meta
                        title={
                          <span className="text-lg font-semibold">
                            {product.productName}
                          </span>
                        }
                        description={
                          <>
                            <p className="text-base text-gray-500 mb-2">
                              {product.description}
                            </p>
                            <p className="text-base font-bold text-blue-600">
                              {formatCurrency(product.price)}
                            </p>
                          </>
                        }
                      />
                    </Card>
                  </Link>
                </List.Item>
              )}
            />
          )}
        </div>
      )}
    </div>
    </>
  );
};

export default Collection;